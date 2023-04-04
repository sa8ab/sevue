<template>
  <div class="center-it">
    <RButton @click="notify">Notify</RButton>
  </div>
</template>

<script setup lang="ts">
import { useNotification } from '../../src/main';

const notification = useNotification()
const notify = () => {
  notification({
    text: 'some textsome textsome textsome textsome textsome textsome textsome text',
    color: 'red'
  })
}
</script>


<style lang="scss" scoped></style>