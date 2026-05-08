import type { MapData } from "../../types/map";
import { brooksideOutpostMap } from "./brooksideOutpost";
import { dawnbudResearchLabMap } from "./dawnbudResearchLab";
import { dawnbudTownMap } from "./dawnbudTown";
import { dawnbudTownSquareMap } from "./dawnbudTownSquare";
import { sunpathRoadMap } from "./sunpathRoad";
import { windfallBridgeTrailMap } from "./windfallBridgeTrail";

export const mapRegistry: Record<string, MapData> = {
  [dawnbudTownMap.id]: dawnbudTownMap,
  [dawnbudTownSquareMap.id]: dawnbudTownSquareMap,
  [dawnbudResearchLabMap.id]: dawnbudResearchLabMap,
  [sunpathRoadMap.id]: sunpathRoadMap,
  [brooksideOutpostMap.id]: brooksideOutpostMap,
  [windfallBridgeTrailMap.id]: windfallBridgeTrailMap
};

export function getMapById(mapId: string): MapData {
  const map = mapRegistry[mapId];
  if (!map) {
    throw new Error(`Unknown map id: ${mapId}`);
  }

  return map;
}
