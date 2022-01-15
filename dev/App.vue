<template>
  <div id="app" class="dark">
    <RButton @click="onClick">Test Component</RButton>
    <div class="" style="height: 40px"></div>
    <RSelect v-model="select" placeholder="Select An Option">
      <ROption :value="2" text="test 1" />
      <ROption :value="3" text="test 2" />
    </RSelect>
    <div class="" style="height: 40px"></div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    select: 0,
  }),
  methods: {
    onClick() {
      console.log("clicked");
    },
  },
};
</script>

<style scoped lang="scss">
#app {
  padding: $p8;
  background: #323232;
  color: white;
  min-height: 100vh;
}
</style>
