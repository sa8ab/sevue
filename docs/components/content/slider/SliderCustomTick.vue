<template>
  <div class="doc-item">
    <RSlider v-model="value" :min="0" :max="100" tooltip :customTicks="customTicks" />
  </div>
</template>

<script lang="ts" setup>
const value = ref(40);
const customTicks = [
  { value: 10, text: "Cold" },
  { value: 38, text: "Semi Cold" },
  { value: 68, text: "Warm" },
  { value: 96, text: "Hot" },
];
</script>
