<template>
  <div class="doc-input">
    <RInput v-model="name" placeholder="Please enter your name" label="Name" />
  </div>
</template>

<script lang="ts" setup>
const name = ref("");
</script>

<style scoped lang="scss">
</style>
