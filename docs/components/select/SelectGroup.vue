<template>
  <div class="doc-item two">
    <!-- #region template -->
    <RSelect
      v-model="selected"
      placeholder="Select City"
      searchable
      :groupedOptions="items"
      :getGroupOptions="(group) => group.cities"
      :getGroupTitle="(g) => g.title"
      :getText="(o) => o.name"
      :getValue="(o) => o.id"
    >
    </RSelect>
    <!-- #endregion template -->
  </div>
</template>

<script lang="ts" setup>
// #region script
import { ref } from "vue";
const items = [
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
];
const selected = ref();
// #endregion script
</script>
