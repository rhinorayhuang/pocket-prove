import type { MapData } from "../../types/map";

export const brooksideOutpostMap: MapData = {
  id: "brookside-outpost",
  name: "溪畔哨站",
  width: 16,
  height: 12,
  tiles: [
    "################",
    "#......~~......#",
    "#......~~..LL..#",
    "#..........LL..#",
    "#..LLLL........#",
    "#..LLLL..gggg..#",
    "#........gggg..#",
    "#..............#",
    "#....LL........#",
    "#....LL........#",
    "#..............#",
    "################"
  ],
  npcs: [
    {
      id: "field-captain-sera",
      name: "隊長 瑟拉",
      position: { x: 10, y: 5 },
      color: "#5f6f9d",
      dialog: [
        "你就是研究所派來的人？溪橋那邊的封鎖標記突然亮起，我們不敢貿然拆除。",
        "往北走到溪橋小徑，找到封鎖標記後再回來向我報告。"
      ]
    }
  ],
  signs: [
    {
      id: "brookside-sign",
      position: { x: 3, y: 7 },
      lines: ["溪畔哨站", "西：日徑路", "北：溪橋小徑"]
    }
  ],
  exits: [
    {
      id: "to-sunpath-road",
      position: { x: 1, y: 7 },
      targetMapId: "sunpath-road",
      targetPosition: { x: 14, y: 7 }
    },
    {
      id: "to-windfall-bridge",
      position: { x: 8, y: 1 },
      targetMapId: "windfall-bridge-trail",
      targetPosition: { x: 8, y: 10 }
    }
  ],
  encounterRate: 0
};
