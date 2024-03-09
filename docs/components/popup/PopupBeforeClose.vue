<template>
  <RButton @click="active = true">Show Popup</RButton>
  <RPopup v-model:active="active" title="Demo Popup" :beforeClose="onBeforeClose">
    This popup will close after 1 seconds of clicking outside popup or clicking close icon.
  </RPopup>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const active = ref(false);
const onBeforeClose = (done: () => void) => {
  setTimeout(() => {
    done();
  }, 1000);
};
</script>

<style scoped lang="scss"></style>
