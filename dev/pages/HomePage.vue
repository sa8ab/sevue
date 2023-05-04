<template>
  <div class="items">
    <RouterLink to="/select" class="item" v-ripple>Select</RouterLink>
    <RouterLink to="/pagination" class="item" v-ripple>Pagination</RouterLink>
    <RouterLink to="/checkbox" class="item" v-ripple>Checkbox</RouterLink>
    <RouterLink to="/notification" class="item" v-ripple> Notification </RouterLink>
    <RouterLink to="/loading" class="item" v-ripple>Loading</RouterLink>
    <RouterLink to="/tabs" class="item" v-ripple>Tabs</RouterLink>
    <RouterLink to="/input" class="item" v-ripple>Input</RouterLink>
    <RouterLink to="/button" class="item" v-ripple>Button</RouterLink>
    <RouterLink to="/radio" class="item" v-ripple>Radio</RouterLink>
    <RouterLink to="/switch" class="item" v-ripple>Switch</RouterLink>
    <RouterLink to="/slider" class="item" v-ripple>Slider</RouterLink>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--r-space-2);
  padding: var(--r-space-2);

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
