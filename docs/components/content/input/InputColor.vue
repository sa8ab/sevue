<template>
  <div class="input-items">
    <RInput v-model="value" color="#1abc9c" placeholder="Hex color"/>
    <RInput v-model="value" color="rgb(52, 73, 94)" placeholder="RGB color"/>
  </div>
</template>

<script lang="ts" setup>
const value = ref("")
</script>
