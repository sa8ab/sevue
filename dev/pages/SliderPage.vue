<template>
  <div class="center-it">
    {{ selected }}
    <div class="container">
      <RSlider
        v-model="selected"
        :min="min"
        :max="max"
        :step="3"
        ticks
        :customTicks="customTicks"
        @change="onChange"
        tooltip
      >
        <template #tick="{ text, hi }">
          <div class="custom-tick">{{ text }} {{ hi }}</div>
        </template>
      </RSlider>
      <RSlider
        v-model="selected"
        :min="min"
        :max="max"
        :step="3"
        ticks
        :customTicks="customTicks"
        @change="onChange"
        disabled
      >
      </RSlider>
    </div>
    <RButton @click="changeMinMax">Change min and max</RButton>
    <RButton @click="selected = [1, 100]">Upper value to more than max</RButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RSlider } from "../../src/main";

const selected = ref([2, 4]);
const min = ref(2);
const max = ref(20);

const onChange = (e) => console.log(e);

const customTicks = [
  {
    value: 4,
    text: "Four",
    hi: "324",
  },
  {
    value: 8,
    text: "Eight",
  },
  {
    value: 20,
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
.custom-tick {
  display: flex;
  align-items: flex-end;
}
</style>
