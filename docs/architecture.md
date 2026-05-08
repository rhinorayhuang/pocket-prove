# 架構說明

## 技術棧

1. Vue 3
2. TypeScript
3. Vite
4. Canvas 2D 作為主遊戲畫面
5. Vue 元件作為 HUD、對話框、選單與資訊面板

## 分層原則

### 1. App Layer

位置：
`src/App.vue`

責任：
1. 組裝畫面
2. 連接 Vue 元件與遊戲 runtime
3. 不負責遊戲規則

### 2. Engine Layer

位置：
`src/game/engine/`

責任：
1. 輸入接收
2. 場景管理
3. 畫面渲染協調
4. runtime 對外 API

目前主要檔案：
1. `gameLoop.ts`
2. `renderer.ts`
3. `input.ts`
4. `sceneManager.ts`
5. `camera.ts`

### 3. Scene Layer

位置：
`src/game/scenes/`

責任：
1. 依場景切分互動邏輯
2. 將世界探索、戰鬥、選單、演出分開

原則：
1. Scene 可以協調 system
2. Scene 不應直接持有長期資料表

### 4. System Layer

位置：
`src/game/systems/`

責任：
1. 提供可重複使用的規則邏輯
2. 盡量做成純函式或低副作用函式

目前包含：
1. `battleSystem.ts`
2. `collisionSystem.ts`
3. `encounterSystem.ts`
4. `interactionSystem.ts`
5. `questSystem.ts`
6. `saveSystem.ts`

### 5. Data Layer

位置：
`src/game/data/`

責任：
1. 放靜態資料
2. 放內容定義
3. 讓遊戲盡量資料驅動

目前包含：
1. `creatures.ts`
2. `quests.ts`
3. `skills.ts`
4. `items.ts`
5. `trainers.ts`
6. `maps/`

### 6. Types Layer

位置：
`src/game/types/`

責任：
1. 放跨模組共享型別
2. 確保資料結構一致

## 資料流

1. `input.ts` 把鍵盤或按鈕操作轉成遊戲指令
2. `gameLoop.ts` 收到指令後，委派給對應 scene 或 system
3. scene / system 更新 runtime state
4. `renderer.ts` 根據 state 重新畫 canvas
5. Vue 元件同步顯示文字資訊與操作選單

## 現在的來源真相

目前以 `src/game/engine/gameLoop.ts` 建立 runtime state。

之後若遊戲變大，建議拆成：
1. `createInitialRuntimeState()`
2. `runtimeStore`
3. `scene controllers`

## 未來擴充方向

### 近期

1. 多地圖切換
2. 場景出入口
3. 主線事件旗標
4. 捕捉系統

### 中期

1. 隊伍管理
2. 背包
3. 屬性相剋
4. 訓練家戰鬥
5. 存檔讀檔

### 長期

1. Cutscene 系統
2. 館主與 boss 戰
3. 地圖腳本系統
4. 完整 quest graph

## 禁止的耦合

1. 不要在 Vue component 裡直接改戰鬥數值。
2. 不要在 `renderer.ts` 裡寫 quest 判定。
3. 不要在 `data/` 檔案中放流程控制。
4. 不要讓 `systems/` 依賴 Vue。
