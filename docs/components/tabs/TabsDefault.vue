<!-- #region template -->
<template>
  <div style="width: 100%">
    <RTab v-model="activeTab" v-bind="$attrs">
      <RTabItem value="first"> First Tab </RTabItem>
      <RTabItem value="second"> Second Tab </RTabItem>
    </RTab>
    <RPanel v-model="activeTab">
      <RPanelItem value="first">
        <div>Content Of First Tab</div>
        <div>Content Of First Tab</div>
        <div>Content Of First Tab</div>
      </RPanelItem>
      <RPanelItem value="second">Content Of Second Tab</RPanelItem>
    </RPanel>
  </div>
</template>
<!-- #endregion template -->

<script lang="ts" setup>
import { ref } from "vue";
// #region script
const activeTab = ref("first");
// #endregion script
</script>
