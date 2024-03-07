<template>
  <div class="button-items">
    <RButton v-for="{ name, props } in items" v-bind="props">{{ name }}</RButton>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const items = [
  { name: "Default", props: {} },
  { name: "Fill Style", props: { fill: true, color: "yellow" } },
  { name: "Flat Style", props: { flat: true, color: "red" } },
  { name: "Disabled", props: { disabled: true } },
];
const v = ref(true);
</script>

<style lang="scss">
.button-items {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
