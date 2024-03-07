<template>
  <div class="doc-items">
    <div class="item">
      Default Slot
      <RSwitch v-model="selected1">Default Slot</RSwitch>
    </div>
    <div class="item">
      On/Off Slots
      <RSwitch v-model="selected2" color="#e67e22">
        <template #on>Light</template>
        <template #off>Dark</template>
      </RSwitch>
    </div>
    <div class="item">
      Circle Slot
      <RSwitch v-model="selected3" color="green">
        <template #circle> <i class="bx bx-cog"></i> </template>
      </RSwitch>
    </div>
  </div>
</template>

<script lang="ts" setup>
const selected1 = ref(false);
const selected2 = ref(false);
const selected3 = ref(false);
</script>

<style scoped lang="scss">
.doc-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--r-space-3);
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--r-space-3);
  }
}
</style>
