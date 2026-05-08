<script setup lang="ts">
defineProps<{
  speaker: string;
  text: string;
  hint?: string;
}>();
</script>

<template>
  <div class="dialog-box">
    <p class="speaker">{{ speaker }}</p>
    <p class="text">{{ text }}</p>
    <p v-if="hint" class="hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
.dialog-box {
  color: #314626;
}

.speaker {
  margin: 0 0 10px;
  color: #22321a;
  font-family: "Courier New", monospace;
  font-size: 0.98rem;
}

.text {
  margin: 0;
  line-height: 1.8;
  min-height: 56px;
}

.hint {
  margin: 14px 0 0;
  color: #4b6540;
  font-family: "Courier New", monospace;
  font-size: 0.84rem;
}
</style>
