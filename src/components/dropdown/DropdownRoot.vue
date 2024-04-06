<script lang="ts">
export const [injectDropdownRoot, provideDropdownRoot] = useContext<DropdownRootContext>("DropdownRoot");
</script>

<script setup lang="ts">
import { type PrimitiveProps } from "@/components/primitive";
import { useContext } from "@/composables/useContext";
import { type Ref } from "vue";

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
}

const props = withDefaults(defineProps<DropdownRootProps>(), {});

const emit = defineEmits<DropdownRootEmits>();

const activeModel = defineModel<boolean>("active", {
  default: () => false,
  required: false,
});

const open = () => {
  activeModel.value = true;
};
const close = () => {
  activeModel.value = false;
};
</script>

<template>
  <slot />
</template>
