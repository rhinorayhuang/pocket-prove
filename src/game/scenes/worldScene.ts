import { getTile, isGrassTile, isPassableTile } from "../systems/collisionSystem";
import { findAdjacentNpc, findAdjacentSign } from "../systems/interactionSystem";
import type { DirectionName, PlayerState } from "../types/game";
import type { MapData, MapExitData, NpcData, SignData } from "../types/map";

const deltas: Record<DirectionName, { x: number; y: number }> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

export type WorldMoveResult = {
  moved: boolean;
  enteredGrass: boolean;
  exit: MapExitData | null;
};

export function attemptWorldMove(player: PlayerState, map: MapData, direction: DirectionName): WorldMoveResult {
  player.facing = direction;
  const delta = deltas[direction];
  const next = {
    x: player.position.x + delta.x,
    y: player.position.y + delta.y
  };

  const blockedByNpc = map.npcs.some((npc) => npc.position.x === next.x && npc.position.y === next.y);
  const tile = getTile(map, next);

  if (blockedByNpc || !isPassableTile(tile)) {
    return {
      moved: false,
      enteredGrass: false,
      exit: null
    };
  }

  player.position = next;
  const exit = map.exits.find((item) => item.position.x === next.x && item.position.y === next.y) ?? null;

  return {
    moved: true,
    enteredGrass: isGrassTile(tile),
    exit
  };
}

export function getWorldInteraction(map: MapData, player: PlayerState): { npc: NpcData | null; sign: SignData | null } {
  return {
    npc: findAdjacentNpc(map, player.position),
    sign: findAdjacentSign(map, player.position)
  };
}
