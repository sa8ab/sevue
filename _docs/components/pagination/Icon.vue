<template>
  <div class="container">
    <RPagination v-model="page" :count="10" :mainRange="0" :sideRange="1">
      <template #prev>
        <i class="bx bx-left-arrow-alt"></i>
      </template>
      <template #next>
        <i class="bx bx-right-arrow-alt"></i>
      </template>
    </RPagination>
  </div>
</template>

<script>
export default {
  data: () => ({
    page: 1,
  }),
};
</script>

<style>
</style>