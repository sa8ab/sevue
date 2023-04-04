<template>
  <div class="center-it">
    <RButton @click="load" icon="x">Load</RButton>
    <RButton @click="loading({
      target: target
    })">Load</RButton>
    <div class="target r-loading-target" ref="target">
      <div>sdfds</div>
      <div class="zxczxcs">d</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoading } from '../../src/main';

const { loading, close } = useLoading()
const target = ref()
const instance = ref()
const load = () => {
  instance.value = loading({
    color: 'yellow'
  })
  setTimeout(() => close(), 2000)
}
</script>


<style lang="scss" scoped>
.target {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  background: color(b2);
  border-radius: var(--r-radius);
}
</style>