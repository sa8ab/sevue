<template>
  <div class="center-it">
    <div class="container">
      <RSelect
        v-model="customSelected"
        placeholder="Items"
        multiple
        searchable
        :loading="loading"
        :items="items"
        canCreateOption
        @newOption="onNewOption"
        ref="selectRef"
        noDropdown
      >
        <template #default="slotProps">
          <ROption v-for="item in slotProps.optimizedItems" :value="item.value" :text="item.text"> </ROption>
        </template>
      </RSelect>
      <RSelect
        v-model="singleSelected"
        placeholder="single item"
        searchable
        canCreateOption
        @newOption="onNewSingleOption"
        ref="singleSelectRef"
      >
        <ROption v-for="item in items2" :value="item.value" :text="item.text"> </ROption>
      </RSelect>
      <RButton @click="items = []">Empty list</RButton>
      <RButton @click="loading = !loading">Toggle Loading</RButton>
      <RButton @click="items = items.filter((_, index) => index !== 3)"> Remove some item </RButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { RSelect } from "../../src/main";
import { computed } from "vue";
import { onMounted } from "vue";
import { nextTick } from "vue";

const searchTerm = ref("");
const loading = ref(false);

const items = ref([]);
const items2 = ref([]);

const customSelected = ref([]);
const singleSelected = ref("");

const filteredItems = computed(() => {
  return items.value.filter(({ text }) => {
    return text.includes(searchTerm.value);
  });
});

const selectRef = ref();
const singleSelectRef = ref();

const customSearch = (param: string) => {
  searchTerm.value = param;
};

const onNewOption = ({ newOption, isAlreadyInOptions, isAlreadyInValue }) => {
  if (!isAlreadyInValue) {
    customSelected.value = [...customSelected.value, newOption];
  }
  items.value.push({
    value: newOption,
    text: newOption,
  });
};
const onNewSingleOption = ({ newOption, isAlreadyInOptions, isAlreadyInValue }) => {
  singleSelected.value = newOption;
  items2.value.push({
    value: newOption,
    text: newOption,
  });
};

// onMounted(async () => {
//   loading.value = true;
//   const { data } = await axios.get(`https://dummyjson.com/products`);
//   loading.value = false;
//   console.log(data.products);

//   items.value = data.products;
// });
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--r-space-2);
}

.selected-item {
  display: flex;
  gap: var(--r-space-1);

  img {
    width: 24px;
  }
}
</style>
