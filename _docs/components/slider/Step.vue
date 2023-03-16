<template>
  <div class="container">
    <pre>slider value: {{ slider }}</pre>
    <RSlider
      v-model="slider"
      :step="step"
      :min="0"
      :max="100"
      :precision="precision"
      :ticks="ticks"
      :tickLabels="tickLabels"
    />
  </div>
</template>

<script>
export default {
  props: ["ticks", "tickLabels", "step", "precision"],
  data: () => ({
    slider: 10,
  }),
};
</script>

<style>
</style>