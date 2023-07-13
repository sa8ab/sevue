<template>
  <div class="center-it">
    <div class="actions">
      <RButton @click="count++">change count</RButton>
      <RButton @click="tab = 'three'">change tab</RButton>
      <RButton @click="active = !active">active </RButton>
      <RButton @click="dynamicTabTitle = 'changed'">change a tab title</RButton>
    </div>
    <div v-if="active">
      <RTab ref="tabbar" v-model="tab">
        <RTabItem value="one">{{ dynamicTabTitle }}</RTabItem>
        <RTabItem value="two">two</RTabItem>
        <RTabItem value="three" disabled>three</RTabItem>
        <!-- <RTabItem v-for="x in count" :title="`dynamic ${x}`" :name="`dynamic ${x}`"> test </RTabItem> -->
      </RTab>

      <RPanel v-model="tab">
        <RPanelItem value="one">some text one</RPanelItem>
        <RPanelItem value="two">some text two</RPanelItem>
        <RPanelItem value="three">some text three</RPanelItem>
      </RPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RTab, RTabItem, RButton, RPanel, RPanelItem } from "../../src/main";

const tabbar = ref();
const active = ref(true);
const tab = ref("one");
const count = ref(2);
const dynamicTabTitle = ref("one");

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
</style>
