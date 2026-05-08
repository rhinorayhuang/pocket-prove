import type { RuntimeState, WorldFlags } from "../types/game";

export type SaveData = {
  currentMapId: string;
  playerPosition: RuntimeState["player"]["position"];
  playerFacing?: RuntimeState["player"]["facing"];
  partnerHp?: number;
  flags: WorldFlags;
  questId: string;
  questStage: number;
};

const SAVE_KEY = "pocket-grove-save";

export function createSaveData(state: RuntimeState): SaveData {
  return {
    currentMapId: state.currentMap.id,
    playerPosition: state.player.position,
    playerFacing: state.player.facing,
    partnerHp: state.partner.hp,
    flags: state.flags,
    questId: state.quest.id,
    questStage: state.quest.stage
  };
}

export function writeSave(data: SaveData) {
  window.localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export function readSave(): SaveData | null {
  const raw = window.localStorage.getItem(SAVE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as SaveData;
  } catch {
    return null;
  }
}
