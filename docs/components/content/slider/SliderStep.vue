<template>
  <div class="doc-item">
    <RSlider v-model="value" :step="10" :min="0" :max="100" tooltip ticks />
  </div>
</template>

<script lang="ts" setup>
const value = ref(40)
</script>
