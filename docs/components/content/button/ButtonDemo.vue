<template>
  <div class="items">
    <RButton v-for="{ name, props } in items" v-bind="props">{{ name }}</RButton>
  </div>
</template>

<script lang="ts" setup>
const items = [
  { name: 'Default', props: {} },
  { name: 'Flat Style', props: { fill: true, color: 'yellow' } },
  { name: 'Fill Style', props: { flat: true, color: 'red' } },
  { name: 'Disabled', props: { disabled: true } }
]
</script>

<style scoped lang="scss">
.items {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}
</style>