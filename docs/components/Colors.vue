<template>
  <div class="colors-container">
    <div class="colors-container-item">prm</div>
    <div class="colors-container-item" style="--r-prm: var(--r-red)">red</div>
    <div class="colors-container-item" style="--r-prm: var(--r-green)">green</div>
    <div class="colors-container-item" style="--r-prm: var(--r-yellow)">yellow</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.colors-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  &-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    font-size: 1.4rem;
    border-radius: 8px;
    background: rgb(var(--r-prm));
    color: white;
    box-shadow: 0 0 8px rgba(var(--r-prm), 0.4);
  }
}
</style>
