<template>
  <div class="r-select-group">
    <p class="title" v-if="visible">{{ title }}</p>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { RSelectKey } from '@/injectionKeys';
import { computed, inject } from "vue";
const select = inject(RSelectKey);
defineProps<{
  title?: string
}>()

const visible = computed(() => select?.search)
</script>

<style lang="scss">
.r-select-group {
  .title {
    padding: $p;
    font-weight: 500;
  }
}
</style>