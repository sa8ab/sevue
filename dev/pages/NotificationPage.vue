<template>
  <div class="center-it">
    <RButton @click="notify">Notify</RButton>
    <RButton @click="notification({ title: 'zxcxc' })">Notify</RButton>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useNotification } from '../../src/main';

const notification = useNotification()
const notify = () => {
  notification({
    title: h('p', null, 'hey'),
    text: 'some textsome textsome textsome textsome textsome textsome textsome text',
    color: 'var(--r-b1)',
    duration: -1
  })
}
</script>


<style lang="scss" scoped></style>