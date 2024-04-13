<script setup lang="ts">
import { ref } from "vue";
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  RButton,
  DropdownItem,
  RDropdown,
  RDropdownItem,
} from "../../src/main";

const parentActiveRef = ref(false);

const onUpdate = () => {
  console.log("updated");
};

const handleDropdownItemClick = () => {
  console.log("dropdown item clicked");
};
</script>

<template>
  <div class="dropdown-page">
    <RButton>Random Button</RButton>
    <RButton>Random Button</RButton>
    <RButton>Random Button</RButton>

    <DropdownRoot v-slot="{ active }">
      <DropdownTrigger class="dropdown-trigger" asChild>
        <RButton variant="fill">Trigger</RButton>
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

    <pre>parent ref:{{ parentActiveRef }}</pre>

    <RDropdown>
      <RButton>Styled Dropdown</RButton>
      <template #dropdown>
        <RDropdownItem @click="handleDropdownItemClick">Item 1</RDropdownItem>
        <RDropdownItem @click="handleDropdownItemClick">Item 2</RDropdownItem>
        <RDropdownItem disabled @click="handleDropdownItemClick">Item 3</RDropdownItem>
        <RDropdownItem @click="handleDropdownItemClick">Item 4</RDropdownItem>
      </template>
    </RDropdown>
  </div>
</template>

<style lang="scss" scoped>
.dropdown-page {
  display: flex;
  flex-wrap: wrap;
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
// *:focus {
//   box-shadow: 0 0 0 2px red;
// }
</style>
