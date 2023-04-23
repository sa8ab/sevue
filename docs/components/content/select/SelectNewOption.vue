<template>
  <div class="doc-items two">
    <div class="item">
      <div class="description">Without dropdown and we do not care about <code>items</code> prop or <code>ROption</code></div>
      <pre class="preview">{{ selected }}</pre>
      <div class="select-container">
        <RSelect
          v-model="selected"
          label="Create Items By Pressing Enter"
          multiple
          searchable
          canCreateOption
          @newOption="onNewOption"
          ref="selectRef"
          noDropdown
        >
        </RSelect>
      </div>
    </div>
    <div class="item">
      <div class="description">With dropdown and we add new option to list of options</div>
      <pre class="preview">{{ selected2 }}</pre>
      <div class="select-container">
        <RSelect v-model="selected2" label="Create Items By Pressing Enter" multiple searchable canCreateOption @newOption="onNewOption2">
          <ROption v-for="item in items2" :value="item.value" :text="item.text" />
        </RSelect>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface NewOption {
  newOption: string;
  isAlreadyInValue: boolean;
  isAlreadyInOptions: boolean;
}

// EXAMPLE 1:
const selected = ref<string[]>([]);
const selectRef = ref();
const onNewOption = ({ newOption, isAlreadyInValue }: NewOption) => {
  if (!isAlreadyInValue) {
    selected.value.push(newOption);
  }
  // since we are not padding `items` prop OR we are not provinding `ROption` in default slot we need to use `setSelectedItems` to update the value shown to user
  nextTick(() => {
    selectRef.value.setSelectedItems([
      {
        text: newOption,
        value: newOption,
      },
    ]);
  });
};

// EXAMPLE 2
const selected2 = ref<Array<string>>([]);
const items2 = ref([
  { text: "item 1", value: "item 1" },
  { text: "item 2", value: "item 2" },
  { text: "item 3", value: "item 3" },
  { text: "item 4", value: "item 4" },
]);
const onNewOption2 = ({ newOption, isAlreadyInValue, isAlreadyInOptions }: NewOption) => {
  if (!isAlreadyInValue) {
    selected2.value.push(newOption);
  }

  if (!isAlreadyInOptions) {
    // isAlreadyInOptions checks the value of each existing item with the typed value by user. you can use your own comparing to check
    // if item is already exisiting
    items2.value.push({
      text: newOption,
      value: newOption,
    });
  }
};
</script>

<style scoped lang="scss">
.doc-items {
  gap: var(--r-space-3);
  width: 100%;
  .select-container {
    background: rgb(var(--r-b2));
    padding: var(--r-space-2);
    border-radius: var(--r-radius);
  }
  .preview {
    font-size: var(--r-font-small);
    padding: var(--r-space-2) 0;
  }
}
</style>
