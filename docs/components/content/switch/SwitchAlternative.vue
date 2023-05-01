<template>
  <div class="doc-items">
    <div class="container normal">
      <RSwitch v-model="selected"></RSwitch>
    </div>
    <div class="alternative container">
      <RSwitch v-model="selected" alternative></RSwitch>
    </div>
  </div>
</template>

<script lang="ts" setup>
const selected = ref(false);
</script>

<style scoped lang="scss">
.doc-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--r-space-1);
}
.container {
  padding: var(--r-space-2);
  border-radius: var(--r-radius);
  &.normal {
    background: rgb(var(--r-b1));
  }
  &.alternative {
    background: rgb(var(--r-b2));
  }
}
</style>
