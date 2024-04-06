<script setup lang="ts">
import { ref } from "vue";
import { DropdownRoot, DropdownTrigger, DropdownContent } from "../../src/main";
</script>

<template>
  <div class="dropdown-page">
    <div class="item">
      <DropdownRoot v-slot="{ active }">
        <DropdownTrigger class="dropdown-trigger" as="span">Trigger</DropdownTrigger>
        <div>{{ active }}</div>
        <Teleport to="body">
          <DropdownContent v-if="active" class="dropdown-content">Content</DropdownContent>
        </Teleport>
      </DropdownRoot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown-page {
  gap: 20px;
  padding: 40px;
  .dropdown-trigger {
    border: 2px solid #0ae014;
    border-radius: 8px;
    padding: 8px 14px;
    cursor: pointer;
    display: flex;
  }
  .item {
  }
}
</style>
