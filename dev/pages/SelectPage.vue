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
        placeholder="Filter by age"
        :customSearch="customSearch"
        searchable
        multiple
        noDropdownOnEmptySearch>
        <ROption v-for="item in filteredItems" :value="item.id" :text="`${item.name}`"></ROption>
      </RSelect>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ref } from 'vue';

const selected = ref('')
const singleSelected = ref([])
const items = ref([
  { name: 'Josef', id: 1, age: 30 },
  { name: 'UnJosef', id: 2, age: 34 },
  { name: 'Peter', id: 3, age: 35 },
  { name: 'Stewie', id: 4, age: 38 },
  { name: 'John', id: 5, age: 29 },
])


const customSelected = ref('')
const search = ref('')
const filteredItems = computed(() => {
  return items.value.filter(({ name }) => `${name}`.includes(search.value))
})
const customSearch = (e) => {
  search.value = e
}
</script>


<style lang="scss" scoped>
.container {
  display: flex;
  gap: var(--r-space-2);
}
</style>