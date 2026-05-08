<script setup lang="ts">
import type { CreatureState } from "../game/types/game";

defineProps<{
  partner: CreatureState;
  stepCount: number;
  wins: number;
}>();
</script>

<template>
  <div class="panel-stack">
    <div class="status-grid">
      <article class="stat-card">
        <span class="stat-label">步數</span>
        <strong>{{ stepCount }}</strong>
      </article>
      <article class="stat-card">
        <span class="stat-label">勝場</span>
        <strong>{{ wins }}</strong>
      </article>
    </div>

    <article class="quest-card">
      <p class="card-title">同行夥伴</p>
      <p class="partner-name">
        {{ partner.name }}
        <span>Lv.{{ partner.level }}</span>
      </p>
      <div class="hp-meter" aria-label="夥伴生命值">
        <span class="hp-fill" :style="{ width: `${(partner.hp / partner.maxHp) * 100}%` }" />
      </div>
      <p class="partner-hp">{{ partner.hp }} / {{ partner.maxHp }} HP</p>
    </article>
  </div>
</template>

<style scoped>
.panel-stack {
  margin-top: 20px;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 14px;
}

.stat-card,
.quest-card {
  border: 2px solid rgba(35, 51, 27, 0.2);
  border-radius: 18px;
  padding: 14px 16px;
  background: rgba(247, 252, 234, 0.82);
}

.stat-label {
  display: block;
  margin-bottom: 8px;
  color: #4d6640;
  font-size: 0.82rem;
}

.stat-card strong,
.card-title {
  font-family: "Courier New", "Microsoft JhengHei", monospace;
}

.stat-card strong {
  color: #1f2f17;
  font-size: 1.05rem;
}

.card-title {
  margin: 0 0 10px;
  color: #314626;
  font-weight: 700;
}

.partner-name {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin: 0;
  color: #37502c;
  font-weight: 700;
}

.partner-name span {
  font-size: 0.9rem;
}

.hp-meter {
  margin-top: 12px;
  width: 100%;
  height: 14px;
  border-radius: 999px;
  overflow: hidden;
  background: #99b17a;
}

.hp-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #1c4a23 0%, #4c8c43 100%);
}

.partner-hp {
  margin: 8px 0 0;
  color: #37502c;
  font-size: 0.92rem;
}
</style>
