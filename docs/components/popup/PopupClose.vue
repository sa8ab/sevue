<!-- #region template -->
<template>
  <RButton @click="active = true">Show Popup</RButton>
  <RPopup v-model:active="active" title="Demo Popup" noClose>
    This popup does not close by clicking outside of it or by clicking close icon.
    <template #footer>
      <div class="r-popup-footer">
        <RButton @click="active = false" fill color="red">Close Manually</RButton>
      </div>
    </template>
  </RPopup>
</template>
<!-- #endregion template -->

<script lang="ts" setup>
import { ref } from "vue";
const active = ref(false);
</script>

<style scoped lang="scss"></style>
