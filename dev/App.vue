<template>
  <div class="app">
    <RButton @click="click"> toggle dark </RButton>
    <RButton @click="loader" textStyle flat> Loader </RButton>
    <RPagination :count="10" v-model="active" bordered />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import { LoadingKey, useLoading } from "../src/main";

const loading = useLoading();

const active = ref(1);
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
}
body {
  background: color(b1);
  color: color(text);
}
.loader-container {
  position: relative;
}
</style>
