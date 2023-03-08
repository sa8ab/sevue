<template>
  <div class="app dark">
    <RButton @click="click"> hi there </RButton>
    <RSelect v-model="v">
      <ROption v-for="{ value, text } in items" :value="value" :text="text" />
    </RSelect>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useNotification } from "../src/main";
const notification = useNotification();

const v = ref("");
const items = ref([
  { value: "10", text: "hey there" },
  { value: "20", text: "some text" },
]);
const click = () => {
  notification({
    text: "Notification Text",
  });
};
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
}
</style>
