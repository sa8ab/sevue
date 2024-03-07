<template>
  <div class="items">
    <RButton to="/">To Home Page</RButton>
    <RButton href="/">Anchor Tag</RButton>
  </div>
</template>
<script setup lang="ts">
</script>

<style scoped lang="scss">
.items {
  display: flex;
  gap: var(--space-1);
}
</style>