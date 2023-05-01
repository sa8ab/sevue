<template>
  <div class="container card">
    <pre>{{ selected }}</pre>
    <div class="doc-items">
      <RSwitch v-model="selected" v-for="item in items" :value="item.value">{{ item.text }}</RSwitch>
    </div>
  </div>
</template>

<script lang="ts" setup>
const selected = ref(["react"]);
const items = [
  {
    value: "vue",
    text: "Vue",
  },
  {
    value: "react",
    text: "React",
  },
  {
    value: "angular",
    text: "Angular",
  },
  {
    value: "svelte",
    text: "Svelte",
  },
];
</script>

<style scoped lang="scss">
.doc-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--r-space-1);
  margin-top: var(--r-space-2);
}
</style>
