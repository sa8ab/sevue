<template>
  <div class="items">
    <RButton icon="bx-star" color="red" fill>Default</RButton>
    <RButton icon="bx-heart" color="#f39c12" fill iconAfter>Icon After</RButton>
    <RButton>
      Slot Icon
      <template #icon>
        <i class='bx bxl-vuejs'></i>
      </template>
    </RButton>
  </div>
</template>

<style scoped lang="scss">
.items {
  display: flex;
  gap: var(--space-1);
  flex-wrap: wrap;
}
</style>