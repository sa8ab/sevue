<template>
  <div id="app" :class="{ dark: false }">
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
  padding: $p8;
  background: #f8f8f8;
  background: color("b1");
  color: color("text");
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
