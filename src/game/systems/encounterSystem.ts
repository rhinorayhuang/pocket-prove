import { cloneCreature, wildEncounterTable } from "../data/creatures";
import type { CreatureState } from "../types/game";

export function shouldTriggerEncounter(encounterRate: number) {
  return Math.random() < encounterRate;
}

export function rollWildEncounter(): CreatureState {
  const template = wildEncounterTable[Math.floor(Math.random() * wildEncounterTable.length)];
  return cloneCreature(template);
}
