<template>
  <div class="">
    <div class="slider-container">
      <div style="height: 40px"></div>
      <RSlider
        v-model="slider"
        :max="10"
        :min="0"
        :step="2"
        tooltip
        ticks
        tickLabels
      >
      </RSlider>
      <RSlider
        v-model="slider"
        :max="10"
        :min="0"
        :step="2"
        tooltip
        ticks
        tickLabels
      >
      </RSlider>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    slider: [1, 6],
  }),
};
</script>

<style>
.slider-container {
  width: 400px;
}
</style>