<template>
  <div class="input-items">
    <RInput v-model="name" placeholder="Please enter your name" label="Name" />
    <RInput v-model="name" placeholder="Error Input" error message="Can't leave empty" label="Name" />
    <RInput v-model="name" placeholder="Green Color" icon="bx-user-circle" color="green" label="Name" />
  </div>
</template>

<script lang="ts" setup>
const name = ref("");
</script>

<style scoped lang="scss">
.doc-input {
  margin: auto;
}
</style>
