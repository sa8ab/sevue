<template>
  <div class="app">
    <RButton @click="click"> toggle dark </RButton>
    <RInput label="RInput" v-model="v" />
    {{ v }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const v = ref("");
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
  background: color(b1);
  color: color(text);
}
</style>
