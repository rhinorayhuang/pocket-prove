# 資料夾規則

## 根目錄

可放：
1. `README.md`
2. `game-blueprint.md`
3. `package.json`
4. `tsconfig*.json`
5. `vite.config.ts`
6. `index.html`
7. `docs/`
8. `src/`

不要放：
1. 新功能的業務邏輯 `.ts` 檔
2. 臨時設計草稿散落根目錄
3. 與遊戲無關的工具檔案

## docs/

只放：
1. 開發規範
2. 架構文件
3. 交接文件
4. 工作流程與寫作慣例

不要放：
1. 遊戲執行程式碼
2. 可被型別描述的資料表

## src/

### src/components/

只放 Vue 顯示元件。

可以放：
1. 對話框
2. 選單
3. 狀態面板
4. UI 容器元件

不要放：
1. 戰鬥傷害演算法
2. 地圖碰撞規則
3. quest 推進規則

### src/game/engine/

只放 runtime 組裝與渲染入口。

可以放：
1. `gameLoop`
2. `renderer`
3. `input`
4. `sceneManager`

不要放：
1. 怪獸資料表
2. 長篇劇情文字

### src/game/scenes/

只放場景級互動邏輯。

可以放：
1. 世界探索流程
2. 戰鬥場景流程
3. 選單場景流程
4. cutscene 場景流程

不要放：
1. 可通用的底層數學工具
2. 內容資料表

### src/game/systems/

只放共用規則模組。

可以放：
1. battle resolution
2. encounter roll
3. collision
4. interaction query
5. save serialization

不要放：
1. Vue 元件
2. Canvas drawing

### src/game/data/

只放靜態內容定義。

可以放：
1. creatures
2. quests
3. items
4. trainers
5. maps

不要放：
1. side effect
2. DOM 邏輯
3. runtime 初始化

### src/game/types/

只放型別與介面。

不要放：
1. 實際執行邏輯
2. 常態資料內容

## dist/

只視為輸出產物，不是來源真相。

規則：
1. 不直接手改 `dist/`
2. 要改內容，請回 `src/`
3. 每次重要修改後重新 build
