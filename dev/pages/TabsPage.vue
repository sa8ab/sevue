<template>
  <div class="center-it">
    <RButton @click="tabs.length = 2">reduce</RButton>
    <RTab @tabChange="onTabChange" ref="tabbar" moverFull bordered>
      <RTabItem title="test" name="test"> test </RTabItem>
      <RTabItem :title="item.title" :name="item.title" v-for="item in tabs">
        {{ item.title }}
      </RTabItem>
    </RTab>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RTab, RTabItem, RButton } from "../../src/main";

const tabbar = ref();

const tabs = ref([{ title: "settings" }, { title: "comments" }, { title: "logs" }]);

const goSecondTab = () => tabbar.value.setActiveTab("comments");

const onTabChange = (e) => {
  console.log("onTabChange", e);
};
</script>

<style lang="scss" scoped>
.center-it {
  max-width: 400px;
  margin: auto;
}
</style>
