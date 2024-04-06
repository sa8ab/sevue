<script setup lang="ts">
import { ref } from "vue";
import { DropdownRoot, DropdownTrigger, DropdownContent, RButton } from "../../src/main";
</script>

<template>
  <div class="dropdown-page">
    <div class="item">
      <DropdownRoot v-slot="{ active }">
        <DropdownTrigger class="dropdown-trigger" asChild>
          <RButton>Trigger</RButton>
        </DropdownTrigger>
        <div>{{ active }}</div>
        <Teleport to="body">
          <DropdownContent v-if="active" class="dropdown-content">
            <input />
            <button>Button</button>
            dropdown option-content
          </DropdownContent>
        </Teleport>
      </DropdownRoot>
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
  background: #93faff;
  color: black;
  padding: 10px;
}
*:focus {
  border: 2px solid red;
}
</style>
