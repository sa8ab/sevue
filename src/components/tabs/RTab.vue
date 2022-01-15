<template>
  <div class="r-tab">
    <!-- tabbar -->
    <div class="tabbar">
      <div
        v-for="({ title, icon }, i) in tabs"
        :key="i"
        :class="['tab-button r', { active: activeTab === title }]"
        :icon="icon"
        @click="setActiveTab(title)"
        v-ripple
      >
        <i :class="['bx', icon]"></i>
        <span class="title">
          {{ title }}
        </span>
      </div>
    </div>
    <!-- tabs -->
    <div class="tabs-container" :style="{ height }">
      <slot></slot>
    </div>
    <pre>{{ height }}</pre>
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
  data: () => ({
    activeTab: "",
    height: "auto",
    children: [],
    dafSlot: [],
  }),
  mounted() {
    this.setChildren();
    this.defSlot = this.getSlot();
    this.activeTab = this.tabs[0].title;
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    setChildren() {
      this.children = this.getSlot().filter((item) => item.tag);
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
.r-tab {
  .tabbar {
    display: flex;
    gap: 2px;
  }
  .tab-button {
    display: flex;
    align-items: center;
    gap: $p;
    padding: $p $p2;
    &.active {
      color: $prm;
      background: $prm-light;
    }
  }
}
.tabs-container {
  border-radius: $radius;
  overflow: hidden;
  position: relative;
  background: $yellow;
  transition: all $duration;
}
</style>