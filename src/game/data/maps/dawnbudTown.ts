import type { MapData } from "../../types/map";

export const dawnbudTownMap: MapData = {
  id: "dawnbud-outskirts",
  name: "曙芽林地",
  width: 16,
  height: 12,
  tiles: [
    "################",
    "#......gggg....#",
    "#..LL..gggg....#",
    "#..LL..gggg....#",
    "#......~~~~....#",
    "#..####~~~~....#",
    "#..#..#........#",
    "#..#..#..gggg..#",
    "#..#..#..gggg..#",
    "#..####........#",
    "#..............#",
    "################"
  ],
  npcs: [
    {
      id: "researcher-mora",
      name: "研究員 莫菈",
      position: { x: 13, y: 3 },
      color: "#5b6fca",
      dialog: [
        "你來得正好。溪橋附近出現了奇怪的封鎖標記，我需要一名外勤員確認路況。",
        "先帶著光尾在草叢裡走一圈，熟悉野外戰鬥。準備好後，往南邊的出口前進。"
      ]
    }
  ],
  signs: [
    {
      id: "north-field-sign",
      position: { x: 11, y: 10 },
      lines: ["曙芽林地", "北側草叢有野生夥伴出沒。", "南邊亮起的出口通往曙芽廣場。"]
    }
  ],
  exits: [
    {
      id: "to-town-square",
      position: { x: 8, y: 10 },
      targetMapId: "dawnbud-town-square",
      targetPosition: { x: 8, y: 2 }
    }
  ],
  encounterRate: 0.26
};
