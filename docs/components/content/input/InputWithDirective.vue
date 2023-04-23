<template>
  <input v-focus />
</template>

<script setup lang="ts">
const vFocus = {
  mounted: (el: HTMLInputElement) => {
    el.value = "set by directive";
  },
};
</script>
