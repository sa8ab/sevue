<script setup lang="ts">
import { type PrimitiveProps, Primitive } from "@/components/primitive";
import { useCollection } from "@/composables/useCollection";
import { injectRovingContext } from "./RovingFocusRoot.vue";
import { getFocusDirection, focusFirst } from "./utils";
import { nextTick } from "vue";

export interface RovingFocusItemProps extends PrimitiveProps {}

const props = withDefaults(defineProps<PrimitiveProps>(), {});

const { injectCollection } = useCollection("rovingFocus");

const collection = injectCollection();
const rootContext = injectRovingContext();

const handleKeydown = (e: KeyboardEvent) => {
  if (e.target !== e.currentTarget) return;

  const direction = getFocusDirection(e, rootContext.orientation.value, rootContext.dir.value);

  if (!direction) return;

  e.preventDefault();

  const children = [...collection.value];
  if (direction === "backward") children.reverse();
  const currentIndex = children.indexOf(e.currentTarget as HTMLElement);
  const sorted = children.slice(currentIndex + 1);

  nextTick(() => focusFirst(sorted));
};
</script>

<template>
  <Primitive :as="as" :asChild="asChild" @keydown="handleKeydown" data-sevue-collection-item>
    <slot />
  </Primitive>
</template>
