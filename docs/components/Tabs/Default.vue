<template>
  <div class="container">
    <RTab :bordered="bordered">
      <RTabItem title="Setting">
        User Settings Tab Content
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          autem debitis dolorem eveniet distinctio esse tenetur quis quod magni
          rerum!
        </p>
      </RTabItem>
      <RTabItem title="Favorites"> User Favorites Tab Content </RTabItem>
    </RTab>
  </div>
</template>

<script>
export default {
  props: ["bordered"],
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
}
</style>