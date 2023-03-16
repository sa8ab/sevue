<template>
  <div class="container">
    <RPagination v-model="page" :count="10" :mainRange="0" :sideRange="1" />
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