<template>
  <div class="center-it">
    <div class="container">
      <RSelect
        v-model="customSelected"
        placeholder="Items"
        multiple
        searchable
        :customSearch="customSearch"
        :loading="loading"
        :items="filteredItems"
        keepOpenAfterSelection
        ref="selectRef"
      >
        <template #default="slotProps">
          <ROption
            v-for="item in slotProps.optimizedItems"
            :value="item.value"
            :text="item.text"
            :disabled="item.disabled"
            :color="item.itemColor"
          >
          </ROption>
        </template>
        <!-- <template #before> before </template>
        <template #toggleIcon="{ toggleOpen, active }">
          <RButton :icon="`bx-${active ? 'up' : 'down'}-arrow-alt`" flat color="red" iconOnly @click="toggleOpen" />
        </template>
        <template #loadingSpinner="{ loading }">
          <LoadingSpinner width="24" v-if="loading" />
        </template> -->
        <!-- <template #inputIcon>ic</template> -->
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
import LoadingSpinner from "../../src/components/LoadingSpinner.vue";

const searchTerm = ref("");
const loading = ref(false);
const selectRef = ref<InstanceType<typeof RSelect> | undefined>();

const items = ref(
  Array.from({ length: 100 }, (_, i) => {
    return {
      text: `parent ${i}`,
      value: i,
      disabled: i % 3 == 0,
      itemColor: i % 2 == 0 ? "red" : "yellow",
    };
  })
);

const customSelected = ref([]);

const filteredItems = computed(() => {
  return items.value.filter(({ text }) => {
    return text.includes(searchTerm.value);
  });
});

const customSearch = (param: string) => {
  console.log("customsearh called", param);

  searchTerm.value = param;
};

onMounted(() =>
  setTimeout(() => {
    selectRef.value.open();
  }, 1000)
);

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
