<template>
  <div class="container">
    <div class="checkboxes flex gap-4 justify-center">
      <RCheckbox
        v-model="selected"
        v-for="{ name, id, color } in list"
        :key="id"
        :val="name"
        :color="color"
      >
        {{ name }}
      </RCheckbox>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    selected: ["Red", "RGBA color", "Hex Value", "RGB color"],
    list: [
      { name: "Red", id: 1, color: "red" },
      { name: "RGBA color", id: 2, color: "rgba(243, 104, 224, 1)" },
      { name: "Hex Value", id: 3, color: "#e67e22" },
      { name: "RGB color", id: 4, color: "rgb(22, 160, 133)" },
    ],
  }),
};
</script>

<style>
</style>