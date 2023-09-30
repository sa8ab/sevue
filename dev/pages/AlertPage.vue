<template>
  <div class="">
    <RAlert title="New Alert some text inside it please notice it">
      <template #before> before </template>
      <template v-if="show">
        <div>some text</div>
        <div>some text</div>
      </template>

      <template #close="{ close }">
        <div @click="close">Custom Close</div>
      </template>
    </RAlert>
    <RAlert title="New Alert some text inside it please notice it" color="yellow" />
    <RAlert title="New Alert some text inside it please notice it" color="red" />
    <RButton @click="show = !show">toggle</RButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const show = ref(false);
</script>

<style lang="scss" scoped></style>
