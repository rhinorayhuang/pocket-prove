import type { Point } from "./game";

export type TileSymbol = "#" | "." | "g" | "L" | "~" | "B";

export type NpcData = {
  id: string;
  name: string;
  position: Point;
  color: string;
  dialog: string[];
};

export type SignData = {
  id: string;
  position: Point;
  lines: string[];
};

export type MapExitData = {
  id: string;
  position: Point;
  targetMapId: string;
  targetPosition: Point;
};

export type MapData = {
  id: string;
  name: string;
  width: number;
  height: number;
  tiles: string[];
  npcs: NpcData[];
  signs: SignData[];
  exits: MapExitData[];
  encounterRate: number;
};
