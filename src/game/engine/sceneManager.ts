import type { SceneName } from "../types/game";

export function getSceneLabel(scene: SceneName) {
  switch (scene) {
    case "world":
      return "探索";
    case "battle":
      return "戰鬥";
    case "menu":
      return "選單";
    case "cutscene":
      return "劇情";
    default:
      return "未知";
  }
}
