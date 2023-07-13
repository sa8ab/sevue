<template>
  <Transition @enter="enter" @afterEnter="afterEnter" @beforeLeave="beforeLeave" :name="renderTransitionName">
    <div class="r-panel-item" v-if="active">
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";

export interface Props {
  name: string;
  title?: string;
  disabled?: boolean;
}

const panel = inject("panel") as any;

const props = defineProps<Props>();

const enter = (el: Element) => {
  const { height } = el.getBoundingClientRect();
  setTimeout(() => {
    panel.setHeight(`${height}px`);
  }, 0);
};
const afterEnter = () => {
  panel.setHeight(`auto`);
};
const beforeLeave = (el: Element) => {
  // because auto to px does not translate
  const { height } = el.getBoundingClientRect();
  panel.setHeight(`${height}px`);
};

const active = computed(() => panel.activeTab.value === props.name);
const renderTransitionName = computed(() => panel.direction.value);
</script>

<style lang="scss">
.forward {
  &-enter-from {
    left: 100%;
  }

  &-enter-to {
    left: 0;
  }

  &-leave-from {
    left: 0;
  }

  &-leave-to {
    left: -100%;
  }

  &-enter-active,
  &-leave-active {
    position: absolute;
    width: 100%;
    transition: all var(--r-duration);
  }
}

.backward {
  &-enter-from {
    left: -100%;
  }

  &-enter-to {
    left: 0;
  }

  &-leave-from {
    left: 0;
  }

  &-leave-to {
    left: 100%;
  }

  &-enter-active,
  &-leave-active {
    position: absolute;
    width: 100%;
    transition: all var(--r-duration);
  }
}
</style>
