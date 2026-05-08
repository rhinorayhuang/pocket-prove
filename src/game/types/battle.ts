import type { CreatureState } from "./game";

export type BattleAction = "attack" | "guard";
export type BattleKind = "wild" | "trainer";

export type BattleState = {
  enemy: CreatureState | null;
  kind: BattleKind;
  trainerId: string | null;
  trainerName: string | null;
  awaitingChoice: boolean;
  selectedIndex: number;
  guarding: boolean;
};

export type BattleResolution = {
  lines: string[];
  playerFainted: boolean;
  enemyFainted: boolean;
};
