import type { Point } from "../types/game";
import type { MapData, NpcData, SignData } from "../types/map";

export function manhattanDistance(a: Point, b: Point) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function findAdjacentNpc(map: MapData, playerPosition: Point): NpcData | null {
  return map.npcs.find((npc) => manhattanDistance(npc.position, playerPosition) === 1) ?? null;
}

export function findAdjacentSign(map: MapData, playerPosition: Point): SignData | null {
  return map.signs.find((sign) => manhattanDistance(sign.position, playerPosition) === 1) ?? null;
}
