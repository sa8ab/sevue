<template>
  <div class="container">
    <RButton @click="disabled = !disabled">
      {{ disabled ? "enable" : "disable" }}
    </RButton>
    <RPagination
      v-model="page"
      :count="10"
      :mainRange="0"
      :disabled="disabled"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    page: 1,
    disabled: true,
  }),
};
</script>

<style>
</style>