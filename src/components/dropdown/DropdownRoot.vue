<script lang="ts">
export const [injectDropdownRoot, provideDropdownRoot] = useContext<DropdownRootContext>("DropdownRoot");
</script>

<script setup lang="ts">
import type { PrimitiveProps } from "@/components/primitive";
import { useContext } from "@/composables/useContext";
import { type Ref, ref } from "vue";

export interface DropdownRootProps extends PrimitiveProps {
  active?: boolean;
}

export type DropdownRootEmits = {
  "update:active": [boolean];
};

export interface DropdownRootContext {
  active: Ref<boolean>;
  open: () => void;
  close: () => void;
  triggerId: Ref<string>;
  contentId: Ref<string>;
  reference: Ref<HTMLElement | undefined>;
  setReference: (element: HTMLElement | undefined) => void;
}

const props = withDefaults(defineProps<DropdownRootProps>(), {});

const emit = defineEmits<DropdownRootEmits>();

const activeModel = defineModel<boolean>("active", {
  default: () => false,
  required: false,
});

const reference = ref<HTMLElement | undefined>();
const triggerId = ref("");
const contentId = ref("");

const open = () => {
  activeModel.value = true;
};
const close = () => {
  activeModel.value = false;
};

provideDropdownRoot({
  active: activeModel,
  close,
  open,
  // used for popper positioning and click outside handling
  reference,
  setReference: (el) => (reference.value = el),
  triggerId,
  contentId,
});
</script>

<template>
  <slot :active="activeModel" />
</template>
