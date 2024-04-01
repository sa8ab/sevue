<script lang="ts">
export const [injectPopupRoot, providePopupRoot] = useContext<PopupRootContext>("PopupRoot");
</script>

<script setup lang="ts">
import { useContext } from "@/composables/useContext";
import { toRef, type Ref } from "vue";

export interface PopupRootProps {
  active?: boolean;
  preventClose?: boolean;
  beforeClose?: (arg0: () => void) => any;
}

export type PopupRootEmits = {
  "update:active": [boolean];
  close: [];
};

export interface PopupRootContext {
  active: Ref<boolean | undefined>;
}

const props = withDefaults(defineProps<PopupRootProps>(), {
  active: false,
});

providePopupRoot({
  active: toRef(props, "active"),
});
</script>

<template>
  <slot />
</template>
