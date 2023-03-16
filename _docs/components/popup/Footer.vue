<template>
  <div class="container">
    <RButton @click="openPopup">Open Popup</RButton>
    <RPopup :active.sync="active" title="Popup Title">
      <p>Some Content On Popup 1</p>
      <p>Some Content On Popup 2</p>
      <p>Some Content On Popup 3</p>
      <template #footer>
        <RButton @click="save" fill>Save</RButton>
        <RButton @click="active = false" noColor>Cancel</RButton>
      </template>
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
    save() {
      this.$r.notification({
        title: "Save Clicked",
        text: "But nothing saved :D",
        color: "green",
      });
      this.active = false;
    },
  },
};
</script>

<style>
</style>