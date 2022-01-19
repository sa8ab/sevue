<template>
  <div class="container">
    <div class="flex justify-center">
      <RSelect v-model="selected" placeholder="Select An Option">
        <ROption
          v-for="{ id, name } in items"
          :key="id"
          :text="name"
          :value="id"
        />
      </RSelect>
    </div>
    <pre>selected id: {{ selected }}</pre>
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

<style scoped>
</style>