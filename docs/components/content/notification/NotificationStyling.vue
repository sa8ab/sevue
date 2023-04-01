<template>
  <div class="doc-items">
    <RButton @click="runNotification({ color: 'red' })">Red Notification</RButton>
    <RButton @click="runNotification({ color: 'var(--r-text)', textColor: '#e34af0' })">White notification
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
    duration: 10000
  })
}
</script>

<style scoped lang="scss"></style>
