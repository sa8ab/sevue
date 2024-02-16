<template>
  <div>
    <div style="height: 200px"></div>
    <div class="grid-4">
      <RSelectNew
        label="New Select"
        hint="Up to 4 items"
        searchable
        :options="users"
        :getText="(option) => option.name"
        v-model="model1"
        :resetSearchAfterSelection="false"
      >
        <template #option="{ option }">
          <span> #{{ option.id }} {{ option.name }}</span>
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
        :closeAfterSelection="false"
      />
      <RSelectNew
        label="Multiple Select"
        :options="users"
        :getText="(o) => o.name"
        multiple
        v-model="model3"
        placeholder="Select Options"
        :showTags="false"
      >
        <template #displayLabel>
          <div>{{ model3.length }} Selected</div>
        </template>
      </RSelectNew>
      <RSelectNew label="Grouped Select" placeholder="Select Options"> </RSelectNew>
      <RSelectNew label="Custom Option Wrapper" :options="users" :getText="(v) => v.name" v-model="model4">
      </RSelectNew>
      <RSelectNew label="Disabled Select" disabled :options="users" :getText="(v) => v.name" v-model="model4">
      </RSelectNew>
      <RSelectNew color="red" label="Colored" :options="users" :getText="(v) => v.name" v-model="model4"> </RSelectNew>
      <RSelectNew label="Error" :options="users" :getText="(v) => v.name" v-model="model4" message="Select your status">
      </RSelectNew>
      <RSelectNew label="Display Label" :options="users" :getText="(v) => v.name" v-model="model4">
        <template #displayLabel>
          <div>Custom display label</div>
        </template>
      </RSelectNew>
      <div>
        <RSelectNew label="Loading Select" :options="users" :getText="(v) => v.name" :loading="loading"> </RSelectNew>
        <RButton @click="loading = !loading">Load</RButton>
      </div>
      <RSelectNew label="Custom Option" :options="users" v-model="model4" :getText="(v) => v.name">
        <template #option-content="{ text, onClick }">
          <div class="custom-option" @click="onClick">234{{ text }}</div>
        </template>
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

const loading = ref(false);
</script>

<style lang="scss" scoped>
.grid-4 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  padding: 40px;
}
</style>
