<template>
  <div class="items">
    <RButton flat>Flat</RButton>
    <RButton bordered>Bordered</RButton>
    <RButton flat bordered>Flat & Bordered</RButton>
    <RButton fill textColor="#fff">Filled Style</RButton>
    <RButton textStyle>Text Style</RButton>
  </div>
</template>

<style scoped lang="scss">
.items {
  display: flex;
  gap: var(--space-1);
}
</style>
