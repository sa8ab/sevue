<script lang="ts">
export const [injectRovingContext, provideRovingContext] = useContext<RovingFocusContext>("RovingFocusRoot");
</script>

<script setup lang="ts">
import { type PrimitiveProps, Primitive } from "@/components/primitive";
import { useCollection } from "@/composables/useCollection";
import { useContext } from "@/composables/useContext";
import { useDirection } from "@/composables/useDirection";
import { useForwardRef } from "@/composables/useForwardRef";
import type { Orientation, Dir } from "@/types";
import { toRef, toRefs, type Ref } from "vue";

export interface RovingFocusRootProps extends PrimitiveProps {
  orientation?: Orientation;
  dir?: Dir;
}

export interface RovingFocusContext {
  dir: Ref<Dir>;
  orientation: Ref<Orientation | undefined>;
}

const props = withDefaults(defineProps<RovingFocusRootProps>(), {});

const { createCollection } = useCollection("rovingFocus");

const { forwardRef, currentElement } = useForwardRef();
createCollection(currentElement);

const { dir: propDir } = toRefs(props);

const dir = useDirection(propDir);

provideRovingContext({
  dir,
  orientation: toRef(props, "orientation"),
});
</script>

<template>
  <Primitive :as="as" :asChild="asChild" :ref="forwardRef">
    <slot />
  </Primitive>
</template>
