<script setup lang="ts">
defineProps<{
  sceneLabel: string;
  areaName: string;
  questTitle: string;
  questStage: number;
  objective: string;
  metResearcher: boolean;
}>();
</script>

<template>
  <div class="quest-stack">
    <div class="status-grid">
      <article class="stat-card">
        <span class="stat-label">場景</span>
        <strong>{{ sceneLabel }}</strong>
      </article>
      <article class="stat-card">
        <span class="stat-label">地點</span>
        <strong>{{ areaName }}</strong>
      </article>
    </div>

    <article class="quest-card">
      <p class="card-title">{{ questTitle }} #{{ questStage }}</p>
      <p>{{ objective }}</p>
    </article>

    <article class="quest-card">
      <p class="card-title">外勤狀態</p>
      <p>{{ metResearcher ? "已接下莫菈的外勤測試。" : "先去找研究員莫菈開啟任務。" }}</p>
    </article>
  </div>
</template>

<style scoped>
.quest-stack {
  margin-top: 24px;
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

.quest-card p {
  margin: 0;
  color: #37502c;
  line-height: 1.6;
}
</style>
