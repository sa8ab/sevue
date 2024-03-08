<template>
  <div style="max-width: 280px">
    <!-- #region template -->
    <RSelect
      v-model="selected"
      label="Multiple"
      multiple
      :closeAfterSelection="false"
      :options="items"
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

const items = ref([
  { name: "Germany", id: 1 },
  { name: "Italy", id: 2 },
  { name: "United Kingdom", id: 3 },
  { name: "France", id: 4 },
  { name: "Greece", id: 5 },
]);
const selected = ref([]);
// #endregion script
</script>
