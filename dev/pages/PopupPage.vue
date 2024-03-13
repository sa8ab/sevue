<template>
  <div class="container">
    <div class="items">
      <RButton @click="open">Button</RButton>
    </div>

    <RPopup :active="active" title="hi" @close="active = false">
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
.container {
  max-width: 400px;
  margin: auto;
}
.items {
  display: flex;
  align-items: center;
}
</style>

<style lang="scss"></style>
