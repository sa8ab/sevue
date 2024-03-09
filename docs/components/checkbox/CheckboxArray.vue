<template>
  <div class="doc-items four">
    <!-- #region template -->
    <RCheckbox v-model="state" v-for="{ name, id, disabled } in items" :value="id" :disabled="disabled">
      {{ name }}
    </RCheckbox>
    <pre>Selected: {{ state }}</pre>
    <!-- #endregion template -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// #region script

const items = [
  { name: "Switzerland", id: 1 },
  { name: "Poland", id: 2 },
  { name: "Croatia (disabled)", id: 3, disabled: true },
  { name: "Sweden", id: 4 },
];

const state = ref([]);

// #endregion script
</script>

<style scoped>
.doc-item {
  max-width: 100%;
}
</style>
