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
        v-model="model1"
      >
        <template #option="{ name, id }">
          <span> #{{ id }} {{ name }}</span>
        </template>
      </RSelectNew>
      <RSelectNew
        label="Grouped Select"
        :groupedOptions="groupedUsers"
        :getGroupOptions="(group) => group.users"
        :getGroupTitle="(group) => group.role"
        :getText="(option) => option.name"
        multiple
        v-model="model2"
        searchable
        placeholder="Select Options"
      >
      </RSelectNew>
      <RSelectNew label="Grouped Select" placeholder="Select Options"> </RSelectNew>
      <RSelectNew label="Custom Option Wrapper" :options="users" :getText="(v) => v.name" v-model="model4">
      </RSelectNew>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RSelectNew } from "../../src/main";
import { users, groupedUsers } from "../mock";

const model1 = ref(undefined);
const model2 = ref(undefined);
const model3 = ref(undefined);
const model4 = ref("46");
</script>

<style lang="scss" scoped>
.grid-4 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  padding: 40px;
}
</style>
