<template>
  <div :class="['demo', { active }]">
    <div class="view">
      <slot name="demo"></slot>
    </div>
    <div class="actions">
      <RButton iconOnly round variant="bordered" @click="active = !active"
        ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
            <path d="m17 7.83l1.697 1.526c1.542 1.389 2.313 2.083 2.313 2.974c0 .89-.771 1.585-2.314 2.973L17 16.83" />
            <path d="m13.987 5l-3.974 14.83" opacity=".5" />
            <path d="M7 7.83L5.304 9.356C3.76 10.745 2.99 11.44 2.99 12.33c0 .89.771 1.585 2.314 2.973L7 16.83" />
          </g>
        </svg>
      </RButton>
    </div>
    <div class="code-container" v-if="active" ref="code">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
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

<style lang="scss">
.demo {
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  transition: box-shadow 0.3s;
  box-shadow: 0 0 0 1px rgba(var(--r-border-color), var(--r-border-alpha));
  &.active {
    box-shadow: 0 0 0 2px rgba(var(--r-border-color), var(--r-border-alpha));
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
}
</style>
