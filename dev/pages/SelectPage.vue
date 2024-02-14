<template>
  <div class="center-it grid-4">
    <RSelect v-model="selected2" placeholder="Type and hit enter" :loading="loading" label="1234" canDeselect>
      <ROption v-for="item in items" :value="item.id" :text="item.name" />
    </RSelect>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RSelect } from "../../src/main";
import { users } from "../mock/index";

const clear = () => {
  selected2.value = null;
};

const selected2 = ref("");

const loading = ref(false);

const items = users;

const items2 = ref(
  Array.from({ length: 20 }, (_, i) => ({
    value: i + 1,
    text: `item ${i + 1}`,
  }))
);

const customSelected = ref<any>([]);

const onNewOption = async ({ newOption, isAlreadyInOptions, isAlreadyInValue }: any) => {
  loading.value = true;
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
  loading.value = false;
  if (!isAlreadyInValue) {
    customSelected.value = [...customSelected.value, newOption];
  }

  if (!isAlreadyInOptions) {
    items2.value.push({
      value: newOption,
      text: newOption,
    });
  }

  console.log({ newOption, isAlreadyInOptions, isAlreadyInValue });

  return true;
};
</script>

<style lang="scss" scoped>
.grid-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding: 40px;
}
.container {
  display: flex;
  flex-wrap: wrap;
  gap: var(--r-space-2);
  margin-top: 40px;
}

.selected-item {
  display: flex;
  gap: var(--r-space-1);

  img {
    width: 24px;
  }
}
</style>
