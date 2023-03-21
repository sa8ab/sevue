<template>
  <div class="doc-item two">
    <RSelect v-model="selected" placeholder="Select City">
      <RSelectGroup v-for="{ title, cities } in items" :title="title">
        <ROption v-for="{ name, id } in cities" :value="id" :text="name" />
      </RSelectGroup>
    </RSelect>
  </div>
</template>

<script lang="ts" setup>
const items = ref([
  {
    title: "UK",
    cities: [
      { name: "London", id: 1 },
      { name: "Bristol", id: 2 },
    ],
  },
  {
    title: "Russia",
    cities: [
      { name: "Moscow", id: 3 },
      { name: "Saint Petersburg", id: 4 },
      { name: "Novosibirsk", id: 5 },
    ],
  },
]);
const selected = ref();
</script>
