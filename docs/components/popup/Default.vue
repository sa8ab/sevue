<template>
  <div class="container">
    <RButton @click="openPopup">Open Popup</RButton>
    <RPopup :active.sync="active" title="Popup Title">
      <p>Some Content On Popup 1</p>
      <p>Some Content On Popup 2</p>
      <p>Some Content On Popup 3</p>
    </RPopup>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: false,
  }),
  methods: {
    openPopup() {
      this.active = true;
    },
  },
};
</script>

<style>
</style>