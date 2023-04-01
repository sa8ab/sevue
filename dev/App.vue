<template>
  <div class="app">
    <!-- <RButton @click="click" disabled> toggle dark </RButton>
    <RButton @click="click"> toggle dark </RButton>
      <RSelect v-model="selected" message="some message">
        <ROption value="x" text="xc"></ROption>
      </RSelect>
    <RButton @click="loader" textStyle flat> Loader </RButton>
    <RTab bordered class="tabbar" :initialActiveTab="1">
      <RTabItem title="some title" :disabled="true"> hi </RTabItem>
      <RTabItem title="tab 2"> Tab 2 </RTabItem>
      <RTabItem title="some other title">
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
      </RTabItem>
    </RTab>
    <RCheckbox v-model="x" :color="checkboxColor">Checkbox</RCheckbox>
    <RButton @click="checkboxColor = 'yellow'">Change Color {{ checkboxColor }}</RButton>
    <div class="select-n-input">

      <RInput icon="bx-user" />
      <RInput icon="bx-user" iconAfter />
    </div> -->
    <RButton @click="onEvent" color="red">Test button</RButton>
    <RInput></RInput>
    <RSlider v-model="value" :min="0" :max="10" tooltip ticks />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
const value = ref(4)
const onEvent = () => {
}
const iref = ref();
const active = ref([0, 50]);
const x = ref(false);
const checkboxColor = ref("green");
const items = ref([
  { value: "10", text: "hey there" },
  { value: "20", text: "some text" },
]);
const selected = ref("");
const click = () => {
  document.body.classList.toggle("dark");
};

onMounted(() => {

  document.body.classList.add("dark");
});
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  gap: $p2;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-width: 800px;
  margin: auto;
  padding: 8px;
}

.tabbar {
  width: 100%;
}

body {
  background: color(b1);
  color: color(text);
}

.loader-container {
  position: relative;
}

.select-n-input {
  display: flex;
  align-items: center;
}
</style>
