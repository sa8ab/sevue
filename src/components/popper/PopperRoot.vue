<script lang="ts">
import { useContext } from "@/composables/useContext";

export const [injectPopperRootContext, providePopperRootContext] = useContext<PopperRootContext>("PopperRoot");
</script>

<script setup lang="ts">
import { ref, type Ref } from "vue";

export interface Measurable {
  getBoundingClientRect(): DOMRect;
}

export interface PopperRootContext {
  reference: Ref<Measurable | HTMLElement | undefined>;
  setReference: (element: Measurable | HTMLElement | undefined) => void;
}

const reference = ref<Measurable | HTMLElement>();

providePopperRootContext({
  reference,
  setReference: (el) => (reference.value = el),
});
</script>

<template>
  <slot />
</template>
