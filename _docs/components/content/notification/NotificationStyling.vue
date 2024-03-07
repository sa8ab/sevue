<template>
  <div class="doc-items">
    <RButton @click="runNotification({ color: 'green' })">Green Notification</RButton>
    <RButton @click="runNotification({ color: 'var(--r-text)', textColor: 'var(--r-b1)' })">Inverted color notification
    </RButton>
  </div>
</template>

<script lang="ts" setup>
import { useNotification } from 'sevue'

const notification = useNotification()
const runNotification = ({ color, textColor }: { color: string, textColor?: string }) => {
  notification({
    text: `Some Notification Text`,
    title: "TITLE",
    color,
    textColor,
  })
}
</script>

<style scoped lang="scss">
.doc-items {
  display: flex;
  gap: var(--r-space-1);
  flex-wrap: wrap;
}
</style>
