<template>
  <RButton @click="active = true">Show Popup</RButton>
  <RPopup v-model:active="active" title="Demo Popup">
    Some content of popup
    <template #footer>
      <div class="r-popup-footer">
        <RButton @click="active = false" flat>Dismiss</RButton>
      </div>
    </template>
  </RPopup>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const active = ref(false);
</script>
