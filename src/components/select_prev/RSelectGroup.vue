<template>
  <div class="r-select-group">
    <slot name="header">
      <p class="title" v-if="titleVisible">{{ title }}</p>
    </slot>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { rSelectKey } from "@/injectionKeys";
import { ref, inject, computed } from "vue";
const select = inject(rSelectKey);
defineOptions({
  isSelectGroup: true,
});
const props = defineProps<{
  title?: string;
  keepTitleOnSearch?: boolean;
}>();

const titleVisible = computed(() => {
  if (props.keepTitleOnSearch) return true;
  else if (!select?.search.value) return true;
  else return false;
});
</script>

<style lang="scss">
.r-select-group {
  .title {
    padding: var(--r-space-1);
    font-weight: 500;
  }
}
</style>
