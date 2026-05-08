<script setup lang="ts">
const props = defineProps<{
  currentStage: number;
}>();

const routeSteps = [
  "找莫菈接下外勤測試",
  "完成第一場野外戰鬥",
  "抵達曙芽廣場",
  "進入曙芽研究所",
  "前往日徑路",
  "擊敗道路斥候塔菈",
  "回研究所找瑞亞回報",
  "抵達溪畔哨站",
  "取得瑟拉隊長簡報",
  "調查溪橋封鎖標記",
  "回哨站完成回報"
];

function getStepState(index: number) {
  if (props.currentStage > index) {
    return "done";
  }

  if (props.currentStage === index) {
    return "active";
  }

  return "locked";
}
</script>

<template>
  <article class="route-card">
    <div class="route-header">
      <p class="card-title">Demo Route</p>
      <span>{{ Math.min(currentStage + 1, routeSteps.length) }} / {{ routeSteps.length }}</span>
    </div>

    <ol class="route-list">
      <li
        v-for="(step, index) in routeSteps"
        :key="step"
        :class="getStepState(index)"
      >
        <span class="route-marker">{{ index + 1 }}</span>
        <span>{{ step }}</span>
      </li>
    </ol>
  </article>
</template>

<style scoped>
.route-card {
  margin-top: 18px;
  border: 2px solid rgba(35, 51, 27, 0.2);
  border-radius: 18px;
  padding: 14px 16px;
  background: rgba(247, 252, 234, 0.82);
}

.route-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card-title,
.route-header span,
.route-marker {
  font-family: "Courier New", "Microsoft JhengHei", monospace;
}

.card-title {
  margin: 0;
  color: #314626;
  font-weight: 700;
}

.route-header span {
  color: #526d44;
  font-size: 0.85rem;
}

.route-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}

.route-list li {
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 8px;
  align-items: center;
  color: #6a7a5f;
  line-height: 1.45;
}

.route-marker {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  color: #eaf5da;
  background: #91a873;
  font-size: 0.78rem;
  font-weight: 700;
}

.route-list li.done {
  color: #3b5a2e;
}

.route-list li.done .route-marker {
  background: #4f7942;
}

.route-list li.active {
  color: #1f3519;
  font-weight: 700;
}

.route-list li.active .route-marker {
  color: #22331a;
  background: #f0cf69;
  box-shadow: 0 0 0 3px rgba(240, 207, 105, 0.24);
}
</style>
