<template>
  <div class="doc-items">
    <RSwitch v-model="selected1"></RSwitch>
    <RSwitch v-model="selected2" color="green">
      <template #circle> <i class="bx bx-cog"></i> </template>
    </RSwitch>
    <RSwitch v-model="selected3" color="red">
      <template #on>Subscribed</template>
      <template #off>Unsubscribed</template>
    </RSwitch>
    <RSwitch v-model="selected4" color="#e67e22">
      <template #on>Light</template>
      <template #off>Dark</template>
      <template #circle> <i :class="`bx bx-${selected4 ? 'sun' : 'moon'}`"></i> </template>
    </RSwitch>
  </div>
</template>

<script lang="ts" setup>
const selected1 = ref(false);
const selected2 = ref(false);
const selected3 = ref(false);
const selected4 = ref(false);
</script>

<style scoped lang="scss">
.doc-items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--r-space-1);
}
</style>
