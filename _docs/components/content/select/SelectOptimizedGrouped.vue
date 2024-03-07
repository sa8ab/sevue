<template>
  <div class="doc-item">
    <RSelect
      v-model="selected"
      :items="items"
      :itemExtractor="itemExtractor"
      searchable
      label="Select with 1k items 10 children each"
      groupIdentifier="groupUniqueId"
      itemsKey="children"
    >
      <template #default="{ optimizedItems }">
        <RSelectGroup v-for="item in optimizedItems" :title="item.title">
          <ROption v-for="child in item.children" :value="child.itemValue" :text="child.itemText" />
        </RSelectGroup>
      </template>
    </RSelect>
  </div>
</template>

<script lang="ts" setup>
type Item = {
  itemValue: string;
  itemText: string;
};

type Group = {
  groupUniqueId: number;
  title: string;
  children: Item[];
};

const items = ref<Group[]>(
  Array.from({ length: 1000 }, (_, i) => {
    return {
      groupUniqueId: i,
      title: `Group ${i}`,
      children: Array.from({ length: 10 }, (_, childIndex) => {
        return {
          itemValue: `${i} - ${childIndex}`,
          itemText: `Item #${i} - ${childIndex}`,
        };
      }),
    };
  })
);

const selected = ref();

const itemExtractor = (item: Item) => {
  return {
    ...item,
    value: item.itemValue,
    text: item.itemText,
  };
};
</script>
