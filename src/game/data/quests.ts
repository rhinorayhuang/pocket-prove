import type { QuestDefinition } from "../types/quest";

export const introQuest: QuestDefinition = {
  id: "intro-field-test",
  title: "溪橋外勤測試",
  description: "協助研究員莫菈調查日徑路與溪橋附近的異常封鎖。",
  stageObjectives: [
    "在起始林地找到研究員莫菈。",
    "穿過草叢並完成一場野外戰鬥。",
    "前往曙芽廣場，尋找通往研究所的路。",
    "進入研究所，準備回報初步狀況。",
    "沿著東側道路前往日徑路。",
    "擊敗道路斥候塔菈，確認夥伴可以應付外勤。",
    "回研究所向助理瑞亞回報日徑路狀況。",
    "前往溪畔哨站，找隊長瑟拉取得新的調查指示。",
    "依照哨站指示前往溪橋小徑。",
    "調查溪橋附近的封鎖標記。",
    "回溪畔哨站向隊長瑟拉回報封鎖狀態。"
  ]
};
