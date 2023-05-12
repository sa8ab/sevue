<template>
  <RButton @click="runNotification()">50vw Width</RButton>
</template>

<script lang="ts" setup>
import { useNotification } from "sevue";

const notification = useNotification();
const runNotification = () => {
  notification({
    text: `Some Notification Text`,
    title: "TITLE",
    width: "50vw",
    color: "var(--r-b2)",
  });
};
</script>
