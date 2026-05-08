import type { MapData } from "../../types/map";

export const dawnbudTownSquareMap: MapData = {
  id: "dawnbud-town-square",
  name: "曙芽廣場",
  width: 16,
  height: 12,
  tiles: [
    "################",
    "#..............#",
    "#....LLLL......#",
    "#....LLLL......#",
    "#..............#",
    "#..~~..........#",
    "#..~~....LLLL..#",
    "#........LLLL..#",
    "#..............#",
    "#......gggg....#",
    "#..............#",
    "################"
  ],
  npcs: [
    {
      id: "town-guide-lin",
      name: "導覽員 林",
      position: { x: 11, y: 8 },
      color: "#7b5bb0",
      dialog: [
        "歡迎來到曙芽廣場。研究所就在西北方那棟屋子。",
        "如果你要去日徑路，從東側出口出去就能接上道路。"
      ]
    }
  ],
  signs: [
    {
      id: "town-plaza-sign",
      position: { x: 8, y: 10 },
      lines: ["曙芽廣場", "西北：研究所", "東側：日徑路"]
    }
  ],
  exits: [
    {
      id: "to-outskirts",
      position: { x: 8, y: 1 },
      targetMapId: "dawnbud-outskirts",
      targetPosition: { x: 8, y: 10 }
    },
    {
      id: "to-research-lab",
      position: { x: 5, y: 4 },
      targetMapId: "dawnbud-research-lab",
      targetPosition: { x: 7, y: 9 }
    },
    {
      id: "to-sunpath-road",
      position: { x: 14, y: 8 },
      targetMapId: "sunpath-road",
      targetPosition: { x: 1, y: 8 }
    }
  ],
  encounterRate: 0
};
