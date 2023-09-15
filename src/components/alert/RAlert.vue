<template>
  <div
    :class="['r-alert']"
    :style="{
      '--r-color': color || 'var(--r-prm)',
    }"
    v-if="state.active"
  >
    <slot name="before" />
    <div class="r-alert-main">
      <div class="r-alert-title">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="r-alert-text">
        <slot name="text">
          {{ text }}
        </slot>
      </div>
    </div>
    <div class="r-alert-close" v-if="!noClose">
      <slot name="close" :close="close">
        <RButton iconOnly textStyle compact round @click="close">
          <SevueIcon name="close" width="18px" height="18px" />
        </RButton>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useColor, RButton } from "@/main";
import { toRef } from "vue";
import SevueIcon from "../icons/SevueIcon.vue";
import { reactive } from "vue";

export interface Props {
  title?: string | number | null;
  text?: string | number | null;
  noClose?: boolean;
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const color = useColor(toRef(props, "color"));

const state = reactive({
  active: true,
});

const close = () => {
  state.active = false;
  emit("close");
};
</script>

<style lang="scss">
.r-alert {
  display: flex;
  align-items: center;
  gap: var(--r-space-1);
  padding: var(--r-normal-padding-y);
  border-radius: var(--r-radius);
  background: color(color, var(--r-light-alpha));
  color: color();
  position: relative;
  &-title {
    font-weight: 500;
  }
  &-close {
    align-self: flex-start;
  }
}
</style>
