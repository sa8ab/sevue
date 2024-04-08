<script setup lang="ts">
import { useEmitsAsProps } from "@/composables/useEmitsAsProps";
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  type DropdownRootProps,
  type DropdownRootEmits,
  type DropdownContentProps,
  type DropdownItemProps,
} from "./index";

export interface RDropdownProps extends DropdownRootProps, DropdownContentProps {}

export type RDropdownEmits = DropdownRootEmits;

const props = defineProps<RDropdownProps>();

const emit = defineEmits<RDropdownEmits>();

const activeModel = defineModel<boolean>("active");

const emitsAsProps = useEmitsAsProps(emit);
</script>

<template>
  <DropdownRoot v-model:active="activeModel" :closeOnClick="closeOnClick">
    <DropdownTrigger asChild>
      <slot />
    </DropdownTrigger>
    <Transition name="r-dropdown">
      <DropdownContent
        class="r-dropdown-content"
        :offset="offset"
        :rootBoundry="rootBoundry"
        :boundry="boundry"
        :placement="placement"
        v-if="activeModel"
      >
        <slot name="dropdown" />
      </DropdownContent>
    </Transition>
  </DropdownRoot>
</template>

<style lang="scss">
.r-dropdown-content {
  z-index: 100;
  background-color: color(b2);
  border-radius: var(--r-radius);
  box-shadow: 0 6px 12px color(shadow-color, var(--r-shadow-alpha)), generateBoxShadow(1px, border-color, 0.1);
  padding: 4px;
  // overflow-y: auto;
  // max-height: 200px;
  // @extend .scroll-bar;
}
</style>
