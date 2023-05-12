<template>
  <RButton @click="showCookies()">Show Cookies</RButton>
</template>

<script lang="ts" setup>
import { useNotification } from "sevue";
import CookieExample from "./CookieExample.vue";

const notification = useNotification();
const showCookies = () => {
  const I = notification({
    text: h(CookieExample, {
      onClose: () => I.close(),
    }),
    color: "var(--r-b2)",
    duration: -1,
    noCloseButton: true,
  });
};
</script>
