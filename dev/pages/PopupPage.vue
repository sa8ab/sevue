<template>
  <div class="center-it">
    <div class="items">
      <RButton @click="open">Button</RButton>
    </div>

    <RPopup v-model:active="active" :beforeClose="onBeforeClose" title="hi">
      <template #header> Custom header </template>
      <RSelect :options="users" :getText="(v) => v.name"> </RSelect>
      popup content
    </RPopup>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { users } from "../mock";

const open = () => {
  active.value = true;
};

const active = ref(false);
const onBeforeClose = (done: any) => {
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
