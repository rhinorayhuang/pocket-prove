import type { CreatureTemplate } from "../types/game";

export type TrainerDefinition = {
  id: string;
  name: string;
  title: string;
  introLines: string[];
  victoryLines: string[];
  rematchLines: string[];
  creature: CreatureTemplate;
};

export const trainerRoster: TrainerDefinition[] = [
  {
    id: "road-scout-tala",
    name: "塔菈",
    title: "道路斥候",
    introLines: [
      "你是莫菈派來的新外勤員？那就讓我測一下你的夥伴狀態。",
      "日徑路上的草叢最近變得很躁動。能打贏我，才算準備好繼續往前。"
    ],
    victoryLines: [
      "不錯。你的指令很穩，光尾也願意跟著你衝。",
      "回研究所回報吧。莫菈需要知道這條路已經可以通行。"
    ],
    rematchLines: [
      "我會留在這裡看路況。你已經通過我的測試了。",
      "往東走可以到溪畔哨站，但先把道路狀態回報給研究所。"
    ],
    creature: {
      id: "mossling",
      name: "苔幼",
      level: 5,
      maxHp: 22,
      attackMin: 3,
      attackMax: 6,
      body: "#5f7d49",
      accent: "#d8f2b6"
    }
  }
];

export function getTrainerById(trainerId: string) {
  const trainer = trainerRoster.find((entry) => entry.id === trainerId);
  if (!trainer) {
    throw new Error(`Unknown trainer id: ${trainerId}`);
  }

  return trainer;
}
