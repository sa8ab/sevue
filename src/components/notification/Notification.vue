<template>
  <transition
    :name="`move`"
    @beforeEnter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div
      v-if="active"
      :class="['r-notification']"
      :style="{ '--rgb-prm': $r.getColor(color) }"
    >
      <div class="notification-inner">
        <div class="title">{{ title }}</div>
        <p class="text">{{ text }}</p>
        <RButton
          @click="active = false"
          icon="bx-x"
          class="close"
          color="#ffffff"
          iconOnly
          round
          flat
        ></RButton>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Notification",
  props: {
    title: { default: "", type: String },
    text: { default: "", type: String },
    color: { default: "", type: String },
  },
  data: () => ({
    // title: "",
    active: false,
  }),
  mounted() {
    this.active = true;
    setTimeout(() => {
      this.active = false;
    }, 4000);
  },
  methods: {
    beforeEnter(el) {
      el.style.height = 0;
      el.style.paddingBottom = "6px";
    },
    enter(el) {
      const height = el.scrollHeight;
      el.style.height = `${height}px`;
    },
    leave(el) {
      el.style.paddingBottom = "0px";
      el.style.height = "0px";
    },
  },
};
</script>

<style lang="scss">
.r-notification {
  color: white;
  width: 100%;
  border-radius: $radius2;
  transition: transform $duration, height $duration;
  overflow: hidden;
  .notification-inner {
    background: color();
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
.bottom-right {
  .r-notification {
    border-bottom-right-radius: 0;
    .notification-inner {
      border-bottom-right-radius: 0;
    }
  }
}
.bottom-left {
  .r-notification {
    border-bottom-left-radius: 0;
    .notification-inner {
      border-bottom-left-radius: 0;
    }
  }
}
.top-right {
  .r-notification {
    border-top-right-radius: 0;
    .notification-inner {
      border-top-right-radius: 0;
    }
  }
}
.top-left {
  .r-notification {
    border-top-left-radius: 0;
    .notification-inner {
      border-top-left-radius: 0;
    }
  }
}
.move {
  &-enter-to,
  &-leave {
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
  &-enter,
  &-leave-to {
    .notification-inner {
      transform: translateX(-100%);
    }
  }
}
.has-right .move {
  &-enter,
  &-leave-to {
    .notification-inner {
      transform: translateX(100%);
    }
  }
}
</style>