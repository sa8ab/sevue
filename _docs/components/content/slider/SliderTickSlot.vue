<template>
  <div class="doc-item">
    <RSlider v-model="value" :min="0" :max="100" tooltip :customTicks="customTicks">
      <template #tick="{ text, color, icon }">
        <div class="custom-tick" :style="{ color }">
          <span>{{ icon }}</span>
          {{ text }}
        </div>
      </template>
      <template #tooltip="{ value }">
        <div class="custom-tooltip">{{ value }} °C</div>
      </template>
    </RSlider>
  </div>
</template>

<script lang="ts" setup>
const value = ref(38);
const customTicks = [
  { value: 10, text: "Cold", color: "#7ed6df", icon: "🧊" },
  { value: 38, text: "Semi Cold", color: "#2d98da" },
  { value: 68, text: "Warm", color: "#fa8231" },
  { value: 96, text: "Hot", color: "#eb3b5a", icon: "🔥" },
];
</script>

<style scoped lang="scss">
.custom-tick,
.custom-tooltip {
  white-space: nowrap;
}
</style>
