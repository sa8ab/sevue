<template>
  <div>
    <RButton fill icon="bx-user" color="yellow" iconOnly></RButton>
    <RButton icon="bx-star" color="yellow" iconOnly></RButton>
    <RButton fill icon="bx-envelope" color="red" round iconOnly></RButton>
    <RButton icon="" color="red" round iconOnly>
      <template #icon><i class="bx bx-bell"></i></template>
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