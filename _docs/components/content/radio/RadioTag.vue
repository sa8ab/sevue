<template>
  <div class="doc-items">
    <RRadio tag v-for="item in items" :value="item.id" v-model="selected" :disabled="item.disabled" :color="item.color">
      {{ item.name }}
    </RRadio>
  </div>
</template>

<script lang="ts" setup>
const items = [
  { name: "Default", id: 1 },
  { name: "Red", id: 2, color: "red" },
  { name: "Disabled", id: 3, disabled: true },
  { name: "RGBA", id: 4, color: "rgba(229, 142, 38,1.0)" },
];
const selected = ref(1);
</script>

<style scoped lang="scss">
.doc-items {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: var(--r-space-1);
  justify-content: center;
  .r-radio {
    line-height: 1;
  }
}
</style>
