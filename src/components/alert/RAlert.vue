<template>
  <div class="r-alert">ALERT</div>
</template>

<script lang="ts" setup>
export interface Props {
  title?: string | number | null;
  description?: string | number | null;
  noClose?: boolean;
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss"></style>
