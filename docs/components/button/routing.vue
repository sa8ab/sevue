<template>
  <div class="flex items-center gap-2">
    <RButton to="/">Local Routing</RButton>
    <RButton href="https://www.youtube.com/watch?v=zRZEWi-X2aw">
      External Link
    </RButton>
    <RButton
      href="https://www.youtube.com"
      target="_blank"
      icon="bxs-right-top-arrow-circle"
      iconAfter
      fill
    >
      In New Tab
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