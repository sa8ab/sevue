<template>
  <div class="container">
    <pre>slider value: {{ slider }}</pre>
    <RSlider v-model="slider" :step="5" :min="0" :max="100" ticks />
  </div>
</template>

<script>
export default {
  data: () => ({
    slider: [10, 40],
  }),
};
</script>

<style>
</style>