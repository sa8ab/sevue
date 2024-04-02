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
  tryClose: () => void;
}

const props = withDefaults(defineProps<PopupRootProps>(), {
  active: false,
});

const emit = defineEmits<PopupRootEmits>();

const close = () => {
  emit("update:active", false);
  emit("close");
};
const tryClose = () => {
  if (props.beforeClose) {
    props.beforeClose(close);
    return;
  }
  if (props.preventClose) return;
  close();
};

providePopupRoot({
  active: toRef(props, "active"),
  tryClose,
});
</script>

<template>
  <slot />
</template>
