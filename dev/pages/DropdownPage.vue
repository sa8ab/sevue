<script setup lang="ts">
import { ref } from "vue";
import { DropdownRoot, DropdownTrigger, DropdownContent, RButton, DropdownItem } from "../../src/main";
</script>

<template>
  <div class="dropdown-page">
    <div class="item">
      <RButton>Random Button</RButton>
      <RButton>Random Button</RButton>
      <RButton>Random Button</RButton>

      <DropdownRoot v-slot="{ active }">
        <DropdownTrigger class="dropdown-trigger" asChild>
          <RButton>Trigger</RButton>
        </DropdownTrigger>
        <div>{{ active }}</div>
        <DropdownContent v-if="active" class="dropdown-content">
          <DropdownItem>Item 1</DropdownItem>
          <DropdownItem>Item 2</DropdownItem>
          <DropdownItem disabled>Disabled Item 3</DropdownItem>
          <DropdownItem v-for="x in 20">Item {{ x }}</DropdownItem>
          <DropdownItem asChild>
            <button>Button</button>
          </DropdownItem>
        </DropdownContent>
      </DropdownRoot>
      <RButton>Random Button</RButton>
      <RButton>Random Button</RButton>
      <RButton>Random Button</RButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown-page {
  gap: 20px;
  padding: 40px;
}
</style>

<style lang="scss">
.dropdown-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #1a1a1a;
  border-radius: 8px;
  padding: 10px;
  button {
    color: black;
  }
  height: 300px;
  overflow: auto;
}
*:focus {
  box-shadow: 0 0 0 2px red;
}
</style>
