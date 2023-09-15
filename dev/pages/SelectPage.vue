<template>
  <div class="center-it">
    <div class="div" style="max-width: 200px">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Error in voluptatem magni. Beatae culpa alias fuga. Atque
      blanditiis soluta tenetur sit, officiis deleniti doloribus magnam architecto iure repellendus rerum possimus non,
      quae cupiditate repellat quidem eum quos fuga delectus. Consectetur facere illum excepturi quam, amet voluptate
      est soluta aspernatur saepe dolores iusto eum nisi eius quas ratione dolorum vero molestias repudiandae voluptatum
      quos odit adipisci perspiciatis consequatur tempora. Doloribus a cumque, quasi omnis minima nam eos culpa est
      laudantium odio. Perferendis, autem odit culpa earum saepe repellendus id hic optio quos maxime repudiandae amet
      laudantium nesciunt ratione, magnam odio magni reprehenderit velit iure qui, iste voluptatem natus fugiat!
      Repellat, recusandae amet voluptates repudiandae ex veniam unde consequuntur odit ducimus id voluptatum hic quos
      illo quis similique itaque aspernatur esse? Odio pariatur eos excepturi consequatur, assumenda commodi rem vel ea
      aperiam maxime quod earum porro ab amet eum eius aliquid. Rem reiciendis consequuntur sint. Quidem necessitatibus
      suscipit possimus error sequi, nemo atque explicabo obcaecati veniam. Doloribus nobis nisi velit, rem repudiandae
      voluptatum laborum culpa recusandae quo hic id dolores consequatur nostrum ad perferendis in vero aliquam soluta?
      Architecto delectus perspiciatis impedit voluptate fuga libero soluta ut tenetur! Mollitia sit delectus omnis?
    </div>
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
        <template #selectedItem="{ remove, text }">
          <div class="selected-items">{{ text }}</div>
          <div class="selected-items" @click="remove">remove</div>
        </template>
      </RSelect>

      <RButton @click="items = []">Empty list</RButton>
      <RButton @click="loading = !loading">Toggle Loading</RButton>
      <RButton @click="items = items.filter((_, index) => index !== 3)"> Remove some item </RButton>
    </div>
    <div class="container">
      <RSelect
        v-model="selected2"
        placeholder="select2"
        :items="
          Array.from({ length: 1000 }, (_, i) => ({
            value: i + 1,
            text: `item ${i + 1}`,
          }))
        "
        searchable
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
      est soluta aspernatur saepe dolores iusto eum nisi eius quas ratione dolorum vero molestias repudiandae voluptatum
      quos odit adipisci perspiciatis consequatur tempora. Doloribus a cumque, quasi omnis minima nam eos culpa est
      laudantium odio. Perferendis, autem odit culpa earum saepe repellendus id hic optio quos maxime repudiandae amet
      laudantium nesciunt ratione, magnam odio magni reprehenderit velit iure qui, iste voluptatem natus fugiat!
      Repellat, recusandae amet voluptates repudiandae ex veniam unde consequuntur odit ducimus id voluptatum hic quos
      illo quis similique itaque aspernatur esse? Odio pariatur eos excepturi consequatur, assumenda commodi rem vel ea
      aperiam maxime quod earum porro ab amet eum eius aliquid. Rem reiciendis consequuntur sint. Quidem necessitatibus
      suscipit possimus error sequi, nemo atque explicabo obcaecati veniam. Doloribus nobis nisi velit, rem repudiandae
      voluptatum laborum culpa recusandae quo hic id dolores consequatur nostrum ad perferendis in vero aliquam soluta?
      Architecto delectus perspiciatis impedit voluptate fuga libero soluta ut tenetur! Mollitia sit delectus omnis?
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
const selected2 = ref("");

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

const onNewOption = async ({ newOption, isAlreadyInOptions, isAlreadyInValue }) => {
  loading.value = true;
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
  loading.value = false;
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
}

.selected-item {
  display: flex;
  gap: var(--r-space-1);

  img {
    width: 24px;
  }
}
</style>
