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
    <RButton @click="loading">Loading</RButton>
    <div
      style="
        background: #404040;
        width: 200px;
        height: 200px;
        position: relative;
      "
      class="targetx"
      ref="target"
    >
      target
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    slider: [1, 6],
  }),
  methods: {
    loading() {
      const x = this.$r.loading({
        target: this.$refs.target,
      });
      setTimeout(() => {
        x.close();
      }, 3000);
    },
  },
};
</script>

<style>
.slider-container {
  width: 400px;
}
</style>