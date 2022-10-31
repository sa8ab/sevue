<template>
  <div class="pagination-page">
    <RPagination
      :count="40"
      v-model="page"
      :mainRange="0"
      :sideRange="2"
      compact
    >
      <template #next>
        <i class="bx bx-right-arrow-alt"></i>
      </template>
      <template #prev>
        <i class="bx bx-left-arrow-alt"></i>
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

<style scoped>
.pagination-page {
  padding-top: 100px;
}
</style>