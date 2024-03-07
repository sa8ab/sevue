<template>
  <div class="doc-item">
    <RInput v-model="search" placeholder="Search..." label="Clearable Input">
      <template #after>
        <RButton iconOnly icon="bx-x" flat color="red" @click="search = ''" v-if="!!search"></RButton>
        <RButton icon="bx-search" flat iconOnly />
      </template>
    </RInput>
    <RInput v-model="website" label="Website Address">
      <template #before>
        <div class="before">https://</div>
      </template>
      <template #after>
        <RButton iconOnly icon="bx-search" flat />
      </template>
    </RInput>
  </div>
</template>

<script lang="ts" setup>
const search = ref("");
const website = ref("");
</script>

<style scoped lang="scss">
.doc-item {
  display: flex;
  flex-direction: column;
  gap: var(--r-space-3);
}
.before {
  display: flex;
  align-items: center;
  padding: 0 var(--r-space-1);
  color: rgb(var(--r-disabled));
}
</style>
