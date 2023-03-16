<template>
  <div class="container">
    <RTab>
      <template #icon-2> <i class="bx bx-group"></i></template>
      <RTabItem title="Setting" icon="bx-desktop">
        User Settings Tab Content
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi
          consequuntur incidunt quaerat libero! Exercitationem obcaecati velit
          laborum eius optio voluptate!
        </p>
      </RTabItem>
      <RTabItem title="Favorites" icon="bx-heart">
        User Favorites Tab Content
      </RTabItem>
      <RTabItem title="Groups"> Goups tab </RTabItem>
    </RTab>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
}
</style>