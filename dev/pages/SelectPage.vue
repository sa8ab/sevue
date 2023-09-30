<template>
  <div class="center-it">
    <div class="container">
      <RSelect v-model="selected2" placeholder="Type and hit enter" :loading="loading" teleport="body">
        <ROption v-for="item in items" :value="item.value" :text="item.text" />
        <!-- <template #selectedItem="{ remove, text }">
          <div class="selected-items">{{ text }}</div>
          <div class="selected-items" @click="remove">remove</div>
        </template> -->
      </RSelect>
      <!-- 
      <RButton @click="items = []">Empty list</RButton>
      <RButton @click="loading = !loading">Toggle Loading</RButton>
      <RButton @click="items = items.filter((_, index) => index !== 3)"> Remove some item </RButton> -->
    </div>
    <div class="container">
      <RSelect
        v-model="customSelected"
        placeholder="select2"
        :items="items2"
        searchable
        :loading="loading"
        canCreateOption
        multiple
        :onNewOption="onNewOption"
      >
        <template #default="{ optimizedItems }">
          <ROption :value="item.value" :text="item.text" v-for="item in optimizedItems" />
        </template>
      </RSelect>
    </div>
    <div class="div" style="max-width: 200px">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in voluptatem magni. Beatae culpa alias fuga. Atque
      blanditiis soluta tenetur sit, officiis deleniti doloribus magnam architecto iure repellendus rerum possimus non,
      quae cupiditate repellat quidem eum quos fuga delectus. Consectetur facere illum excepturi quam, amet voluptate
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
const selected2 = ref("");

const searchTerm = ref("");
const loading = ref(false);

const items = ref([
  { text: "zxzxc", value: "zxzxc" },
  { text: "123", value: "123" },
]);
const items2 = ref(
  Array.from({ length: 20 }, (_, i) => ({
    value: i + 1,
    text: `item ${i + 1}`,
  }))
);

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

const onNewOption = async ({ newOption, isAlreadyInOptions, isAlreadyInValue }) => {
  loading.value = true;
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
  loading.value = false;
  if (!isAlreadyInValue) {
    customSelected.value = [...customSelected.value, newOption];
  }

  if (!isAlreadyInOptions) {
    items2.value.push({
      value: newOption,
      text: newOption,
    });
  }

  console.log({ newOption, isAlreadyInOptions, isAlreadyInValue });

  return true;
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
  margin-top: 40px;
}

.selected-item {
  display: flex;
  gap: var(--r-space-1);

  img {
    width: 24px;
  }
}
</style>
