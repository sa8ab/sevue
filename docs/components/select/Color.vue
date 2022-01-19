<template>
  <div class="flex justify-center flex-wrap gap-4 container">
    <RSelect
      v-model="selected"
      placeholder="Select An Option"
      label="Red"
      color="red"
    >
      <ROption
        v-for="{ id, name } in items"
        :key="id"
        :text="name"
        :value="id"
      />
    </RSelect>
    <RSelect
      v-model="selected"
      placeholder="Select An Option"
      label="RGB"
      color="rgb(1, 163, 164)"
    >
      <ROption
        v-for="{ id, name } in items"
        :key="id"
        :text="name"
        :value="id"
      />
    </RSelect>
    <RSelect
      v-model="selected"
      placeholder="Select An Option"
      label="Custom"
      color="#f368e0"
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
    selected: null,
    items: [
      { name: "Vue", id: 1 },
      { name: "React", id: 2 },
      { name: "Svelte", id: 3 },
      { name: "Nuxt", id: 4 },
      { name: "Node", id: 5 },
    ],
  }),
};
</script>

