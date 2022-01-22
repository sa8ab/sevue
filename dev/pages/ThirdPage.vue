<template>
  <div class="">
    <div class="slider-container">
      <pre>{{ slider }}</pre>
      <RSlider
        v-model="slider"
        :max="10"
        :min="0"
        :step="2"
        tooltip
        ticks
        alwaysTooltip
        tickLabels
      >
        <template #tooltip="{ value }">{{ value }}</template>
      </RSlider>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    slider: [0, 10],
  }),
};
</script>

<style>
.slider-container {
  width: 400px;
}
</style>