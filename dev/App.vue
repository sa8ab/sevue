<template>
  <div id="app">
    <RButton @click="onClick">Test Component</RButton>
    <div class="" style="height: 40px"></div>
    <RSelect v-model="select" placeholder="Select An Option" color="red">
      <ROption :value="2" text="test 1" />
      <ROption :value="3" text="test 2" />
    </RSelect>
    <div class="" style="height: 40px" @click="moveTabs"></div>
    <RTab bordered moverFull ref="tabs" color="yellow">
      <RTabItem title="Tab One" icon="bx-user">item1</RTabItem>
      <RTabItem title="Tab 3" icon="bx-user">item3</RTabItem>
      <RTabItem title="Tab 4" icon="bx-user">item4</RTabItem>
      <RTabItem title="Tab Two Longer" icon="bx-heart">
        <div v-for="z in x" :key="z">item2</div>
      </RTabItem>
    </RTab>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    select: 0,
    x: 4,
  }),
  methods: {
    onClick() {
      console.log("clicked");
    },
    moveTabs() {
      this.$refs.tabs.setActiveTab("Tab 4");
    },
  },
};
</script>

<style scoped lang="scss">
#app {
  padding: $p8;
  background: #f8f8f8;
  // background: $b1;
  color: $c1;
  min-height: 100vh;
}
</style>
