<script setup lang="ts">
import type { BattleAction } from "../game/types/battle";

defineProps<{
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
  .choices {
    grid-template-columns: 1fr;
  }
}
</style>
