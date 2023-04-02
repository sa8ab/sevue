<template>
  <div class="center-it">
    <div class="container">
      <RSelect v-model="singleSelected" placeholder="Select Something" searchable>
        <ROption v-for="x in 100" :value="x" :text="`item #${x}`"></ROption>
      </RSelect>
      <RSelect v-model="selected" placeholder="Select Something" searchable multiple>
        <ROption v-for="x in 100" :value="x" :text="`item #${x}`"></ROption>
      </RSelect>
      <RSelect
        v-model="customSelected"
        placeholder="Remote Items"
        :customSearch="customSearch"
        searchable
        :loading="loading"
        :renderPlaceholder="renderPlaceholder">
        <ROption v-for="item in items" :value="item.id">
          {{ item.title }}
        </ROption>
      </RSelect>
      <RButton @click="items = []">Empty list</RButton>
    </div>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import axios from 'axios'
import { ref } from 'vue';

const selected = ref('')
const singleSelected = ref([])
const items = ref([])

const loading = ref(false)

const customSelected = ref('')
const search = ref('')
const customSearch = async (e) => {
  loading.value = true
  const { data } = await axios.get(`https://dummyjson.com/products/search?q=${e}`)
  loading.value = false
  console.log(data)
  items.value = data.products
}
const renderPlaceholder = (option) => {
  console.log(option);
  return `${option.value}`
}
</script>


<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--r-space-2);
}
</style>