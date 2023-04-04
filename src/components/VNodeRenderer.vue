<template>
  <component :is="() => param" v-if="isVNode(param)"></component>
  <slot v-else>
    <div v-bind="$attrs">{{ param }}</div>
  </slot>
</template>

<script setup lang="ts">
import { isVNode } from 'vue';
defineOptions({
  inheritAttrs: false
})
defineProps({
  param: [String, Object]
})
</script>