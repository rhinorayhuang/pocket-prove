<script setup lang="ts">
import type { BattleAction } from "../game/types/battle";
import type { CreatureState } from "../game/types/game";

defineProps<{
  partner: CreatureState;
  enemy: CreatureState;
  choices: Array<{
    key: BattleAction;
    label: string;
    description: string;
  }>;
  selectedIndex: number;
}>();

const emit = defineEmits<{
  select: [action: BattleAction];
}>();
</script>

<template>
  <div class="battle-menu">
    <p class="speaker">戰鬥指令</p>

    <div class="battle-summary" aria-label="戰鬥狀態">
      <article class="fighter-card">
        <span>我方</span>
        <strong>{{ partner.name }}</strong>
        <div class="hp-track">
          <span class="hp-fill ally" :style="{ width: `${(partner.hp / partner.maxHp) * 100}%` }" />
        </div>
        <small>{{ partner.hp }} / {{ partner.maxHp }} HP</small>
      </article>

      <article class="fighter-card enemy">
        <span>對手</span>
        <strong>{{ enemy.name }}</strong>
        <div class="hp-track">
          <span class="hp-fill foe" :style="{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }" />
        </div>
        <small>{{ enemy.hp }} / {{ enemy.maxHp }} HP</small>
      </article>
    </div>

    <div class="choices">
      <button
        v-for="(choice, index) in choices"
        :key="choice.key"
        class="choice"
        :class="{ active: selectedIndex === index }"
        type="button"
        @click="emit('select', choice.key)"
      >
        <strong>{{ choice.label }}</strong>
        <span>{{ choice.description }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.speaker {
  margin: 0 0 10px;
  color: #22321a;
  font-family: "Courier New", "Microsoft JhengHei", monospace;
  font-size: 0.98rem;
}

.choices {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.battle-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 12px;
}

.fighter-card {
  border: 2px solid rgba(42, 61, 32, 0.22);
  border-radius: 16px;
  padding: 10px;
  background: rgba(247, 252, 234, 0.7);
}

.fighter-card span,
.fighter-card strong,
.fighter-card small {
  display: block;
}

.fighter-card span,
.fighter-card small {
  color: #536946;
  font-size: 0.78rem;
}

.fighter-card strong {
  margin-top: 4px;
  color: #22311a;
  font-family: "Courier New", "Microsoft JhengHei", monospace;
}

.hp-track {
  height: 9px;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: #99b17a;
}

.hp-fill {
  display: block;
  height: 100%;
}

.hp-fill.ally {
  background: linear-gradient(90deg, #1c4a23 0%, #4c8c43 100%);
}

.hp-fill.foe {
  background: linear-gradient(90deg, #8a5233 0%, #cf8342 100%);
}

.fighter-card small {
  margin-top: 6px;
}

.choice {
  border: 2px solid #2a3d20;
  border-radius: 18px;
  padding: 14px;
  text-align: left;
  cursor: pointer;
  color: #22311a;
  background: #d7e8ba;
}

.choice strong,
.choice span {
  display: block;
}

.choice strong {
  font-family: "Courier New", "Microsoft JhengHei", monospace;
}

.choice span {
  margin-top: 8px;
  font-size: 0.9rem;
  line-height: 1.5;
}

.choice.active {
  background: #b6d78f;
}

@media (max-width: 640px) {
  .battle-summary,
  .choices {
    grid-template-columns: 1fr;
  }
}
</style>
