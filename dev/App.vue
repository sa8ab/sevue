<template>
  <div class="app">
    <RButton @click="click"> toggle dark </RButton>
    <RSelect v-model="v" label="label" keepOpenAfterSelection>
      <ROption v-for="{ value, text } in items" :value="value" :text="text" />
    </RSelect>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useNotification } from "../src/main";
const notification = useNotification();

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
