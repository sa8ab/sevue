<template>
  <div class="container">
    <RPagination :count="10" v-model="page1" color="red" />
    <RPagination :count="5" v-model="page2" color="#F5853F" />
    <RPagination :count="30" v-model="page3" color="#32E875" />
    <RPagination
      :count="14"
      v-model="page4"
      color="rgb(68, 207, 203)"
      class="fourth"
      activeTextColor="#000"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    page1: 1,
    page2: 3,
    page3: 5,
    page4: 2,
  }),
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>