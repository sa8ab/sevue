<template>
  <div class="doc-items">
    <RButton @click="open" :disabled="!!noti">Show Notification</RButton>
    <RButton @click="close" :disabled="!noti">Close Notification</RButton>
  </div>
</template>

<script lang="ts" setup>
import { useNotification, Notification } from 'sevue'
const notification = useNotification()

const noti = ref<Notification | undefined>(undefined)

const open = () => {
  noti.value = notification({
    color: 'red',
    text: 'Hey ZXC',
    onClose: () => noti.value = undefined,
    duration: -1
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
