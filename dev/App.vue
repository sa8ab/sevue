<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  document.documentElement.classList.add("dark");
});
</script>

<style lang="scss">
.app {
  min-height: 100vh;
}

body {
  background: color(b1);
  color: color(text);
}

.center-it {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
  gap: var(--r-space-2);
}
</style>
