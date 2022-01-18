<template>
  <div>
    <RButton fill>
      <template #icon> <i class="bx bxl-vuejs"></i></template>
      Icon Slot
    </RButton>
    <RButton fill iconAfter>
      <template #icon> <i class="bx bxs-hot"></i></template>
      Icon After
    </RButton>
  </div>
</template>

<script>
export default {
  name: "ButtonColor",
};
</script>

<style scoped lang="scss">
</style>