<template>
  <div class="container">
    <div class="items">
      <RButton @click="open">Button</RButton>
    </div>

    <RPopup v-model:active="active">
      <template #header> Custom header </template>
      <RSelect :options="users" :getText="(v) => v.name"> </RSelect>
      popup content
    </RPopup>
    <RButton @click="open">Button After</RButton>
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

<style lang="scss">
*:focus {
  border: 1px solid red;
}
</style>
