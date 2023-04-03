<template>
  <div class="center-it">
    <div class="container">
      <RSelect
        v-model="customSelected"
        placeholder="Remote Items"
        :customSearch="customSearch"
        searchable
        :loading="loading"
        :renderPlaceholder="renderPlaceholder"
        multiple
        ref="selectRef"
        noDropdownOnEmptySearch>
        <ROption v-for="item in items" :value="item.id" :context="item">
          {{ item.title }} - {{ item.id }}
        </ROption>
        <template #selectedItem="{ context }">
          <div class="selected-item">
            <img :src="context.thumbnail" alt="">
            <span>{{ context.title }}</span>
          </div>
        </template>
      </RSelect>
      <RButton @click="items = []">Empty list</RButton>
      <RButton @click="items = items.filter((_, index) => index !== 3)">Remove some item</RButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import axios from 'axios'
import { onMounted, ref } from 'vue';
import { RSelect } from '../../src/main'

const items = ref([])

const loading = ref(false)
const selectRef = ref<InstanceType<typeof RSelect> | undefined>()

const customSelected = ref([])
const customSearch = async (e) => {
  loading.value = true
  const { data } = await axios.get(`https://dummyjson.com/products/search?q=${e}`)
  loading.value = false
  items.value = data.products
}

const renderPlaceholder = (option) => {
  return `${option.length} items selected`
}
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
    width: 24px
  }
}
</style>