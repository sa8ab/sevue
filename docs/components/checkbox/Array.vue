<template>
  <div class="container">
    <div class="checkboxes flex gap-4 justify-center">
      <RCheckbox
        v-model="selected"
        v-for="{ name, id } in list"
        :key="id"
        :val="name"
      >
        {{ name }}
      </RCheckbox>
    </div>
    <pre>{{ selected }}</pre>
  </div>
</template>

<script>
export default {
  data: () => ({
    selected: [],
    list: [
      { name: "Jack", id: 1 },
      { name: "James", id: 2 },
      { name: "Walter", id: 3 },
      { name: "Daniel", id: 4 },
    ],
  }),
};
</script>

<style>
</style>