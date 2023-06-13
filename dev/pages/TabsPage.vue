<template>
  <div class="center-it">
    <div class="actions">
      <RButton @click="count++">change count</RButton>
      <RButton @click="tab = 'test4'">change tab</RButton>
      <RButton @click="active = !active">active </RButton>
    </div>
    <div v-if="active">
      <RTab ref="tabbar" moverFull noBorder v-model="tab">
        <RTabItem title="test" name="test"> test </RTabItem>
        <RTabItem title="test234" name="test3"> test 234</RTabItem>
        <RTabItem title="test" name="test4"> test </RTabItem>
        <RTabItem v-for="x in count" :title="`dynamic ${x}`" :name="`dynamic ${x}`"> test </RTabItem>
      </RTab>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RTab, RTabItem, RButton } from "../../src/main";

const tabbar = ref();
const active = ref(true);
const tab = ref("test3");
const count = ref(2);

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
