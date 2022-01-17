<template>
  <div id="app" :class="{ dark: true }">
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
  background: $b1;
  color: $c1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
