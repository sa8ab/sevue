<template>
  <div class="container">
    <div class="actions">
      <RButton @click="count++">change count</RButton>
      <RButton @click="active = !active">active </RButton>
      <RButton @click="dynamicTabTitle = 'changed'">change a tab title</RButton>
    </div>
    <div v-if="active">
      <div class="tabs">
        <RTab ref="tabbar" v-model="tab" :items="tabs"> </RTab>
        <RTab ref="tabbar" v-model="tab" :items="tabs" :showBorder="false" type="segment"> </RTab>
        <RTab ref="tabbar" v-model="tab" :items="tabs" color="yellow" moverFull fit> </RTab>
        <RTab ref="tabbar" v-model="tab" :items="tabs" moverFull> </RTab>
        <RTab ref="tabbar" v-model="tab" :items="tabs" bordered> </RTab>
      </div>

      <RPanel :modelValue="'one'">
        <RPanelItem value="one">some text one</RPanelItem>
        <RPanelItem value="two">some text two</RPanelItem>
        <RPanelItem value="three">some text three</RPanelItem>
      </RPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { RTab, RTabItem, RButton, RPanel, RPanelItem } from "../../src/main";

const tabbar = ref();
const active = ref(true);
const count = ref(2);
const dynamicTabTitle = ref("one");

const tab = ref("settings");

const tabs = computed(() => [
  { label: "Settings", value: "settings" },
  { label: "Comments", value: "comments" },
  { label: "Logs", value: "logs", disabled: true },
  { label: dynamicTabTitle.value, value: "logs2" },
  // { title: "comments", name: "commentsrwef" },
  // { title: "logs", name: "logswef" },
  // { title: "logs3", name: "logsr2" },
  // { title: "logs2", name: "logsgrg3" },
]);

const goSecondTab = () => tabbar.value.setActiveTab("comments");
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
.actions {
  margin-bottom: 20px;
}
.tabs {
  flex-direction: column;
  display: flex;
  gap: 80px;
}
</style>
