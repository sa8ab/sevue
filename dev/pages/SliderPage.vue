<template>
  <div class="center-it">
    {{ selected }}
    <div class="container">
      <RSlider v-model="selected" :min="min" :max="max" :step="3" ticks :customTicks="customTicks"> </RSlider>
    </div>
    <RButton @click="changeMinMax">Change min and max</RButton>
    <RButton @click="selected = [1, 100]">Upper value to more than max</RButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selected = ref([2, 4]);
const min = ref(2);
const max = ref(20);

const customTicks = [
  {
    value: 8,
    text: "Eight",
  },
  {
    value: 21,
    text: "last",
  },
];

const changeMinMax = () => {
  max.value = 4;
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 600px;
  width: 100%;
  margin-bottom: 20px;
}
</style>
