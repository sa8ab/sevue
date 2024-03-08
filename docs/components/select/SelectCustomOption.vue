<!-- #region template -->
<template>
  <RSelect v-model="selected" :options="items" :getText="(o) => o.name" :getValue="(o) => o.id" label="Single Item">
    <template #option="{ option, isSelected }">
      <div class="custom-option">
        <img :src="option.flag" />
        <span>{{ option.name }}</span>
        <span class="is-selected" v-if="isSelected">I'm Selected</span>
      </div>
    </template>
  </RSelect>
</template>
<!-- #endregion template -->

<script lang="ts" setup>
// #region script
import { ref } from "vue";

const items = ref([
  { name: "Germany", id: 1, flag: "/images/flag-gr.png" },
  { name: "Italy", id: 2, flag: "/images/flag-it.png" },
  { name: "United Kingdom", id: 3, flag: "/images/flag-uk.png" },
  { name: "France", id: 4, flag: "/images/flag-fr.png" },
]);

const selected = ref();
// #endregion script
</script>

<style lang="scss">
.custom-option {
  display: flex;
  align-items: center;
  gap: var(--r-space-1);

  img {
    width: 24px;
    height: 24px;
    display: flex;
    overflow: hidden;
  }
  .is-selected {
    margin-left: auto;
  }
}
</style>
