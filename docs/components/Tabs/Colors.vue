<template>
  <div class="container">
    <RTab bordered v-bind="$attrs" color="red">
      <RTabItem title="Tab 1"> Some Content </RTabItem>
      <RTabItem title="Tab 2"> Second Some Content </RTabItem>
      <RTabItem title="Tab 3"> Tab 3 Content </RTabItem>
    </RTab>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
}
</style>