<template>
  <div class="app dark">
    <div>
      <RButton @click="click"> hi there </RButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';

const notification: any = inject('notification')
const click = () => {
  notification({
    text: 'some notification',
  })
};
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  gap: $p2;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: color(b1);
}
</style>
