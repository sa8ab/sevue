<template>
  <div class="app">
    <RButton @click="click"> toggle dark </RButton>
    <RButton @click="active = true">Popup</RButton>
    <RPopup v-model:active="active" title="cdsdsofmek"> some content </RPopup>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const active = ref(false);
const items = ref([
  { value: "10", text: "hey there" },
  { value: "20", text: "some text" },
]);
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
}
body {
  background: color(b1);
  color: color(text);
}
</style>
