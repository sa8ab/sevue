<template>
  <div class="center-it">
    <RButton @click="notify">Notify</RButton>
    <RButton @click="notify('400px')">Different width</RButton>
  </div>
</template>

<script setup lang="ts">
import { h } from "vue";
import { useNotification } from "../../src/main";
import CookieNotification from "../components/Cnot.vue";

const notification = useNotification();
const notify = (width = "300px") => {
  const I = notification({
    text: h(CookieNotification, {
      onClose: () => I.close(),
    }),
    noCloseButton: true,
    duration: -1,
    color: "var(--r-b2)",
    width,
    placement: "top-left",
  });
};
</script>

<style lang="scss" scoped></style>
