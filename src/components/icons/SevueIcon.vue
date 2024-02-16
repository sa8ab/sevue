<template>
  <Component :is="icon" :width="size" :height="size" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";
const props = defineProps<{
  name?: string;
  size?: string;
}>();

const icon = defineAsyncComponent(() => import(`./svgs/${props.name}.svg`));
</script>
