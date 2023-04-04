<template>
  <div class="center-it">
    <RButton @click="load">Load</RButton>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { useLoading } from '../../src/main';

const loading = useLoading()
const instance = ref()
const load = () => {
  instance.value = loading({
    text: h('div', undefined, 'Some random text'),
    spinner: h('div', undefined, 'hey')
  })
  setTimeout(() => {
    instance.value.close()
  }, 1000);
}
</script>


<style lang="scss" scoped></style>