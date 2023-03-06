<template>
  <transition :name="`move`" @beforeEnter="beforeEnter" @enter="enter" @leave="leave" @afterLeave="afterLeave">
    <div v-if="state.active" class="r-notification" :style="{
      '--r-prm': getColor(color),
      '--r-text': getColor(textColor),
    }">
      <div class="notification-inner">
        <div class="title" v-if="title">{{ title }}</div>
        <p class="text">{{ text }}</p>
        <RButton @click="state.active = false" class="close" iconOnly round flat>
          <template #icon>
            <!-- <CloseIcon :color="textColor" /> -->
          </template>
        </RButton>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { getColor } from '@/utils';
import { nextTick, onMounted, reactive } from 'vue';

const props = defineProps({
  title: { default: "", type: String },
  text: { default: "", type: String },
  color: { default: "", type: String },
  textColor: { default: "#fff", type: String },
  duration: { default: 4000, type: Number },
});
const state = reactive<{ parentDiv: HTMLElement | null; active: Boolean }>({
  active: false,
  parentDiv: null,
});
onMounted(() => {
  nextTick(() => {
    state.active = true;
    setTimeout(() => {
      state.active = false;
    }, props.duration);
  });
});
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
</script>

<style lang="scss">
.r-notification {
  color: color(text);
  width: 100%;
  border-radius: $radius2;
  transition: transform $duration, height $duration;
  overflow: hidden;

  .notification-inner {
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
    background: color(prm);
    padding: $p4;
    border-radius: $radius2;
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
