<template>
  <input v-focus />
</template>

<script setup lang="ts">
const vFocus = {
  mounted: (el: HTMLElement) => {
    setTimeout(() => {
      el.focus();
    }, 1000);
  },
};
</script>
