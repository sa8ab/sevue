<template>
  <div :class="['demo', { active }]">
    <div class="view">
      <div>
        <slot name="demo"></slot>
      </div>
    </div>
    <div class="actions">
      <RButton
        icon="bx-code"
        iconOnly
        round
        @click="active = !active"
      ></RButton>
    </div>
    <div class="code-container" ref="code">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
export default {
  name: "Demo",
  data: () => ({
    active: false,
  }),
  watch: {
    active(active) {
      if (active) {
        gsap.to(this.$refs.code, { duration: 0.4, height: "auto" });
      } else {
        gsap.to(this.$refs.code, { duration: 0.4, height: 0 });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.demo {
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  transition: box-shadow 0.3s;
  border: 1px solid rgba(0, 0, 0, 0.1);
  &.active {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
.code-container {
  overflow: hidden;
  height: 0;
}
</style>