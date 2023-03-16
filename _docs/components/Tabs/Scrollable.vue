<template>
  <div class="container">
    <RTab scrollable>
      <RTabItem :title="`Item ${x} Title`" v-for="x in 8" :key="x">
        Tab {{ x }} Content
      </RTabItem>
    </RTab>
  </div>
</template>

<script>
export default {
  props: ["bordered"],
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
}
</style>