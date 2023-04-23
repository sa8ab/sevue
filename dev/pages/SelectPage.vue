<template>
  <div class="center-it">
    <div class="container">
      <RSelect
        v-model="customSelected"
        placeholder="Type and hit enter"
        multiple
        searchable
        :loading="loading"
        canCreateOption
        @newOption="onNewOption"
      >
        <ROption v-for="item in items" :value="item.value" :text="item.text" />
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

const gItems = ref([
  {
    title: "UK",
    cities: [
      { name: "London", id: 1 },
      { name: "Bristol", id: 2 },
    ],
  },
  {
    title: "Russia",
    cities: [
      { name: "Moscow", id: 3 },
      { name: "Saint Petersburg", id: 4 },
      { name: "Novosibirsk", id: 5 },
    ],
  },
]);
const selected = ref("");

const searchTerm = ref("");
const loading = ref(false);

const items = ref([
  { text: "zxzxc", value: "zxzxc" },
  { text: "123", value: "123" },
]);
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

  // nextTick(() => {
  //   selectRef.value.setSelectedItems([
  //     {
  //       value: newOption,
  //       text: newOption,
  //     },
  //   ]);
  // });
  if (!isAlreadyInOptions) {
    items.value.push({
      value: newOption,
      text: newOption,
    });
  }

  console.log({ newOption, isAlreadyInOptions, isAlreadyInValue });
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
