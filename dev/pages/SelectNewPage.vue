<template>
  <div>
    <div style="height: 200px"></div>
    <div class="center-it grid-4">
      <RSelectNew
        label="New Select"
        hint="Up to 4 items"
        searchable
        :options="users"
        :getText="(option) => option.name"
        placeholder="Select Options"
      >
      </RSelectNew>
      <RSelectNew
        label="Grouped Select"
        :groupedOptions="groupedUsers"
        :getGroupOptions="(group) => group.users"
        :getGroupTitle="(group) => group.role"
        :getText="(option) => option.name"
        multiple
        :modelValue="['46', '23']"
        searchable
        placeholder="Select Options"
      >
      </RSelectNew>
      <RSelectNew label="Grouped Select" placeholder="Select Options"> </RSelectNew>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RSelectNew } from "../../src/main";
import { users, groupedUsers } from "../mock";
</script>

<style lang="scss" scoped>
.grid-4 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  padding: 40px;
}
</style>
