<template>
  <div class="container">
    <RSlider v-model="slider" :step="10" :min="0" :max="100" ticks tickLabels />
  </div>
</template>

<script>
export default {
  data: () => ({
    slider: [20, 80],
  }),
};
</script>

<style>
</style>