<template>
  <div class="doc-item">
    <RSlider v-model="value" :min="0" :max="10" tooltip alwaysTooltip />
  </div>
</template>

<script lang="ts" setup>
const value = ref(4)
</script>
