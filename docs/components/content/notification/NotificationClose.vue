<template>
  <div class="doc-items">
    <RButton @click="open">Open Notification</RButton>
    <RButton @click="close">Close Last Notification</RButton>
  </div>
</template>

<script lang="ts" setup>
import { useNotification, Notification } from 'sevue'
const notification = useNotification()

const noti = ref<Notification>()

const open = () => {
  noti.value = notification({
    color: 'red',
    text: 'Hey ZXC'
  })
}

const close = () => {
  noti.value?.close()
}

</script>

<style scoped lang="scss">
.doc-items {
  display: flex;
  gap: var(--r-space-1);
  flex-wrap: wrap;
}
</style>
