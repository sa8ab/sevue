<template>
  <div>
    <div style="height: 200px"></div>
    <div class="grid-4">
      <RInput skipFocusOn=".r-selectnew">
        <template #after>
          <RSelect></RSelect>
        </template>
      </RInput>
    </div>
    <div class="grid-4">
      <RSelect
        label="New Select"
        hint="Up to 4 items"
        searchable
        :options="users"
        :getText="(option) => option.name"
        v-model="model1"
        :resetSearchAfterSelection="false"
        :getIsDisabled="(option) => option.id == '46'"
      >
        <template #option="{ option }">
          <span> #{{ option.id }} {{ option.name }}</span>
        </template>
      </RSelect>
      <RSelect
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
      <RSelect
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
      </RSelect>
      <RSelect placeholder="Select Options"> </RSelect>
      <RSelect label="Custom Option Wrapper" :options="users" :getText="(v) => v.name" v-model="model4"> </RSelect>
      <RSelect label="Disabled Select" disabled :options="users" :getText="(v) => v.name" v-model="model4"> </RSelect>
      <RSelect color="red" label="Colored" :options="users" :getText="(v) => v.name" v-model="model4"> </RSelect>
      <RSelect label="Error" :options="users" :getText="(v) => v.name" v-model="model4" message="Select your status">
      </RSelect>
      <RSelect label="Display Label" :options="users" :getText="(v) => v.name" v-model="model4">
        <template #displayLabel>
          <div>Custom display label</div>
        </template>
      </RSelect>
      <div>
        <RSelect label="Loading Select" :options="users" :getText="(v) => v.name" :loading="loading"> </RSelect>
        <RButton @click="loading = !loading">Load</RButton>
      </div>
      <RSelect label="Custom Option" :options="users" v-model="model4" :getText="(v) => v.name">
        <template #option-content="{ text, onClick }">
          <div class="custom-option" @click="onClick">234{{ text }}</div>
        </template>
      </RSelect>

      <RSelect
        label="Creatable"
        :options="usersRef"
        :getText="(v) => v.name"
        v-model="createOptionModel"
        multiple
        searchable
        creatable
        showCreateWhen="always"
        :createOption="handleCreateOption"
      >
        <template #create-option="{ search }"> Add {{ search }} </template>
      </RSelect>

      <RSelect
        :options="remoteUsers"
        :getText="(v) => v.name"
        :getValue="(o) => o.id"
        v-model="remoteModel"
        multiple
        searchable
        remote
        @search="getRemoteUsers"
      ></RSelect>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RSelect } from "../../src/main";
import { users, groupedUsers } from "../mock";
import Axios from "axios";

const model1 = ref(undefined);
const model2 = ref(undefined);
const model3 = ref(undefined);
const model4 = ref("46");

const loading = ref(false);

const usersRef = ref([...users]);
const createOptionModel = ref<string[]>([]);

const handleCreateOption = (value: string) => {
  usersRef.value.push({
    id: "randomId" + value,
    company: "",
    name: value,
  });

  createOptionModel.value.push("randomId" + value);
};

const remoteUsers = ref<any[]>([]);
const remoteModel = ref([2]);

const getRemoteUsers = async (query?: string) => {
  const res = await Axios.get("https://jsonplaceholder.typicode.com/users", {
    params: query
      ? {
          name: query,
        }
      : {},
  });

  remoteUsers.value = res.data;
};
</script>

<style lang="scss" scoped>
.grid-4 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  padding: 40px;
  margin-bottom: 100px;
}
</style>
