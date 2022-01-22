<template>
  <div class="container">
    <pre>slider value: {{ slider }}</pre>
    <RSlider
      v-model="slider"
      :step="10"
      :min="0"
      :max="100"
      :ticks="ticks"
      :tickLabels="tickLabels"
    />
  </div>
</template>

<script>
export default {
  props: ["ticks", "tickLabels"],
  data: () => ({
    slider: 10,
  }),
};
</script>

<style>
</style>