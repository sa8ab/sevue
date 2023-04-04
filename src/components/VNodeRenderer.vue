<template>
  <component :is="() => param" v-if="isVNode(param)"></component>
  <div v-bind="$attrs" v-else>{{ param }}</div>
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