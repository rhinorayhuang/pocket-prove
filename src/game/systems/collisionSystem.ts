import type { Point } from "../types/game";
import type { MapData, TileSymbol } from "../types/map";

export function isInsideMap(map: MapData, point: Point) {
  return point.x >= 0 && point.y >= 0 && point.x < map.width && point.y < map.height;
}

export function getTile(map: MapData, point: Point): TileSymbol | "#" {
  if (!isInsideMap(map, point)) {
    return "#";
  }

  return (map.tiles[point.y]?.[point.x] ?? "#") as TileSymbol | "#";
}

export function isPassableTile(tile: TileSymbol | "#") {
  return tile !== "#" && tile !== "L" && tile !== "~" && tile !== "B";
}

export function isGrassTile(tile: TileSymbol | "#") {
  return tile === "g";
}
