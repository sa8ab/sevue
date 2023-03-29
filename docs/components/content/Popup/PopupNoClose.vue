<template>
    <RButton @click="active = true">Show Popup</RButton>
    <RPopup v-model:active="active" title="Demo Popup" noClose>
      This popup does not close by clicking outside of it and it does not have close button
      <template #footer>
        <div class="r-popup-footer">
          <RButton @click="active = false" fill color="red">Close</RButton>
        </div>
      </template>
    </RPopup>
</template>

<script lang="ts" setup>
const active = ref(false)
</script>

<style scoped lang="scss">
</style>
