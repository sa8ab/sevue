<template>
  <div class="doc-item">
    <RSlider v-model="value" :min="0" :max="10" tooltip ticks />
  </div>
</template>

<script lang="ts" setup>
const value = ref(2)
</script>
