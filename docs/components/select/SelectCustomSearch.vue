<template>
  <div class="doc-item">
    <RSelect v-model="selected" placeholder="Select Items" :renderPlaceholder="renderPlaceholder" searchable :customSearch="customSearh">
      <ROption v-for="{ name, flag, id } in filteredItems" :value="id" :context="{ name, flag }">
        <div class="custom-option">
          <img :src="flag" />
          <span>{{ name }}</span>
        </div>
      </ROption>
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
const filteredItems = ref(items.value);
const selected = ref();

const customSearh = (search: string) => {
  filteredItems.value = items.value.filter(({ name }) => {
    return name.toLowerCase().includes(search.toLowerCase());
  });
};

const renderPlaceholder = (options: any) => {
  return options.context.name;
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

  img {
    width: 14px;
    height: 14px;
    display: flex;
    overflow: hidden;
  }
}
</style>
