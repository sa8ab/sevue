<template>
  <div class="second-page">
    <div class="checkboxes">
      <RCheckbox v-model="x" :val="'some name'">Default</RCheckbox>
      <RCheckbox v-model="x" :val="'some name 2'" color="yellow">
        Yellow checkbox
      </RCheckbox>
      <RCheckbox v-model="x" :val="'some name 3'" color="red">
        Red checkbox
      </RCheckbox>
      <RCheckbox v-model="c" color="#C4E538"> Custom Color </RCheckbox>
    </div>
    <RButton @click="active = true">Open Popup</RButton>
    <RPopup :active.sync="active" title="popup title">
      popup content
      <template #footer> something </template>
    </RPopup>
  </div>
</template>

<script>
export default {
  name: "SecondPage",
  data: () => ({
    x: [],
    c: false,
    active: false,
  }),
};
</script>

<style scoped lang="scss">
.checkboxes {
  display: flex;
  gap: 10px;
}
</style>