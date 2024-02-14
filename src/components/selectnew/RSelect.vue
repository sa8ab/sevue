<template></template>

<script setup lang="ts"></script>

<style lang="scss">
.r-select {
}
.fade-move {
  &-enter-active,
  &-leave-active {
    .r-select-dropdown {
      transition: all calc(var(--r-duration) / 1.5);
    }

    transition: opacity calc(var(--r-duration) / 1.5);
  }

  &-enter-from,
  &-leave-to {
    .r-select-dropdown {
      opacity: 0;
      transform: translateY(4px);
    }
  }
}
</style>
