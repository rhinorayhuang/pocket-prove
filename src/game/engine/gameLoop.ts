import { computed, onBeforeUnmount, onMounted, reactive, ref, type Ref } from "vue";
import { cloneCreature, starterTemplate } from "../data/creatures";
import { getMapById } from "../data/maps";
import { dawnbudTownMap } from "../data/maps/dawnbudTown";
import { getTrainerById } from "../data/trainers";
import { actionFromSelection, moveBattleSelection } from "../scenes/battleScene";
import { attemptWorldMove, getWorldInteraction } from "../scenes/worldScene";
import { resolveBattleTurn } from "../systems/battleSystem";
import { rollWildEncounter, shouldTriggerEncounter } from "../systems/encounterSystem";
import { createInitialQuestState, syncIntroQuest } from "../systems/questSystem";
import { createSaveData, readSave, writeSave } from "../systems/saveSystem";
import type { BattleAction } from "../types/battle";
import type { DialogState, DirectionName, RuntimeState, SceneName, WorldFlags } from "../types/game";
import { createKeyHandler } from "./input";
import { renderScene } from "./renderer";
import { getSceneLabel } from "./sceneManager";

function createDialogState(): DialogState {
  return {
    visible: false,
    speaker: "",
    text: "",
    queue: [],
    onComplete: null
  };
}

function createInitialFlags(): WorldFlags {
  return {
    metResearcher: false,
    firstBattleWon: false,
    visitedTownSquare: false,
    enteredLab: false,
    beatRoadTrainer: false,
    reportedToLab: false,
    reachedBrooksideOutpost: false,
    receivedOutpostBriefing: false,
    reachedWindfallBridge: false,
    inspectedWindfallBlockade: false,
    reportedBridgeStatus: false,
    wins: 0,
    stepCount: 0
  };
}

function createRuntimeState(): RuntimeState {
  return {
    scene: "world",
    currentMap: dawnbudTownMap,
    player: {
      position: { x: 2, y: 10 },
      facing: "right"
    },
    partner: cloneCreature(starterTemplate),
    battle: {
      enemy: null,
      kind: "wild",
      trainerId: null,
      trainerName: null,
      awaitingChoice: false,
      selectedIndex: 0,
      guarding: false
    },
    dialog: createDialogState(),
    quest: createInitialQuestState(),
    flags: createInitialFlags()
  };
}

function restoreRuntimeState(): RuntimeState {
  const state = createRuntimeState();
  const saved = readSave();
  if (!saved) {
    return state;
  }

  try {
    state.currentMap = getMapById(saved.currentMapId);
  } catch {
    return state;
  }

  state.player.position = { ...saved.playerPosition };
  state.player.facing = saved.playerFacing ?? state.player.facing;
  state.partner.hp = Math.max(1, Math.min(saved.partnerHp ?? state.partner.maxHp, state.partner.maxHp));
  state.flags = {
    ...state.flags,
    ...saved.flags
  };
  state.quest = syncIntroQuest(state.flags);

  return state;
}

