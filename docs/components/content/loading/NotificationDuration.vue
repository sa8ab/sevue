<template>
  <RButton @click="runNotification()">10 second notification</RButton>
</template>

<script lang="ts" setup>
import { useNotification } from 'sevue'

const notification = useNotification()
const runNotification = () => {
  notification({
    text: `Some Notification Text`,
    title: "TITLE",
    duration: 10000
  })
}
</script>
