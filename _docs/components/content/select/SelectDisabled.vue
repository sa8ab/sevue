<template>
  <div class="doc-items two">
    <RSelect v-model="selected" :disabled="disabled">
      <ROption v-for="{ name, id } in items" :value="id" :text="name" />
    </RSelect>
    <RButton @click="disabled = !disabled">{{ disabled ? 'Enable' : 'Disable' }}</RButton>
  </div>
</template>

<script lang="ts" setup>

const items = ref([
  { name: "Germany", id: 1 },
  { name: "Italy", id: 2 },
  { name: "United Kingdom", id: 3 },
  { name: "France", id: 4 },
  { name: "Greece", id: 5 },
]);
const selected = ref();
const disabled = ref(true)
</script>

