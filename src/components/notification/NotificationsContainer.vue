<template>
  <div :class="['r-notifications-container', ...renderPlacement]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "NotificationsContainer",
  props: {
    placement: { default: "bottom-right", type: String },
  },
  methods: {},
  computed: {
    renderPlacement() {
      const classes = [this.placement];
      if (this.placement.includes("top")) classes.push("has-top");
      if (this.placement.includes("bottom")) classes.push("has-bottom");
      if (this.placement.includes("left")) classes.push("has-left");
      if (this.placement.includes("right")) classes.push("has-right");
      if (
        !this.placement.includes("right") &&
        !this.placement.includes("left")
      ) {
        classes.push("is-center");
      }
      return classes;
    },
  },
};
</script>

<style lang="scss">
.r-notifications-container {
  z-index: 100;
  position: fixed;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  padding: $p2;
  &.has-top {
    top: 0;
  }
  &.has-bottom {
    bottom: 0;
  }
  &.has-left {
    left: 0;
  }
  &.has-right {
    right: 0;
  }
  &.is-center {
    left: 50%;
    transform: translateX(-50%);
  }
}
@media only screen and (max-width: 600px) {
  .r-notifications-container {
    max-width: 100%;
    width: 100%;
    .r-notification,
    .inner {
      border-radius: $radius2 !important;
    }
  }
}
</style>