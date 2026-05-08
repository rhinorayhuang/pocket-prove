# 撰寫慣例

## 命名慣例

### 檔名

1. Vue 元件：`PascalCase.vue`
2. system / scene / engine：`camelCase.ts`
3. data 檔案：用內容名詞，例如 `creatures.ts`、`quests.ts`
4. 地圖檔：`lowerCamelCase.ts`，例如 `dawnbudTown.ts`

### 型別

1. 型別與介面使用 `PascalCase`
2. 型別名稱需描述用途，例如 `BattleState`、`QuestDefinition`

### 變數

1. 一般變數使用 `camelCase`
2. 常數使用 `camelCase`
3. 真正全域常數才可用 `UPPER_SNAKE_CASE`

## 文案規則

### 玩家可見文案

1. 以繁體中文為主
2. 句子簡潔，避免過長說明
3. 同一個概念固定用同一個詞

例如：
1. 統一用「怪獸」，不要有時寫生物、有時寫精靈
2. 統一用「研究員 摩菈」
3. 統一用「遭遇戰」或「戰鬥」，不要混用太多叫法

### 程式內部 ID

統一使用英文小寫加連字號：

1. quest id：`intro-field-test`
2. creature id：`lumetail`
3. map id：`dawnbud-outskirts`
4. npc id：`researcher-mora`

## 註解規則

1. 只有在邏輯不直觀時才加註解
2. 註解解釋原因，不解釋顯而易見的動作
3. 註解優先使用英文或簡潔中文，但同一檔案需一致

## TypeScript 慣例

1. 優先明確型別
2. 避免 `any`
3. 共用結構先放 `types/`
4. 跨模組共享的字面值類型應明確定義

## Vue 慣例

1. `script setup` 優先
2. component 只負責顯示和事件轉發
3. 不在 component 中直接做核心數值運算

## 地圖資料慣例

1. `tiles` 一律使用固定寬度字串陣列
2. `width` 和 `height` 必須和 `tiles` 一致
3. 可互動物件要放在 `npcs` 或 `signs`
4. 特殊事件之後若增加，請獨立成 `triggers`

## Quest 慣例

1. 一個 quest 對應一個清楚的目標
2. `stageObjectives` 只描述玩家現在要做什麼
3. quest 推進規則寫在 `questSystem.ts`

## 戰鬥慣例

1. battle action 的 key 使用固定英文值
2. 顯示名稱由 UI 或資料表決定
3. 傷害計算集中在 `battleSystem.ts`

## 文件慣例

1. 重要規範寫進 `docs/`
2. 中長期世界觀與主線寫進 `game-blueprint.md`
3. 交接注意事項寫進 `docs/handoff.md`
