<template></template>

<script setup lang="ts">
import { reactive, toRef, ref, useSlots, computed } from "vue";

export interface Props {}

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});
</script>

<style lang="scss"></style>
