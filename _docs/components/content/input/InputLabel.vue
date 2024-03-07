<template>
  <div class="doc-input">
    <RInput v-model="value" label="Seme label" placeholder="Some placeholder"/>
  </div>
</template>

<script lang="ts" setup>
const value = ref("")
</script>
