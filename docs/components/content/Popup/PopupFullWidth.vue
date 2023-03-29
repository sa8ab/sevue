<template>
    <RButton @click="active = true">Show Popup</RButton>
    <RPopup v-model:active="active" title="Demo Popup" fullWidth>
      This popup has 100% width of body
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
