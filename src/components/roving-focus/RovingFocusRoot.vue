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
import { toRef, toRefs, nextTick, type Ref } from "vue";
import { focusFirst, getFocusDirection } from "./utils";

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
const collection = createCollection(currentElement);

const { dir: propDir } = toRefs(props);

const dir = useDirection(propDir);

const handleKeydown = (e: KeyboardEvent) => {
  if (e.defaultPrevented) return;
  if (e.target !== e.currentTarget) return;

  const direction = getFocusDirection(e, props.orientation, props.dir);

  if (!direction) return;

  e.preventDefault();

  const children = [...collection.value];
  if (direction === "backward") children.reverse();

  nextTick(() => focusFirst(children));
};

provideRovingContext({
  dir,
  orientation: toRef(props, "orientation"),
});
</script>

<template>
  <Primitive :as="as" :asChild="asChild" :ref="forwardRef" @keydown="handleKeydown">
    <slot />
  </Primitive>
</template>
