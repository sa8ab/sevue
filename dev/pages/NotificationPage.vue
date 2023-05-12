<template>
  <div class="center-it">
    <RButton @click="notify()">Notify</RButton>
  </div>
</template>

<script setup lang="ts">
import { h } from "vue";
import { useNotification } from "../../src/main";
import CookieNotification from "../components/Cnot.vue";

const notification = useNotification();
const notify = () => {
  const I = notification({
    title: "TITLE",
    text: "some text",
    color: "var(--r-b2)",
    textColor: "red",
    // before: h("i", {
    //   class: "bx bx-user",
    // }),
    duration: -1,
  });
};
</script>

<style lang="scss" scoped></style>
