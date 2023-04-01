<template>
  <div class="items">
    <RouterLink to="/select" class="item" v-ripple>Select</RouterLink>
    <RouterLink to="/select" class="item" v-ripple>x</RouterLink>
    <RouterLink to="/select" class="item" v-ripple>x</RouterLink>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--r-space-2);

  .item {
    box-shadow: 0 0 0 1px rgba(var(--r-border-color), var(--border-alpha));
    border-radius: var(--r-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    font-size: calc(var(--r-font-xlarge) * 2);
  }
}
</style>