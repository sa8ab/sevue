<template>
  <div class="doc-item">
    <RSelect
      v-model="selected"
      label="Create Options"
      multiple
      searchable
      canCreateOption
      @newOption="onNewOption"
      ref="selectRef"
      message="Type your item and hit Enter"
      noDropdown
    >
      <ROption v-for="item in items" :value="item.value" :text="item.text"> </ROption>
    </RSelect>
    <RSelect
      v-model="singleSelected"
      label="Single Option"
      searchable
      canCreateOption
      @newOption="onNewSingleOption"
      message="Type your item and hit Enter"
    >
      <ROption v-for="item in items2" :value="item.value" :text="item.text"> </ROption>
    </RSelect>
  </div>
</template>

<script lang="ts" setup>
const items = ref<{ text: string; value: string }[]>([]);
const items2 = ref<{ text: string; value: string }[]>(
  Array.from({ length: 5 }, (_, i) => ({
    text: `item ${i}`,
    value: `item ${i}`,
  }))
);
const selected = ref<string[]>([]);
const singleSelected = ref<string>();

const selectRef = ref();

const onNewOption = ({
  newOption,
  isAlreadyInValue,
  isAlreadyInOptions,
}: {
  newOption: string;
  isAlreadyInValue: boolean;
  isAlreadyInOptions: boolean;
}) => {
  if (!isAlreadyInValue) {
    selected.value.push(newOption);
  }
  items.value.push({
    text: newOption,
    value: newOption,
  });

  // Or call `setSelectedItems` instead. (adding new items is recommended if you are mutating v-model)
  // selectRef.value.setSelectedItems([
  //   {
  //     text: newOption,
  //     value: newOption,
  //   },
  // ]);
};

const onNewSingleOption = ({
  newOption,
  isAlreadyInOptions,
}: {
  newOption: string;
  isAlreadyInValue: boolean;
  isAlreadyInOptions: boolean;
}) => {
  singleSelected.value = newOption;

  if (!isAlreadyInOptions) {
    items2.value.push({
      text: newOption,
      value: newOption,
    });
  }
};
</script>

<style scoped lang="scss">
.doc-item {
  display: flex;
  flex-direction: column;
  gap: var(--r-space-3);
}
</style>
