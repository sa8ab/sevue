<template>
  <transition
    :name="`move`"
    @beforeEnter="beforeEnter"
    @enter="enter"
    @afterEnter="afterEnter"
    @leave="leave"
    @afterLeave="afterLeave"
  >
    <div
      v-if="state.active"
      @mouseenter="onPause"
      @mouseleave="onStart"
      :class="['r-notification', containerClass]"
      :style="{
        '--r-color': color || 'var(--r-prm)',
        '--r-text-color': textColor || 'var(--r-text)',
        '--notification-width': width || '360px',
      }"
    >
      <div :class="['notification-inner', { noPadding }]">
        <div class="notification-inner-before" v-if="before">
          <VNodeRenderer :param="before" />
        </div>
        <div class="notification-inner-main">
          <VNodeRenderer class="title" :param="title" v-if="title" />
          <VNodeRenderer class="text" :param="text" v-if="text" />
          <RButton @click="close" class="close" iconOnly round v-if="!noCloseButton" textStyle>
            <template #icon>
              <SevueIcon name="close" />
            </template>
          </RButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import useColor from "@/composables/useColor";
import { useTimer } from "@/main";
import { onMounted, reactive, toRef, type VNode } from "vue";
import SevueIcon from "../icons/SevueIcon.vue";
import VNodeRenderer from "../VNodeRenderer.vue";
export interface Props {
  title?: String | VNode;
  text?: String | VNode;
  color?: string;
  textColor?: string;
  duration?: number;
  pauseOnHover?: boolean;
  noCloseButton?: boolean;
  noPadding?: boolean;
  width?: string;
  before?: string | VNode;
  containerClass?: string;
  onClose?: () => void;
}
const props = withDefaults(defineProps<Props>(), {
  textColor: "#fff",
  duration: 4000,
});
const color = useColor(toRef(props, "color"));
const textColor = useColor(toRef(props, "textColor"));

const timer = useTimer(() => close(), props.duration);

const state = reactive<{ parentDiv: HTMLElement | null; active: Boolean; timeout?: NodeJS.Timeout }>({
  active: false,
  parentDiv: null,
  timeout: undefined,
});

onMounted(() => {
  state.active = true;
  if (props.duration > 0) {
    timer.start();
  }
});

const onPause = () => {
  if (props.pauseOnHover && props.duration > 0) timer.pause();
};
const onStart = () => {
  if (props.pauseOnHover && props.duration > 0) timer.start();
};

const close = () => {
  if (state.active) {
    state.active = false;
    timer.destroy();
    props.onClose?.();
  }
};
const beforeEnter = (el: Element) => {
  (el as HTMLElement).style.height = "0";
};
const enter = (el: Element) => {
  const height = el.scrollHeight;
  (el as HTMLElement).style.height = `${height}px`;
};
const afterEnter = (el: Element) => {
  (el as HTMLElement).style.height = `auto`;
};
const leave = (el: Element) => {
  const height = getComputedStyle(el).height;
  (el as HTMLElement).style.height = height;
  getComputedStyle(el).height;
  (el as HTMLElement).style.height = "0px";
  state.parentDiv = el.parentElement;
};
const afterLeave = (el: Element) => {
  state.parentDiv?.remove();
};

defineExpose({
  close,
});
</script>

<style lang="scss">
.r-notification {
  color: color(text-color);
  width: var(--notification-width);
  border-radius: var(--r-radius);
  transition: transform var(--r-duration), height var(--r-duration);
  // overflow: hidden;

  .notification-inner {
    box-shadow: 0 4px 24px -8px color(shadow-color, var(--r-shadow-alpha));
    background: color();
    padding: var(--r-space-3);
    border-radius: var(--r-radius);
    gap: var(--r-space-2);
    display: flex;
    align-items: center;
    position: relative;

    &-main {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .title {
      font-weight: bold;
      padding-bottom: var(--r-space-2);
    }

    .text {
      font-size: var(--r-font-small);
    }

    .close {
      position: absolute;
      top: 2px;
      right: 2px;
      padding: 2px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    &.noPadding {
      padding: 0;
    }
  }

  &:hover {
    transform: translateY(4px);
  }
}
@media only screen and (max-width: 600px) {
  .r-notification {
    width: 100%;
  }
}

.has-bottom {
  .notification-inner {
    margin-bottom: 6px;
  }
}

.has-top {
  .notification-inner {
    margin-top: 6px;
  }
}

// .bottom-right {
//   .r-notification {
//     border-bottom-right-radius: 0;
//     .notification-inner {
//       border-bottom-right-radius: 0;
//     }
//   }
// }
// .bottom-left {
//   .r-notification {
//     border-bottom-left-radius: 0;
//     .notification-inner {
//       border-bottom-left-radius: 0;
//     }
//   }
// }
// .top-right {
//   .r-notification {
//     border-top-right-radius: 0;
//     .notification-inner {
//       border-top-right-radius: 0;
//     }
//   }
// }
// .top-left {
//   .r-notification {
//     border-top-left-radius: 0;
//     .notification-inner {
//       border-top-left-radius: 0;
//     }
//   }
// }
.move {
  &-enter-to,
  &-leave-from {
    .notification-inner {
      transform: translateX(0);
    }
  }

  &-enter-active,
  &-leave-active {
    overflow: hidden;

    .notification-inner {
      transition: transform var(--r-duration);
    }
  }
}

.has-left .move {
  &-enter-from,
  &-leave-to {
    .notification-inner {
      transform: translateX(-100%);
    }
  }
}

.has-right .move {
  &-enter-from,
  &-leave-to {
    .notification-inner {
      transform: translateX(100%);
    }
  }
}
</style>
