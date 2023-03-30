import type RButton from "./components/button/RButton.vue";

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RButton: typeof RButton,
  }
}

export { }