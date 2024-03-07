<template>
  <div :class="['demo', { active }]">
    <div class="view">
      <slot name="demo"></slot>
    </div>
    <div class="actions">
      <RButton icon="bx-code" iconOnly round @click="active = !active"></RButton>
    </div>
    <div class="code-container" v-if="active" ref="code">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
// import gsap from "gsap";
const active = ref(false);
// watch: {
//   active(active) {
//     if (active) {
//       gsap.to(this.$refs.code, { duration: 0.4, height: "auto" });
//     } else {
//       gsap.to(this.$refs.code, { duration: 0.4, height: 0 });
//     }
// },
</script>

<style scoped lang="scss">
.demo {
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  transition: box-shadow 0.3s;
  box-shadow: 0 0 0 1px rgba(var(--r-border-color), var(--r-border-alpha));
  &.active {
    box-shadow: 0 0 4px rgba(var(--r-border-color), var(--r-border-active-alpha));
  }
}
.view {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}
.actions {
  display: flex;
  justify-content: center;
  padding-bottom: 8px;
}
</style>
