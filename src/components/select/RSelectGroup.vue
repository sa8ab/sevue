<template>
  <div class="r-select-group">
    <p class="title" v-if="visible">{{ title }}</p>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { rSelectKey } from '@/injectionKeys';
import { computed, inject } from "vue";
const select = inject(rSelectKey);
defineOptions({
  isSelectGroup: true,
});
defineProps<{
  title?: string
}>()

const visible = computed(() => select?.search)
</script>

<style lang="scss">
.r-select-group {
  .title {
    padding: var(--r-space-1);
    font-weight: 500;
  }
}
</style>