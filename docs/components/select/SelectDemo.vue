<template>
  <div class="doc-items two">
    <RSelect v-model="selected" placeholder="Select An Option" label="Demo">
      <ROption v-for="{ name, id } in items" :value="id" :text="name" />
    </RSelect>
    <RSelect v-model="selected" placeholder="Select An Option" label="Searchable" searchable>
      <ROption v-for="{ name, id } in items" :value="id" :text="name" />
    </RSelect>
  </div>
</template>

<script lang="ts" setup>
const items = ref([
  { name: "Vue", id: 1 },
  { name: "React", id: 2 },
  { name: "Svelte", id: 3 },
  { name: "Nuxt", id: 4 },
  { name: "Node", id: 5 },
]);
const selected = ref();
</script>
