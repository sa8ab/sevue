<template>
  <div class="">
    <div class="slider-container">
      <pre>{{ slider }}</pre>
      <RSlider
        v-model="slider"
        :max="50000"
        :min="40000"
        :step="100"
        color="red"
        tooltip
        alwaysTooltip
      >
        <template #tooltip="{ value }">{{ value }}</template>
      </RSlider>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    slider: [40000, 40000],
  }),
};
</script>

<style>
.slider-container {
  width: 400px;
}
</style>