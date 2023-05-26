<template>
  <div class="doc-item">
    <RTab>
      <RTabItem title="First Tab" name="first">USER</RTabItem>
      <RTabItem title="Second Tab" name="second">SETTINGS</RTabItem>
      <template #content-first>
        <i class="bx bx-user"></i>
        &nbsp; USER
      </template>
      <template #content-second>
        <i class="bx bx-cog"></i>
        &nbsp; SETTINGS
      </template>
    </RTab>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.doc-item {
  max-width: 100%;
}
.action {
  margin-bottom: 8px;
}
</style>
