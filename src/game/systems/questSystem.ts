import { introQuest } from "../data/quests";
import type { WorldFlags } from "../types/game";
import type { QuestState } from "../types/quest";

export function createInitialQuestState(): QuestState {
  return {
    id: introQuest.id,
    title: introQuest.title,
    stage: 0,
    objective: introQuest.stageObjectives[0]
  };
}

export function syncIntroQuest(flags: WorldFlags): QuestState {
  if (flags.reportedBridgeStatus) {
    return {
      id: introQuest.id,
      title: introQuest.title,
      stage: 11,
      objective: "外勤測試完成。溪橋封鎖資料已交給瑟拉隊長。"
    };
  }

  if (flags.inspectedWindfallBlockade) {
    return {
      id: introQuest.id,
      title: introQuest.title,
      stage: 10,
      objective: introQuest.stageObjectives[10]
    };
  }

  if (flags.reachedWindfallBridge) {
    return {
      id: introQuest.id,
      title: introQuest.title,
      stage: 9,
      objective: introQuest.stageObjectives[9]
    };
  }

  if (flags.receivedOutpostBriefing) {
    return {
      id: introQuest.id,
      title: introQuest.title,
      stage: 8,
      objective: introQuest.stageObjectives[8]
    };
  }

  if (flags.reachedBrooksideOutpost) {
    return {
      id: introQuest.id,
      title: introQuest.title,
      stage: 7,
      objective: introQuest.stageObjectives[7]
    };
  }

  if (flags.reportedToLab) {
    return {
      id: introQuest.id,
      title: introQuest.title,
      stage: 6,
      objective: introQuest.stageObjectives[6]
    };
  }

  if (flags.beatRoadTrainer) {
    return {
      id: introQuest.id,
      title: introQuest.title,
      stage: 5,
      objective: introQuest.stageObjectives[5]
    };
  }

  if (flags.enteredLab) {
    return {
      id: introQuest.id,
      title: introQuest.title,
      stage: 4,
      objective: introQuest.stageObjectives[4]
    };
  }

  if (flags.visitedTownSquare) {
    return {
      id: introQuest.id,
      title: introQuest.title,
      stage: 3,
      objective: introQuest.stageObjectives[3]
    };
  }

  if (flags.firstBattleWon) {
    return {
      id: introQuest.id,
      title: introQuest.title,
      stage: 2,
      objective: introQuest.stageObjectives[2]
    };
  }

  if (flags.metResearcher) {
    return {
      id: introQuest.id,
      title: introQuest.title,
      stage: 1,
      objective: introQuest.stageObjectives[1]
    };
  }

  return createInitialQuestState();
}
