<script setup lang="ts">
import { computed, ref } from "vue";
import BattleMenu from "./components/BattleMenu.vue";
import DialogBox from "./components/DialogBox.vue";
import PartyPanel from "./components/PartyPanel.vue";
import QuestPanel from "./components/QuestPanel.vue";
import { usePocketGroveGame } from "./game/engine/gameLoop";

const canvasRef = ref<HTMLCanvasElement | null>(null);

const {
  scene,
  sceneLabel,
  areaName,
  questTitle,
  questStage,
  objective,
  partner,
  battle,
  dialog,
  metResearcher,
  wins,
  stepCount,
  move,
  confirm,
  selectBattleAction,
  resetAdventure,
  forceWildEncounter
} = usePocketGroveGame(canvasRef);

const battleChoices = computed(() => [
  {
    key: "attack" as const,
    label: "攻擊",
    description: "穩定造成傷害，適合收尾。"
  },
  {
    key: "guard" as const,
    label: "防禦",
    description: "降低本回合受到的傷害。"
  }
]);
</script>

<template>
  <main class="app-shell">
    <section class="info-panel">
      <p class="eyebrow">Pocket Grove Demo</p>
      <h1>口袋樹林</h1>
      <p class="summary">
        一段 Game Boy 風格的微型 RPG。探索樹林、完成研究員委託、挑戰道路訓練家，
        最後調查溪橋上的異常封鎖。
      </p>

      <QuestPanel
        :scene-label="sceneLabel"
        :area-name="areaName"
        :quest-title="questTitle"
        :quest-stage="questStage"
        :objective="objective"
        :met-researcher="metResearcher"
      />

      <PartyPanel
        :partner="partner"
        :step-count="stepCount"
        :wins="wins"
      />

      <div class="demo-actions">
        <button class="reset-button" type="button" @click="resetAdventure">重新開始</button>
        <button class="assist-button" type="button" @click="forceWildEncounter">Demo Assist：觸發野外戰鬥</button>
      </div>

      <ul class="tips">
        <li>鍵盤使用 `W A S D` 或方向鍵移動。</li>
        <li>`Enter`、空白鍵或 `E` 可以對話、確認與戰鬥。</li>
        <li>手機上可以用方向鍵與 A 鍵完成整段 demo。</li>
      </ul>
    </section>

    <section class="game-column">
      <div class="screen-frame">
        <canvas ref="canvasRef" width="256" height="192" aria-label="Pocket Grove game screen" />
      </div>

      <section class="dialog-card" aria-live="polite">
        <DialogBox
          v-if="dialog.visible"
          :speaker="dialog.speaker"
          :text="dialog.text"
          hint="Enter / E 繼續"
        />
        <BattleMenu
          v-else-if="scene === 'battle' && battle.awaitingChoice && battle.enemy"
          :choices="battleChoices"
          :selected-index="battle.selectedIndex"
          @select="selectBattleAction"
        />
        <DialogBox
          v-else
          speaker="任務提示"
          text="先找研究員莫菈接下外勤測試，接著沿著路標前往城鎮、研究所與溪橋。"
          hint="靠近 NPC 或告示牌後按 A / Enter"
        />
      </section>

      <div class="touch-deck">
        <div class="dpad" aria-label="方向控制">
          <button class="dpad-button up" type="button" @click="move('up')" aria-label="上">↑</button>
          <button class="dpad-button left" type="button" @click="move('left')" aria-label="左">←</button>
          <button class="dpad-button down" type="button" @click="move('down')" aria-label="下">↓</button>
          <button class="dpad-button right" type="button" @click="move('right')" aria-label="右">→</button>
        </div>

        <div class="action-buttons">
          <button class="action-button confirm" type="button" @click="confirm">A / 確認</button>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.app-shell {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(300px, 380px) minmax(340px, 1fr);
  gap: 30px;
  align-items: start;
  padding: 24px 0 36px;
}

.info-panel,
.screen-frame,
.dialog-card,
.dpad,
.action-button {
  border: 3px solid #23331b;
  box-shadow:
    0 10px 0 rgba(35, 51, 27, 0.18),
    0 22px 36px rgba(35, 51, 27, 0.1);
}

.info-panel,
.dialog-card,
.dpad,
.action-button {
  background: linear-gradient(180deg, #e7f0d0 0%, #cedfb0 100%);
}

.info-panel {
  border-radius: 24px;
  padding: 26px;
}

.eyebrow,
h1,
.action-button,
.reset-button,
.assist-button {
  font-family: "Courier New", "Microsoft JhengHei", monospace;
}

.eyebrow {
  margin: 0 0 14px;
  color: #49643c;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
  line-height: 1.1;
  color: #23331b;
}

.summary {
  margin: 18px 0 0;
  color: #3f5735;
  line-height: 1.7;
}

.demo-actions {
  display: grid;
  gap: 10px;
  margin-top: 18px;
}

.reset-button,
.assist-button {
  width: 100%;
  border: 0;
  border-radius: 999px;
  padding: 14px 18px;
  cursor: pointer;
}

.reset-button {
  color: #f5ffe9;
  background: linear-gradient(180deg, #486c36 0%, #294720 100%);
}

.assist-button {
  color: #20301a;
  background: linear-gradient(180deg, #f5e8b4 0%, #d8bd62 100%);
  border: 2px solid rgba(35, 51, 27, 0.24);
}

.tips {
  margin: 18px 0 0;
  padding-left: 18px;
  color: #405537;
  line-height: 1.8;
}

.game-column {
  display: grid;
  gap: 18px;
}

.screen-frame {
  width: 100%;
  border-radius: 28px;
  padding: 18px;
  background:
    linear-gradient(145deg, #edf4dd 0%, #bfd39d 56%, #98b177 100%);
}

canvas {
  display: block;
  width: min(100%, 768px);
  margin: 0 auto;
  border: 4px solid #182313;
  border-radius: 14px;
  image-rendering: pixelated;
  background: #9bbc0f;
  box-shadow:
    inset 0 0 0 2px rgba(232, 245, 210, 0.14),
    0 8px 20px rgba(24, 35, 19, 0.18);
}

.dialog-card {
  border-radius: 24px;
  padding: 18px 20px;
  min-height: 150px;
}

.touch-deck {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  align-items: center;
  justify-content: space-between;
}

.dpad {
  display: grid;
  grid-template-columns: repeat(3, 68px);
  gap: 8px;
  border-radius: 20px;
  padding: 14px;
}

.dpad-button {
  border: 2px solid #2c4021;
  border-radius: 18px;
  width: 68px;
  height: 68px;
  background: linear-gradient(180deg, #f5f9eb 0%, #d8e7bb 100%);
  color: #22311a;
  font-size: 1.4rem;
  cursor: pointer;
}

.dpad-button.up {
  grid-column: 2;
}

.dpad-button.left {
  grid-column: 1;
  grid-row: 2;
}

.dpad-button.down {
  grid-column: 2;
  grid-row: 2;
}

.dpad-button.right {
  grid-column: 3;
  grid-row: 2;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.action-button {
  min-width: 150px;
  border-radius: 22px;
  padding: 16px 20px;
  color: #1e2d17;
  font-weight: 700;
  cursor: pointer;
  background: linear-gradient(180deg, #eaf2d8 0%, #c9ddb0 100%);
}

@media (max-width: 980px) {
  .app-shell {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .app-shell {
    width: min(100% - 20px, 1180px);
    gap: 20px;
    padding-top: 18px;
  }

  .touch-deck {
    justify-content: center;
  }
}
</style>
