<template>
  <div class="items">
    <RButton color="red">Red</RButton>
    <RButton color="yellow">Yellow</RButton>
    <RButton>Default</RButton>
    <RButton color="green">Green</RButton>
    <RButton color="#FC427B">HEX</RButton>
    <RButton color="rgb(33, 140, 116)">RGB</RButton>
  </div>
</template>

<style scoped lang="scss">
.items {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
