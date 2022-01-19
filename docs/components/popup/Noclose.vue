<template>
  <div class="container">
    <RButton @click="openPopup">Open Popup</RButton>
    <RPopup :active.sync="active" title="Popup Title" noClose>
      This Popup does not close if you click outside of it Because it has
      `noColor` prop set as `true`.
      <template #footer>
        <RButton @click="active = false" fill>Done</RButton>
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
  },
};
</script>

<style>
</style>