<template>
  <div class="center-it">
    <div class="items">
      <RButton @click="active = true">Button</RButton>
    </div>

    <RPopup v-model:active="active" noCloseButton :beforeClose="onBeforeClose">
      <template #header> Custom header </template>
      popup content
    </RPopup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const active = ref(false);
const onBeforeClose = (done) => {
  done();
};
</script>

<style lang="scss" scoped>
.center-it {
  max-width: 400px;
  margin: auto;
}
.items {
  display: flex;
  align-items: center;
}
</style>
