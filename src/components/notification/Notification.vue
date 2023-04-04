<template>
  <transition :name="`move`" @beforeEnter="beforeEnter" @enter="enter" @leave="leave" @afterLeave="afterLeave">
    <div
      v-if="state.active"
      @mouseenter="onPause"
      @mouseleave="onStart"
      class="r-notification" :style="{
        '--r-color': color || 'var(--r-prm)',
        '--r-text-color': textColor || 'var(--r-text)',
      }">

      <div class="notification-inner">
        <div class="title" v-if="title">{{ title }}</div>
        <div class="text">{{ text }}</div>
        <RButton @click="close" class="close" iconOnly round fill v-if="!noCloseButton">
          <SevueIcon name="close" />
        </RButton>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import useColor from '@/composables/useColor';
import { useTimer } from '@/main';
import { nextTick, onMounted, reactive, toRef } from 'vue';
import SevueIcon from '../icons/SevueIcon.vue';
export interface Props {
  title?: string,
  text?: string,
  color?: string,
  textColor?: string,
  duration?: number
  pauseOnHover?: boolean
  noCloseButton?: boolean
  onClose?: () => void
}
const props = withDefaults(
  defineProps<Props>(),
  {
    textColor: '#fff',
    duration: 4000
  }
)
const color = useColor(toRef(props, 'color'))
const textColor = useColor(toRef(props, 'textColor'))

const timer = useTimer(() => close(), props.duration)

const state = reactive<{ parentDiv: HTMLElement | null; active: Boolean, timeout?: NodeJS.Timeout }>({
  active: false,
  parentDiv: null,
  timeout: undefined
});

onMounted(() => {
  state.active = true;
  if (props.duration > 0) {
    timer.start()
  }
});

const onPause = () => {
  if (props.pauseOnHover && props.duration > 0) timer.pause()
}
const onStart = () => {
  if (props.pauseOnHover && props.duration > 0) timer.start()
}

const close = () => {
  if (state.active) {
    state.active = false
    timer.destroy()
    props.onClose?.()
  }
}
const beforeEnter = (el: HTMLElement) => {
  el.style.height = "0";
};
const enter = (el: HTMLElement) => {
  const height = el.scrollHeight;
  el.style.height = `${height}px`;
};
const leave = (el: HTMLElement) => {
  // There is a stupid flicker when it's 0px
  el.style.height = "1px";
  state.parentDiv = el.parentElement;
};
const afterLeave = (el: HTMLElement) => {
  state.parentDiv?.remove();
};

defineExpose({
  close
})
</script>

<style lang="scss">
.r-notification {
  color: color(text-color);
  width: 100%;
  border-radius: var(--r-radius);
  transition: transform $duration, height $duration;
  overflow: hidden;

  .notification-inner {
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
    background: color();
    padding: var(--r-space-3);
    border-radius: var(--r-radius);
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    position: relative;

    .title {
      font-weight: bold;
      padding-bottom: $p2;
    }

    .text {
      font-size: $fsmall;
    }

    .close {
      position: absolute;
      top: 0;
      right: 0;
      width: 24px;
      height: 24px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  &:hover {
    transform: translateY(4px);
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
      transition: transform $duration;
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
