<template>
  <RButton @click="runNotification()">With Before Option</RButton>
</template>

<script lang="ts" setup>
import { useNotification } from "sevue";

const notification = useNotification();
const runNotification = () => {
  notification({
    title: `WARNING`,
    text: `Oops some issue is detected`,
    color: "var(--r-b2)",
    textColor: "yellow",
    before: h("i", {
      class: "bx bx-error",
      style: "font-size: 2rem",
    }),
  });
};
</script>
