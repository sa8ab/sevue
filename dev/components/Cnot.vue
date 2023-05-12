<template>
  <div class="c-not">
    <img src="../assets/images/cookies.svg" alt="" class="image" />
    <div class="desc">We use cookies to make your experience ...</div>
    <RButton block @click="$emit('close')" color="#FFD796">Accept Cookies</RButton>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.c-not {
  width: 100%;
}
.image {
  object-fit: contain;
  width: 100px;
  height: 100px;
  margin: auto;
  display: flex;
}
.desc {
  margin: 20px 0;
  text-align: center;
}
</style>
