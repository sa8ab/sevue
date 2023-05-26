<template>
  <div class="doc-item">
    <RTab v-bind="$attrs">
      <RTabItem title="First Tab" name="first"> Some Content </RTabItem>
      <RTabItem title="Second Tab" name="second">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique velit molestias praesentium sequi inventore
        quam, ad sed veniam vero soluta ab! Consequatur animi fugit minima, facilis repudiandae, quidem alias nemo
        fugiat architecto iste, nobis accusamus facere iure excepturi quo culpa?
      </RTabItem>
    </RTab>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.doc-item {
  max-width: 100%;
}
</style>
