<template>
  <div class="container">
    <div class="item">prm</div>
    <div class="item" style="--r-prm: var(--r-red)">red</div>
    <div class="item" style="--r-prm: var(--r-green)">green</div>
    <div class="item" style="--r-prm: var(--r-yellow)">yellow</div>
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
    height: 100px;
    font-size: 1.4rem;
    border-radius: 8px;
    background: rgb(var(--r-prm));
    color: white;
    box-shadow: 0 0 8px rgba(var(--r-prm), 0.4);
  }
}
</style>