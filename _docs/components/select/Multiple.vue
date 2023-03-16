<template>
  <div class="flex justify-center">
    <RSelect
      v-model="selected"
      placeholder="Multiple Select"
      label="Multiple Select"
      searchable
      multiple
    >
      <ROption
        v-for="{ id, name } in items"
        :key="id"
        :text="name"
        :value="id"
      />
    </RSelect>
  </div>
</template>

<script>
export default {
  data: () => ({
    selected: [],
    items: [
      { name: "Manager", id: 1 },
      { name: "CEO", id: 2 },
      { name: "Partner", id: 3 },
      { name: "Developer", id: 4 },
    ],
  }),
};
</script>

