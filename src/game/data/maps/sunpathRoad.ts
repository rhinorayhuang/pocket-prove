import type { MapData } from "../../types/map";

export const sunpathRoadMap: MapData = {
  id: "sunpath-road",
  name: "日徑路",
  width: 16,
  height: 12,
  tiles: [
    "################",
    "#....gggg......#",
    "#....gggg..~~..#",
    "#...........~..#",
    "#..LLLL........#",
    "#..LLLL..gggg..#",
    "#........gggg..#",
    "#..............#",
    "#...ggg........#",
    "#...ggg....LL..#",
    "#...........LL.#",
    "################"
  ],
  npcs: [
    {
      id: "road-scout-tala",
      name: "道路斥候 塔菈",
      position: { x: 10, y: 7 },
      color: "#9a6a4f",
      dialog: [
        "日徑路是哨站與研究所之間的主要通道。",
        "通過我的測試後，記得回研究所回報。"
      ]
    }
  ],
  signs: [
    {
      id: "sunpath-road-sign",
      position: { x: 2, y: 8 },
      lines: ["日徑路", "西：曙芽廣場", "東：溪畔哨站"]
    }
  ],
  exits: [
    {
      id: "to-town-square",
      position: { x: 1, y: 8 },
      targetMapId: "dawnbud-town-square",
      targetPosition: { x: 13, y: 8 }
    },
    {
      id: "to-brookside-outpost",
      position: { x: 14, y: 7 },
      targetMapId: "brookside-outpost",
      targetPosition: { x: 1, y: 7 }
    }
  ],
  encounterRate: 0.18
};
