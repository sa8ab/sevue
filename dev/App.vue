<template>
  <div id="app" :class="{ dark: false }">
    <div class="items">
      <RButton flat to="/">Home</RButton>
      <RButton flat to="/second">Second</RButton>
      <RButton flat to="/third">Third</RButton>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped lang="scss">
#app {
  padding: 10px;
  background: color("b1");
  color: color("text");
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.items {
  display: flex;
  padding-bottom: 10px;
  gap: 4px;
}
</style>
