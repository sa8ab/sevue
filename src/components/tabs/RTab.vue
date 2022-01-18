<template>
  <div
    :class="['r-tab', { fit, bordered, iconOnly, scrollable, moverFull }]"
    :style="{ '--rgb-prm': $r.getColor(color) }"
  >
    <!-- tabbar -->
    <div class="tabbar" ref="tabbar">
      <div
        v-for="({ title, icon }, i) in tabs"
        :key="i"
        :class="['tab-button r', { active: activeTab === title }]"
        :icon="icon"
        ref="tabBarItems"
        @click="setActiveTab(title)"
        v-ripple
      >
        <slot :name="`icon-${i}`">
          <i :class="['bx', icon]" v-if="icon"></i>
        </slot>
        <span class="title" v-if="!iconOnly">
          {{ title }}
        </span>
      </div>
      <div class="mover" :style="{ width: moverWidth, left: moverLeft }"></div>
    </div>
    <!-- tabs -->
    <div class="tabs-container" :style="{ height }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "RTab",
  provide() {
    return {
      tab: this,
    };
  },
  props: {
    fit: { default: false, type: Boolean },
    bordered: { default: false, type: Boolean },
    iconOnly: { default: false, type: Boolean },
    scrollable: { default: false, type: Boolean },
    moverFull: { default: false, type: Boolean },
    color: { default: "", type: String },
  },
  data: () => ({
    activeTab: "",
    height: "auto",
    direction: "forward",
    moverWidth: "0",
    moverLeft: "0",
    children: [],
    dafSlot: [],
    isInit: true,
  }),
  mounted() {
    this.setChildren();
    this.defSlot = this.getSlot();
    this.$nextTick(() => {
      this.setActiveTab(this.tabs[0].title);
    });
  },
  methods: {
    setActiveTab(tab) {
      const oldTabIndex = this.tabs.findIndex(
        ({ title }) => this.activeTab === title
      );
      const newTabIndex = this.tabs.findIndex(({ title }) => tab === title);

      if (oldTabIndex < newTabIndex) this.direction = "forward";
      else this.direction = "backward";
      setTimeout(
        () => {
          this.setMoverStyle({ index: newTabIndex });
          this.isInit = false;
        },
        this.isInit ? 200 : 0
      );
      this.$nextTick(() => {
        this.activeTab = tab;
        this.$emit("tabChange", { title: tab, index: newTabIndex });
      });
    },
    setMoverStyle({ index }) {
      const { width } = this.$refs.tabBarItems[index].getBoundingClientRect();
      const newTabBarItemOffset = this.$refs.tabBarItems[index].offsetLeft;
      this.moverWidth = `${width}px`;
      this.moverLeft = `${newTabBarItemOffset}px`;

      if (this.scrollable) {
        //   TODO: fix for rtl version
        this.$refs.tabbar.scrollTo({
          left: newTabBarItemOffset - 80,
          behavior: "smooth",
        });
      }
    },
    setChildren() {
      this.children = this.getSlot().filter((item) => item.tag);
      console.log(this.children);
    },
    setHeight(height) {
      this.height = height;
    },
    getSlot() {
      return this.$slots.default || [];
    },
  },
  computed: {
    tabs() {
      return this.children.map(
        ({ componentOptions }) => componentOptions.propsData
      );
    },
  },
  watch: {
    activeTab(newTab) {},
  },
  beforeUpdate() {
    if (this.getSlot() !== this.defSlot) {
      console.log("updated because of slots");
      this.setChildren();
      this.defSlot = this.getSlot();
    }
  },
};
</script>

<style lang="scss">
$duration: $duration * 1.5;
.r-tab {
  .tabbar {
    display: flex;
    position: relative;
    overflow: hidden;
  }
  .tab-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $p;
    padding: $bp;
    border-radius: 0;
    .title {
      font-size: $fsmall;
    }
    &.active {
      color: color("prm");
      background: color("prm", $lightA);
    }
  }
  .mover {
    position: absolute;
    bottom: 0;
    height: 2px;
    border-radius: 2px;
    background: color("prm");
    transition: width $duration, left $duration;
  }
  .tabs-container {
    border-radius: $radius;
    overflow: hidden;
    position: relative;
    transition: all $duration;
  }
  &.fit {
    .tab-button {
      flex: 1;
    }
  }
  &.bordered {
    overflow: hidden;
    border-radius: $radius;
    border: $border;
    .tabbar {
      border-bottom: $border;
    }
  }
  &.iconOnly {
    .tab-button {
      width: 40px;
      height: 40px;
    }
  }
  &.scrollable {
    .tabbar {
      overflow-x: auto;
      white-space: nowrap;
      @extend .scroll-bar;
    }
  }
  &.moverFull {
    .mover {
      height: 100%;
      z-index: 0;
    }
    .tab-button {
      position: relative !important;
      z-index: 2;
      &.active {
        transition-delay: $duration / 2;
        color: white;
        background: transparent;
      }
    }
  }
}
.r-tab-item {
  padding: $p2;
}
.forward {
  &-enter {
    left: 100%;
  }
  &-enter-to {
    left: 0;
  }
  &-leave {
    left: 0;
  }
  &-leave-to {
    left: -100%;
  }
  &-enter-active,
  &-leave-active {
    position: absolute;
    transition: all $duration;
  }
}
.backward {
  &-enter {
    left: -100%;
  }
  &-enter-to {
    left: 0;
  }
  &-leave {
    left: 0;
  }
  &-leave-to {
    left: 100%;
  }
  &-enter-active,
  &-leave-active {
    position: absolute;
    transition: all $duration;
  }
}
</style>