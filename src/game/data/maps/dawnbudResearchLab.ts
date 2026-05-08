import type { MapData } from "../../types/map";

export const dawnbudResearchLabMap: MapData = {
  id: "dawnbud-research-lab",
  name: "曙芽研究所",
  width: 16,
  height: 12,
  tiles: [
    "################",
    "#..............#",
    "#..LLLLLLLLLL..#",
    "#..L........L..#",
    "#..L........L..#",
    "#..L........L..#",
    "#..L........L..#",
    "#..L........L..#",
    "#..L........L..#",
    "#..LLLL..LLLL..#",
    "#..............#",
    "################"
  ],
  npcs: [
    {
      id: "lab-assistant-rhea",
      name: "助理 瑞亞",
      position: { x: 10, y: 4 },
      color: "#5a8a8c",
      dialog: [
        "莫菈已經把外勤紀錄傳回來了。你的下一步是穿過日徑路。",
        "道路斥候塔菈會在路上測試你。通過後再回來，我會開啟哨站通行紀錄。"
      ]
    }
  ],
  signs: [
    {
      id: "lab-terminal",
      position: { x: 6, y: 3 },
      lines: ["研究所終端", "外勤記錄已同步。", "目前關注地點：溪橋小徑。"]
    }
  ],
  exits: [
    {
      id: "to-town-square",
      position: { x: 7, y: 10 },
      targetMapId: "dawnbud-town-square",
      targetPosition: { x: 5, y: 5 }
    }
  ],
  encounterRate: 0
};
