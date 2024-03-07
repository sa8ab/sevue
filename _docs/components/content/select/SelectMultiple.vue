<template>
  <div class="doc-item">
    <RSelect v-model="selected" multiple keepOpenAfterSelection placeholder="Multiple Select">
      <ROption v-for="{ name, id } in items" :value="id" :text="name" />
    </RSelect>
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
const selected = ref([]);
</script>

