<template>
  <div class="app">
    <RButton @click="click" disabled> toggle dark </RButton>
    <RButton @click="click"> toggle dark </RButton>
    <RButton @click="loader" textStyle flat> Loader </RButton>
    <RTab bordered moverFull>
      <RTabItem title="some title"> hi </RTabItem>
      <RTabItem title="some other title">
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
        <div>hi</div>
      </RTabItem>
    </RTab>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import { LoadingKey, useLoading } from "../src/main";
// import RTab from '../src/components/tabs/RTab.vue'
// import RTabItem from '../src/components/tabs/RTabItem.vue'

const loading = useLoading();

const active = ref([0, 50]);
const items = ref([
  { value: "10", text: "hey there" },
  { value: "20", text: "some text" },
]);
const click = () => {
  document.body.classList.toggle("dark");
};
const loader = () => {
  const close = loading();
  setTimeout(() => {
    close();
  }, 1000);
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
}

body {
  background: color(b1);
  color: color(text);
}

.loader-container {
  position: relative;
}
</style>
