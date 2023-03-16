<template>
  <div class="flex justify-center">
    <RSelect
      v-model="selected"
      placeholder="Select An Option"
      label="Grouped Options"
      searchable
      isNested
    >
      <RSelectGroup v-for="{ cities, name } in items" :key="name" :title="name">
        <ROption
          v-for="city in cities"
          :key="city.id"
          :text="city.name"
          :value="city.id"
        />
      </RSelectGroup>
    </RSelect>
  </div>
</template>

<script>
export default {
  data: () => ({
    selected: null,
    items: [
      {
        name: "Greece",
        cities: [
          { name: "Athens", id: 1 },
          { name: "Patras", id: 2 },
          { name: "Larissa", id: 3 },
        ],
      },
      {
        name: "Russia",
        cities: [
          { name: "Moscow", id: 4 },
          { name: "Yekaterinburg", id: 5 },
          { name: "Kazan", id: 6 },
          { name: "Samara", id: 7 },
        ],
      },
      {
        name: "UAE",
        cities: [
          { name: "Dubai", id: 8 },
          { name: "Abu Dhabi", id: 9 },
        ],
      },
    ],
  }),
};
</script>

