<template>
  <div class="center-it">
    <RInput v-model="state.model" placeholder="input" label="some label">
      <template #after>
        <div class="after">
          <RButton iconOnly>Hey</RButton>
          <RButton>
            <template #icon>
              <i class="bx bx-search"></i>
            </template>
          </RButton>
        </div>
      </template>
    </RInput>
    <RInput tag="textarea" v-model="state.model" placeholder="some placeholder" @input="onInput"></RInput>
  </div>
</template>

<script setup lang="ts">
import { RInput } from "../../src/main";
import { reactive } from "vue";

const state = reactive<{
  model: string;
}>({
  model: "",
});

const onInput = (e: any) => {
  console.log(e);
};
</script>

<style lang="scss" scoped>
.center-it {
  max-width: 400px;
  margin: auto;
}
.after {
  display: flex;
}
</style>
