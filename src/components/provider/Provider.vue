<script lang="ts">
import { useContext } from "@/composables/useContext";
import type { Dir } from "@/types";
import type { Ref } from "vue";
import { toRef } from "vue";
export const [injectProviderContext, provideProviderContext] = useContext<ProviderContext>("Provider");
</script>

<script setup lang="ts">
export interface ProviderContext {
  dir: Ref<Dir>;
  useId?: () => string;
}

export interface ProviderProps {
  dir?: Dir;
  useId?: () => string;
}

const props = withDefaults(defineProps<ProviderProps>(), {
  dir: "ltr",
});

provideProviderContext({
  dir: toRef(props, "dir"),
  useId: props.useId,
});
</script>

<template>
  <slot />
</template>
