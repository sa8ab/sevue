<template>
  <div class="container">
    <pre>slider value: {{ slider }}</pre>
    <RSlider v-model="slider" :min="0" :max="100" />
  </div>
</template>

<script>
export default {
  data: () => ({
    slider: 80,
  }),
};
</script>

<style>
</style>