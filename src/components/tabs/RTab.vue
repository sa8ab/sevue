<script setup lang="ts">
import useColor from "@/composables/useColor";
import { onMounted, toRef, computed } from "vue";
import type { RTabItemType } from "@/types";
import { TabsRoot, TabsIndicator, type TabsRootProps, type TabsRootEmits } from "./";
import { useEmitsAsProps } from "@/composables/useEmitsAsProps";

export interface RTabsProps extends TabsRootProps {
  items?: RTabItemType[];
  fit?: boolean;
  scrollable?: boolean;
  moverFull?: boolean;
  color?: string;
  activeTextColor?: string;
  showBorder?: boolean;
  type?: "line" | "segment";
}

export type RTabEmits = TabsRootEmits;

const props = withDefaults(defineProps<RTabsProps>(), {
  showBorder: true,
  type: "line",
  color: "prm",
});

const emit = defineEmits<RTabEmits>();

const { color, foreground } = useColor(toRef(props, "color"), toRef(props, "activeTextColor"));

const emitsAsProps = useEmitsAsProps(emit);

const rootProps = computed(() => {
  const { items, fit, scrollable, moverFull, color, activeTextColor, showBorder, type, ...rest } = props;
  return rest;
});

// onMounted(async () => {
//   maybeSetInitialValue();
// });

// const maybeSetInitialValue = () => {
//   // if already has modelValue
//   if (model.value) return;

//   // if has requested initalValue
//   if (props.initialValue !== undefined) {
//     model.value = props.initialValue;
//     return;
//   }

//   // pick first item
//   const firstActiveIndex = props.items?.findIndex(({ disabled }) => !disabled);

//   if (firstActiveIndex == -1 || firstActiveIndex === undefined) return;

//   model.value = props.items?.[firstActiveIndex].value;
// };
</script>

<template>
  <TabsRoot
    :class="[
      'r-tab',
      `r-tab-type-${type}`,
      { 'r-tab-fit': fit, 'r-tab-mover-full': moverFull, scrollable, 'r-tab-show-border': showBorder },
    ]"
    :style="{ '--r-color': color, '--r-foreground': foreground }"
    v-bind="{ ...emitsAsProps, ...rootProps }"
  >
    <div class="r-tabbar-container">
      <div class="r-tabbar">
        <RTabItem v-for="item in items" :value="item.value" :disabled="item.disabled">
          <slot :name="item.value">
            {{ item.label }}
          </slot>
        </RTabItem>
        <TabsIndicator class="r-tab-mover"></TabsIndicator>
      </div>
    </div>
  </TabsRoot>
</template>

<style lang="scss">
.r-tab {
  min-width: 100%;
  --radius: var(--r-radius);
  .r-tabbar {
    display: flex;
    position: relative;
  }
  .r-tabbar-container {
    display: flex;
    justify-content: flex-start;
  }

  &-show-border {
    .r-tabbar-container {
      border-bottom: 1px solid color(border-color, var(--r-border-alpha));
    }
  }

  &-mover {
    position: absolute;
    bottom: 0;
    height: 2px;
    width: var(--sevue-tab-indicator-size);
    left: var(--sevue-tab-indicator-indent);
    border-radius: var(--radius);
    background: color(color);
    transition: all var(--r-duration);
  }

  &-fit {
    .r-tabbar {
      flex: 1;
    }
    .r-tab-item {
      flex: 1;
    }
  }

  &.scrollable {
    .r-tabbar {
      white-space: nowrap;
    }
    .r-tabbar-container {
      overflow-x: auto;
      @extend .scroll-bar;
    }
  }

  &-mover-full {
    .r-tab-mover {
      height: 100%;
      z-index: 0;
      border-radius: var(--radius);
      box-shadow: 0 0 6px -2px color();
    }

    .r-tab-item {
      position: relative !important;
      z-index: 2;

      &[data-selected] {
        color: color(foreground);
        &:hover {
          color: color(foreground);
        }
      }
    }
  }
}
</style>
