<template>
  <div class="input-items">
    <RInput v-model="name" icon="bx-user-circle" label="Icon" />
    <RInput v-model="name" iconAfter icon="bx-user-circle" label="Icon After" />
    <RInput v-model="name" label="Slot Icon" >
      <template #icon>
        <i class='bx bx-message-square'></i>
      </template>
    </RInput>
  </div>
</template>

<script lang="ts" setup>
const name = ref("");
</script>

<style scoped lang="scss">
</style>
