<template>
  <div class="container">
    <RPagination v-model="page" :count="10" />
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