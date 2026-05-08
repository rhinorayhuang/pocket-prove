import type { MapData } from "../../types/map";

export const windfallBridgeTrailMap: MapData = {
  id: "windfall-bridge-trail",
  name: "溪橋小徑",
  width: 16,
  height: 12,
  tiles: [
    "################",
    "#....gggg..BB..#",
    "#....gggg.BBBB.#",
    "#....LLLL.BB~..#",
    "#....LLLL..~~..#",
    "#..............#",
    "#..gggg....LL..#",
    "#..gggg....LL..#",
    "#..............#",
    "#......~~~~....#",
    "#..............#",
    "################"
  ],
  npcs: [
    {
      id: "bridge-spotter-ian",
      name: "橋邊觀測員 伊恩",
      position: { x: 11, y: 5 },
      color: "#7c6a58",
      dialog: [
        "封鎖標記就在北邊。靠近後按確認鍵檢查。",
        "如果你已經記錄完成，回哨站找瑟拉隊長。"
      ]
    }
  ],
  signs: [
    {
      id: "windfall-bridge-sign",
      position: { x: 8, y: 8 },
      lines: ["溪橋小徑", "南：溪畔哨站", "北側封鎖區禁止進入"]
    },
    {
      id: "windfall-blockade-marker",
      position: { x: 10, y: 2 },
      lines: [
        "封鎖標記",
        "標記表面有微弱脈動，像是在回應附近的夥伴能量。",
        "你記下了圖樣與位置。回哨站向瑟拉隊長報告。"
      ]
    }
  ],
  exits: [
    {
      id: "to-brookside-outpost",
      position: { x: 8, y: 10 },
      targetMapId: "brookside-outpost",
      targetPosition: { x: 8, y: 1 }
    }
  ],
  encounterRate: 0.14
};
