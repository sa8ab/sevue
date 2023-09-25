<template>
  <div class="">
    <RAlert title="New Alert some text inside it please notice it">
      <template #before> before </template>
      <div>some text</div>
      <div>some text</div>

      <template #close="{ close }">
        <div @click="close">Custom Close</div>
      </template>
    </RAlert>
    <RAlert title="New Alert some text inside it please notice it" color="yellow" />
    <RAlert title="New Alert some text inside it please notice it" color="red" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
