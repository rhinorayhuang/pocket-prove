import type { BattleAction, BattleState } from "../types/battle";
import { resolveBattleTurn } from "../systems/battleSystem";
import type { CreatureState } from "../types/game";

export function moveBattleSelection(state: BattleState, direction: "previous" | "next") {
  if (!state.awaitingChoice) {
    return;
  }

  state.selectedIndex = direction === "previous" ? 0 : 1;
}

export function actionFromSelection(selectedIndex: number): BattleAction {
  return selectedIndex === 0 ? "attack" : "guard";
}

export function resolveSelectedAction(
  battle: BattleState,
  partner: CreatureState,
  action: BattleAction
) {
  if (!battle.enemy) {
    return null;
  }

  return resolveBattleTurn(partner, battle.enemy, action, action === "guard");
}
