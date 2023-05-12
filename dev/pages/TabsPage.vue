<template>
  <div class="center-it">
    <RTab bordered color="red" @tabChange="onTabChange" fit ref="tabbar">
      <RTabItem title="some title">
        <RButton @click="goSecondTab" compact>some button</RButton>
      </RTabItem>
      <RTabItem title="title">
        <RButton>some button</RButton>
      </RTabItem>
    </RTab>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const tabbar = ref();

const goSecondTab = () => tabbar.value.setActiveTab("title");

const onTabChange = (e) => {
  console.log(e);
};
</script>

<style lang="scss" scoped>
.center-it {
  max-width: 400px;
  margin: auto;
}
</style>
