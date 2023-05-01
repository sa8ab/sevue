<template>
  <div class="doc-items card">
    <RSwitch v-model="selected1" v-for="color in colors" :color="color"></RSwitch>
  </div>
</template>

<script lang="ts" setup>
const selected1 = ref(true);
const colors = ["red", "green", "#9b59b6", "rgba(247, 159, 31,1.0)", "rgba(18, 203, 196,1.0)"];
</script>

<style scoped lang="scss">
.doc-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--r-space-1);
}
</style>
