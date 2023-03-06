<template>
  <div class="app dark">
    <div>
      <RButton @click="click"> hi there </RButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotification } from '../src/main'
const notification = useNotification()

const click = () => {
  notification({
    text: 'Notification Text',
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
