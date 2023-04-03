<template>
  <div class="doc-item">
    <RSelect
      v-model="state.selected"
      placeholder="Select Items"
      :renderPlaceholder="renderPlaceholder"
      searchable
      multiple
      :loading="state.loading"
      noDropdownOnEmptySearch
      :customSearch="customSearh">
      <ROption v-for="item in state.users" :value="item.id" :context="item">
        <div class="custom-option">
          <span>{{ item.firstName }} {{ item.lastName }}</span>
        </div>
      </ROption>
      <template #selectedItem="{ context }">
        {{ context.firstName }} {{ context.lastName }}
      </template>
    </RSelect>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios'

interface State {
  users: { firstName: string, lastName: string, id: number }[]
  loading: boolean
  selected: number[]
}
const state = reactive<State>({
  users: [],
  loading: false,
  selected: []
})


const getUsers = async (search = '') => {
  state.loading = true
  const { data } = await axios.get('https://dummyjson.com/users/search', { params: { q: search } })
  state.loading = false
  return data.users
}

const customSearh = async (search: string) => {
  state.users = await getUsers(search)
  console.log(state);

}

const renderPlaceholder = (options: any) => {
  return `${options.length} users selected`
}

onMounted(async () => {
  state.users = await getUsers()
})
</script>

<style scoped lang="scss">
.custom-option {
  display: flex;
  align-items: center;
  gap: var(--r-space-1);

  img {
    width: 24px;
    height: 24px;
    display: flex;
    overflow: hidden;
  }
}

.selected-item {
  display: flex;
  align-items: center;
  gap: var(--r-space-1);

  img {
    width: 14px;
    height: 14px;
    display: flex;
    overflow: hidden;
  }
}
</style>

