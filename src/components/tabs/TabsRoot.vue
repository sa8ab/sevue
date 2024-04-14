<script lang="ts">
export const [injectTabsRootContext, provideTabsRootContext] = useContext<TabsRootContext>("TabsRoot");
</script>

<script setup lang="ts">
import { type PrimitiveProps, Primitive } from "@/components/primitive";
import { RovingFocusRoot } from "@/components/roving-focus";
import { useContext } from "@/composables/useContext";
import { useForwardRef } from "@/composables/useForwardRef";

import type { Orientation, Dir } from "@/types";
import { type Ref, toRefs } from "vue";

export interface TabsRootProps extends PrimitiveProps {
  modelValue?: string | number;
  // initialValue?: number | string;
  orientation?: Orientation;
  dir?: Dir;
}

export type TabsRootEmits = {
  change: [];
  "update:modelValue": [string | number | undefined];
};

export interface TabsRootContext {
  modelValue: Ref<string | number | undefined>;
  setModelValue: (v: string | number | undefined) => void;
  orientation: Ref<Orientation | undefined>;
  dir: Ref<Dir | undefined>;
  tabbar: Ref<HTMLElement | undefined>;
}

const props = withDefaults(defineProps<TabsRootProps>(), {
  orientation: "horizontal",
});

const emit = defineEmits<TabsRootEmits>();

const model = defineModel<string | number>();

const { forwardRef, currentElement } = useForwardRef();

const { dir, orientation } = toRefs(props);

provideTabsRootContext({
  dir,
  orientation,
  modelValue: model,
  setModelValue: (v) => (model.value = v),
  tabbar: currentElement,
});
</script>

<template>
  <RovingFocusRoot asChild :orientation="orientation" :dir="dir">
    <Primitive :asChild="asChild" :as="as" :ref="forwardRef" role="tablist" :aria-orientation="orientation">
      <slot />
    </Primitive>
  </RovingFocusRoot>
</template>
