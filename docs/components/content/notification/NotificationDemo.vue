<template>
  <RButton @click="runNotification">Show Notification In Random Color</RButton>
</template>

<script lang="ts" setup>
import { useNotification } from 'sevue'

const notification = useNotification()
const runNotification = () => {
  const color = generateRandomColor()
  notification({
    text: `Some Notification Text ${color}`,
    title: "TITLE",
    color: color
  })
}
const generateRandomColor = () => {
  let maxVal = 0xFFFFFF; // 16777215
  let randomNumber: any = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`
}
</script>

<style scoped lang="scss"></style>
