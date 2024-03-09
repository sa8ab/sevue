<template>
  <div class="">
    <!-- #region template -->
    <RButton @click="disabled = !disabled">{{ disabled ? "Enable" : "Disable" }}</RButton>
    <RSelect
      label="Disabled Select"
      v-model="selected"
      :disabled="disabled"
      :options="items"
      :getText="(o) => o.name"
      :getValue="(o) => o.id"
    >
    </RSelect>
    <RSelect
      label="Some Options Disabled"
      v-model="selected"
      :options="items"
      :getText="(o) => o.name"
      :getValue="(o) => o.id"
      :getIsDisabled="(o) => o.id == 2 || o.id == 4"
    >
    </RSelect>

    <!-- #endregion template -->
  </div>
</template>

<script lang="ts" setup>
// #region script
import { ref } from "vue";

const disabled = ref(true);
const selected = ref();

const items = [
  { name: "Germany", id: 1 },
  { name: "Italy", id: 2 },
  { name: "United Kingdom", id: 3 },
  { name: "France", id: 4 },
  { name: "Greece", id: 5 },
];

// #endregion script
</script>
