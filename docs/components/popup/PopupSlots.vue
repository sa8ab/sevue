<!-- #region template -->
<template>
  <RButton @click="active = true">Show Popup</RButton>
  <RPopup v-model:active="active" noCloseButton class="custom-popup" style="--r-radius: 14px">
    <template #header>
      <div class="header">Custom HEADER</div>
    </template>
    Popup with custom header and footer
    <template #footer>
      <div class="custom-footer">
        <RButton @click="active = false" color="red" variant="fill"> Confirm </RButton>
        <RButton @click="active = false" variant="cancel"> Cancel </RButton>
      </div>
    </template>
  </RPopup>
</template>
<!-- #endregion template -->

<script lang="ts" setup>
import { ref } from "vue";
const active = ref(false);
</script>

<style lang="scss">
// #region style
.custom-popup {
  .r-popup-header {
    padding: 0;
    border-bottom: none;
  }
  .header {
    background: rgb(var(--r-prm));
    width: 100%;
    padding: var(--r-space-2);
    font-weight: 500;
    font-size: var(--r-font-xlarge);
    background: linear-gradient(to right, rgba(var(--r-red), 1), rgba(var(--r-red), 0.6));
    text-align: center;
  }
  .custom-footer {
    padding: var(--r-space-2);
    display: flex;
    justify-content: center;
    gap: var(--r-space-1);
  }
}
// #endregion style
</style>
