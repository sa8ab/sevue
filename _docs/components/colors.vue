<template>
  <div class="container">
    <div class="item">prm</div>
    <div class="item" style="--rgb-prm: var(--rgb-red)">red</div>
    <div class="item" style="--rgb-prm: var(--rgb-green)">green</div>
    <div class="item" style="--rgb-prm: var(--rgb-yellow)">yellow</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 140px;
    font-size: 1.4rem;
    border-radius: 8px;
    background: rgb(var(--rgb-prm));
    color: white;
    box-shadow: 0 0 4px rgba(var(--rgb-prm), 0.4);
  }
}
</style>