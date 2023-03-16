<template>
  <div class="container">
    <RSlider
      v-model="slider"
      :step="5"
      :min="0"
      :max="40"
      ticks
      tooltip
      alwaysTooltip
    >
      <template #tooltip="{ value }">
        <span> x{{ value }} </span>
      </template>
    </RSlider>
  </div>
</template>

<script>
export default {
  data: () => ({
    slider: [10, 30],
  }),
};
</script>

<style>
</style>