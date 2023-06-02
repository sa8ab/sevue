<template>
  <div class="center-it">
    <RButton @click="tabs[1].title = 'changed thing'">change width</RButton>
    <RTab ref="tabbar" initialActiveTab="logs" moverFull segmented>
      <RTabItem title="test" name="test"> test </RTabItem>
      <RTabItem :title="item.title" :name="item.name" v-for="item in tabs">
        {{ item.title }}
      </RTabItem>
    </RTab>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RTab, RTabItem, RButton } from "../../src/main";

const tabbar = ref();

const tabs = ref([
  { title: "Settings", name: "settings" },
  { title: "Comments", name: "comments" },
  { title: "Logs", name: "logs" },
  { title: "Logs3", name: "logs2" },
  // { title: "comments", name: "commentsrwef" },
  // { title: "logs", name: "logswef" },
  // { title: "logs3", name: "logsr2" },
  // { title: "logs2", name: "logsgrg3" },
]);

const goSecondTab = () => tabbar.value.setActiveTab("comments");
</script>

<style lang="scss" scoped>
.center-it {
  // max-width: 800px;
  margin: auto;
}
.container {
  // width: 100%;
}
</style>
