import type { BattleState } from "./battle";
import type { MapData } from "./map";
import type { QuestState } from "./quest";

export type DirectionName = "up" | "down" | "left" | "right";
export type SceneName = "world" | "battle" | "menu" | "cutscene";

export type Point = {
  x: number;
  y: number;
};

export type CreatureTemplate = {
  id: string;
  name: string;
  level: number;
  maxHp: number;
  attackMin: number;
  attackMax: number;
  body: string;
  accent: string;
};

export type CreatureState = CreatureTemplate & {
  hp: number;
};

export type PlayerState = {
  position: Point;
  facing: DirectionName;
};

export type DialogState = {
  visible: boolean;
  speaker: string;
  text: string;
  queue: string[];
  onComplete: null | (() => void);
};

export type WorldFlags = {
  metResearcher: boolean;
  firstBattleWon: boolean;
  visitedTownSquare: boolean;
  enteredLab: boolean;
  beatRoadTrainer: boolean;
  reportedToLab: boolean;
  reachedBrooksideOutpost: boolean;
  receivedOutpostBriefing: boolean;
  reachedWindfallBridge: boolean;
  inspectedWindfallBlockade: boolean;
  reportedBridgeStatus: boolean;
  wins: number;
  stepCount: number;
};

export type RuntimeState = {
  scene: SceneName;
  currentMap: MapData;
  player: PlayerState;
  partner: CreatureState;
  battle: BattleState;
  dialog: DialogState;
  quest: QuestState;
  flags: WorldFlags;
};
