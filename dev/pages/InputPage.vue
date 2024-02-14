<template>
  <div class="center-it">
    <div class="side">
      <RInput placeholder="test" label="Username" id="username"></RInput>
      <RInput v-model.number="state.model" placeholder="input" label="Email Conflicts">
        <template #after>
          <div class="after">
            <RButton iconOnly>Hey</RButton>
            <div>After</div>
          </div>
        </template>
      </RInput>
      <RInput tag="textarea" v-model="state.model" placeholder="some placeholder" @input="onInput"></RInput>
      <RInput tag="textarea" v-model="state.model" placeholder="some placeholder" @input="onInput"></RInput>
      <RInput label="Email" errorMessage="invalid email" message="invalid" id="user-email" disabled></RInput>
      <RInput label="Email" errorMessage="invalid email" message="invalid" id="user-email"></RInput>
    </div>
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
  margin: auto;
}
.after {
  display: flex;
}
.side {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}
</style>