export function usePocketGroveGame(canvasRef: Ref<HTMLCanvasElement | null>) {
  const state = reactive(restoreRuntimeState());
  const scene = ref<SceneName>("world");

  const sceneLabel = computed(() => getSceneLabel(scene.value));
  const areaName = computed(() =>
    scene.value === "battle"
      ? state.battle.kind === "trainer" && state.battle.trainerName
        ? `${state.battle.trainerName} 的挑戰`
        : "野外戰鬥"
      : state.currentMap.name
  );
  const questTitle = computed(() => state.quest.title);
  const questStage = computed(() => state.quest.stage);
  const objective = computed(() => state.quest.objective);
  const metResearcher = computed(() => state.flags.metResearcher);
  const wins = computed(() => state.flags.wins);
  const stepCount = computed(() => state.flags.stepCount);

  function getContext() {
    return canvasRef.value?.getContext("2d") ?? null;
  }

  function syncQuest() {
    state.quest = syncIntroQuest(state.flags);
  }

  function persist() {
    writeSave(createSaveData(state));
  }

  function render() {
    const ctx = getContext();
    if (!ctx) {
      return;
    }

    renderScene(ctx, scene.value, state.currentMap, state.player, state.partner, state.battle);
  }

  function openDialog(speaker: string, lines: string[], onComplete?: () => void) {
    state.dialog.visible = true;
    state.dialog.speaker = speaker;
    state.dialog.queue = [...lines];
    state.dialog.text = state.dialog.queue.shift() ?? "";
    state.dialog.onComplete = onComplete ?? null;
  }

  function closeDialog() {
    state.dialog.visible = false;
    state.dialog.speaker = "";
    state.dialog.text = "";
    state.dialog.queue = [];
    const callback = state.dialog.onComplete;
    state.dialog.onComplete = null;
    callback?.();
  }

  function advanceDialog() {
    const next = state.dialog.queue.shift();
    if (next) {
      state.dialog.text = next;
      return;
    }

    closeDialog();
    render();
  }

  function completeResearcherIntroduction() {
    if (state.flags.metResearcher) {
      return;
    }

    state.flags.metResearcher = true;
    syncQuest();
    persist();
  }

  function clearBattleState() {
    state.battle.enemy = null;
    state.battle.kind = "wild";
    state.battle.trainerId = null;
    state.battle.trainerName = null;
    state.battle.awaitingChoice = false;
    state.battle.selectedIndex = 0;
    state.battle.guarding = false;
  }

  function finishVictory() {
    const trainer = state.battle.kind === "trainer" && state.battle.trainerId
      ? getTrainerById(state.battle.trainerId)
      : null;

    state.flags.wins += 1;

    if (state.battle.kind === "wild") {
      state.flags.firstBattleWon = true;
    }

    if (state.battle.trainerId === "road-scout-tala") {
      state.flags.beatRoadTrainer = true;
    }

    clearBattleState();
    scene.value = "world";
    syncQuest();
    persist();
    render();

    if (trainer) {
      openDialog(`${trainer.title} ${trainer.name}`, trainer.victoryLines);
      render();
    }
  }

  function finishDefeat() {
    clearBattleState();
    state.partner.hp = state.partner.maxHp;
    state.currentMap = dawnbudTownMap;
    state.player.position = { x: 2, y: 10 };
    scene.value = "world";
    openDialog("研究員 莫菈", ["光尾已經恢復。先回林地重整，再繼續外勤測試。"]);
    persist();
    render();
  }

  function startWildEncounter() {
    state.battle.enemy = rollWildEncounter();
    state.battle.kind = "wild";
    state.battle.trainerId = null;
    state.battle.trainerName = null;
    state.battle.awaitingChoice = false;
    state.battle.selectedIndex = 0;
    state.battle.guarding = false;
    scene.value = "battle";
    openDialog(
      "野外遭遇",
      [`野生的 ${state.battle.enemy.name} 出現了！`, `${state.partner.name} 準備好了。`],
      () => {
        state.battle.awaitingChoice = true;
        render();
      }
    );
    render();
  }

  function forceWildEncounter() {
    if (scene.value !== "world" || state.dialog.visible) {
      return;
    }

    startWildEncounter();
  }

  function startTrainerBattle(trainerId: string) {
    const trainer = getTrainerById(trainerId);
    state.battle.enemy = cloneCreature(trainer.creature);
    state.battle.kind = "trainer";
    state.battle.trainerId = trainer.id;
    state.battle.trainerName = `${trainer.title} ${trainer.name}`;
    state.battle.awaitingChoice = false;
    state.battle.selectedIndex = 0;
    state.battle.guarding = false;
    scene.value = "battle";
    openDialog(`${trainer.title} ${trainer.name}`, trainer.introLines, () => {
      state.battle.awaitingChoice = true;
      render();
    });
    render();
  }

  function completeLabReport() {
    state.flags.reportedToLab = true;
    state.partner.hp = state.partner.maxHp;
    syncQuest();
    persist();
  }

  function receiveOutpostBriefing() {
    state.flags.receivedOutpostBriefing = true;
    syncQuest();
    persist();
  }

  function inspectWindfallBlockade() {
    state.flags.inspectedWindfallBlockade = true;
    syncQuest();
    persist();
  }

  function reportBridgeStatus() {
    state.flags.reportedBridgeStatus = true;
    syncQuest();
    persist();
  }

  function selectBattleAction(action: BattleAction) {
    state.battle.selectedIndex = action === "attack" ? 0 : 1;
    if (!state.battle.awaitingChoice || !state.battle.enemy || state.dialog.visible) {
      return;
    }

    state.battle.awaitingChoice = false;
    const resolution = resolveBattleTurn(state.partner, state.battle.enemy, action, action === "guard");
    state.battle.guarding = action === "guard";

    if (resolution.enemyFainted) {
      openDialog("戰鬥結果", resolution.lines, finishVictory);
      render();
      return;
    }

    state.battle.guarding = false;

    if (resolution.playerFainted) {
      openDialog("戰鬥結果", resolution.lines, finishDefeat);
      render();
      return;
    }

    openDialog("戰鬥結果", resolution.lines, () => {
      state.battle.awaitingChoice = true;
      render();
    });
    render();
  }

  function interactWithLabAssistant() {
    if (state.flags.reportedToLab) {
      openDialog("助理 瑞亞", [
        "通行紀錄已經更新。溪畔哨站會讓你通過。",
        "接下來找隊長瑟拉，她會告訴你溪橋封鎖的細節。"
      ]);
      render();
      return;
    }

    if (state.flags.beatRoadTrainer) {
      openDialog(
        "助理 瑞亞",
        [
          "塔菈已經回報你通過測試了。",
          "我把光尾的狀態補滿，並替你開啟哨站通行紀錄。",
          "往日徑路東側走，去溪畔哨站找隊長瑟拉。"
        ],
        () => {
          completeLabReport();
          render();
        }
      );
      render();
      return;
    }

    openDialog("助理 瑞亞", [
      "先去日徑路找塔菈。她會確認你和光尾是否能應付外勤。",
      "通過測試後再回來，我會幫你開通哨站紀錄。"
    ]);
    render();
  }

  function interactWithOutpostCaptain() {
    if (!state.flags.reportedToLab) {
      openDialog("隊長 瑟拉", [
        "你還沒有研究所的通行回報。",
        "先回曙芽研究所找瑞亞，她會替你更新紀錄。"
      ]);
      render();
      return;
    }

    if (state.flags.reportedBridgeStatus) {
      openDialog("隊長 瑟拉", [
        "你的報告很有用。封鎖標記不是普通路障，而是某種能量反應。",
        "這段 demo 到這裡完成。之後可以接上溪橋深處的事件。"
      ]);
      render();
      return;
    }

    if (state.flags.inspectedWindfallBlockade) {
      openDialog(
        "隊長 瑟拉",
        [
          "你記錄到脈動與圖樣了？這證明封鎖還在作用。",
          "我會把你的資料送回研究所。這次外勤測試完成。"
        ],
        () => {
          reportBridgeStatus();
          render();
        }
      );
      render();
      return;
    }

    if (state.flags.receivedOutpostBriefing) {
      openDialog("隊長 瑟拉", [
        "溪橋小徑在哨站北邊。",
        "找到封鎖標記後靠近檢查，再回來回報。"
      ]);
      render();
      return;
    }

    openDialog(
      "隊長 瑟拉",
      [
        "溪橋封鎖是在今天清晨突然亮起的。我們沒有收到任何施工或管制通知。",
        "你是研究所派來的人，對夥伴能量比較敏感。",
        "到北邊小徑調查封鎖標記，記下反應後回來找我。"
      ],
      () => {
        receiveOutpostBriefing();
        render();
      }
    );
    render();
  }

  function interactWithBridgeSpotter() {
    if (state.flags.reportedBridgeStatus) {
      openDialog("橋邊觀測員 伊恩", [
        "瑟拉已經收到報告了。",
        "封鎖深處還有反應，但那會是下一段任務。"
      ]);
      render();
      return;
    }

    if (state.flags.inspectedWindfallBlockade) {
      openDialog("橋邊觀測員 伊恩", [
        "你已經取得足夠資料。",
        "回哨站找瑟拉隊長，別在封鎖旁邊停太久。"
      ]);
      render();
      return;
    }

    openDialog(
      "橋邊觀測員 伊恩",
      [
        "北邊的封鎖標記一直在發光。",
        "靠近那塊標記按確認鍵，應該能記錄到研究所要的資料。"
      ]
    );
    render();
  }

  function interactInWorld() {
    const interaction = getWorldInteraction(state.currentMap, state.player);

    if (interaction.npc) {
      if (interaction.npc.id === "researcher-mora") {
        openDialog(interaction.npc.name, interaction.npc.dialog, () => {
          completeResearcherIntroduction();
          render();
        });
        render();
        return;
      }

      if (interaction.npc.id === "road-scout-tala") {
        const trainer = getTrainerById("road-scout-tala");
        if (state.flags.beatRoadTrainer) {
          openDialog(`${trainer.title} ${trainer.name}`, trainer.rematchLines);
          render();
          return;
        }

        startTrainerBattle("road-scout-tala");
        return;
      }

      if (interaction.npc.id === "lab-assistant-rhea") {
        interactWithLabAssistant();
        return;
      }

      if (interaction.npc.id === "field-captain-sera") {
        interactWithOutpostCaptain();
        return;
      }

      if (interaction.npc.id === "bridge-spotter-ian") {
        interactWithBridgeSpotter();
        return;
      }

      openDialog(interaction.npc.name, interaction.npc.dialog);
      render();
      return;
    }

    if (interaction.sign) {
      openDialog("告示牌", interaction.sign.lines, () => {
        if (interaction.sign?.id === "windfall-blockade-marker") {
          inspectWindfallBlockade();
          render();
        }
      });
      render();
      return;
    }

    openDialog("沒有反應", ["這裡沒有可以調查的東西。"]);
    render();
  }

  function transitionToMap(mapId: string, targetPosition: { x: number; y: number }) {
    state.currentMap = getMapById(mapId);
    state.player.position = { ...targetPosition };

    if (mapId === "dawnbud-town-square") {
      state.flags.visitedTownSquare = true;
    }

    if (mapId === "dawnbud-research-lab") {
      state.flags.enteredLab = true;
    }

    if (mapId === "brookside-outpost") {
      state.flags.reachedBrooksideOutpost = true;
    }

    if (mapId === "windfall-bridge-trail") {
      state.flags.reachedWindfallBridge = true;
    }

    syncQuest();
    persist();
    render();
  }

  function confirm() {
    if (state.dialog.visible) {
      advanceDialog();
      return;
    }

    if (scene.value === "battle") {
      selectBattleAction(actionFromSelection(state.battle.selectedIndex));
      return;
    }

    interactInWorld();
  }

  function move(direction: DirectionName) {
    if (scene.value === "battle" && state.battle.awaitingChoice && !state.dialog.visible) {
      moveBattleSelection(state.battle, direction === "up" || direction === "left" ? "previous" : "next");
      render();
      return;
    }

    if (scene.value !== "world" || state.dialog.visible) {
      return;
    }

    const result = attemptWorldMove(state.player, state.currentMap, direction);
    if (!result.moved) {
      render();
      return;
    }

    state.flags.stepCount += 1;
    persist();

    if (result.exit) {
      transitionToMap(result.exit.targetMapId, result.exit.targetPosition);
      return;
    }

    render();

    if (result.enteredGrass && shouldTriggerEncounter(state.currentMap.encounterRate)) {
      startWildEncounter();
    }
  }

  function resetAdventure() {
    Object.assign(state, createRuntimeState());
    scene.value = "world";
    persist();
    render();
  }

  const handleKeydown = createKeyHandler({
    onMove: move,
    onConfirm: confirm
  });

  onMounted(() => {
    render();
    window.addEventListener("keydown", handleKeydown);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handleKeydown);
  });

  return {
    scene,
    sceneLabel,
    areaName,
    questTitle,
    questStage,
    objective,
    partner: state.partner,
    battle: state.battle,
    dialog: state.dialog,
    metResearcher,
    wins,
    stepCount,
    move,
    confirm,
    selectBattleAction,
    resetAdventure,
    forceWildEncounter
  };
}
