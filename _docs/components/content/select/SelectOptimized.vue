<template>
  <div class="doc-item">
    <RSelect v-model="selected" :items="items" :itemExtractor="itemExtractor" searchable label="Select with 10k items">
      <template #default="{ optimizedItems }">
        <ROption v-for="{ itemId, itemTitle } in optimizedItems" :value="itemId" :text="itemTitle" />
      </template>
    </RSelect>
  </div>
</template>

<script lang="ts" setup>
type Item = {
  itemTitle: string;
  itemId: number;
};

const items = ref<Array<Item>>(
  Array.from({ length: 10000 }, (_, i) => {
    return {
      itemTitle: `item #${i}`,
      itemId: i,
    };
  })
);
const selected = ref();
const itemExtractor = (item: Item) => {
  return {
    ...item,
    value: item.itemId,
    text: item.itemTitle,
  };
};
</script>
