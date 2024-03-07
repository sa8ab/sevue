<template>
  <div class="doc-item">
    <RSelect
      v-model="selectedMultiple"
      multiple
      placeholder="Select Items"
      :renderPlaceholder="renderPlaceholder"
      label="Custom Selected Items"
    >
      <ROption v-for="{ name, flag, id } in items" :value="id" :context="{ name, flag }">
        <div class="custom-option">
          <img :src="flag" />
          <span>{{ name }}</span>
        </div>
      </ROption>
      <template #selectedItem="{ context, remove }">
        <RButton class="selected-item" textStyle @click="remove">
          <img :src="context.flag" />
          <span>{{ context.name }}</span>
          <i class="bx bx-x"></i>
        </RButton>
      </template>
    </RSelect>
  </div>
</template>

<script lang="ts" setup>
const items = ref([
  { name: "Germany", id: 1, flag: "https://www.countryflagicons.com/FLAT/32/DE.png" },
  { name: "Italy", id: 2, flag: "https://www.countryflagicons.com/FLAT/32/IT.png" },
  { name: "United Kingdom", id: 3, flag: "https://www.countryflagicons.com/FLAT/32/GB.png" },
  { name: "France", id: 4, flag: "https://www.countryflagicons.com/FLAT/32/FR.png" },
  { name: "Greece", id: 5, flag: "https://www.countryflagicons.com/FLAT/32/GR.png" },
]);
const selectedMultiple = ref([]);

const renderPlaceholder = (options: any) => {
  return `${options.length} items selected`;
};
</script>

<style scoped lang="scss">
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
}

.selected-item {
  display: flex;
  align-items: center;
  gap: var(--r-space-1);
  font-size: var(--r-font-small);
  padding: 4px 8px;
  border: 1px solid rgba(gray, 0.4);

  img {
    width: 14px;
    height: 14px;
    display: flex;
    overflow: hidden;
  }
}
</style>
