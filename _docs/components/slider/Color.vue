<template>
  <div class="container">
    <RSlider v-model="slider1" :min="0" :max="10" color="green" ticks />
    <div style="height: 24px"></div>
    <RSlider v-model="slider2" :min="0" :max="10" color="red" ticks />
    <div style="height: 24px"></div>
    <RSlider v-model="slider3" :min="0" :max="10" color="#e056fd" ticks />
  </div>
</template>

<script>
export default {
  data: () => ({
    slider1: [0, 4],
    slider2: 4,
    slider3: 8,
  }),
};
</script>

<style>
</style>