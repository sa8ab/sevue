<template>
  <div class="app">
    <SevueProvider>
      <RouterView />
    </SevueProvider>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Provider as SevueProvider } from "../src/main";

onMounted(() => {
  document.documentElement.classList.add("dark");
});
</script>

<style lang="scss">
.app {
  min-height: 100vh;
  position: relative;
}

body {
  background: color(b1);
  color: color(text);
  position: relative;
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
