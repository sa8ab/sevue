<template>
  <input v-focus />
</template>

<script setup lang="ts">
const vFocus = {
  mounted: (el) => console.log(el.value),
};
</script>
