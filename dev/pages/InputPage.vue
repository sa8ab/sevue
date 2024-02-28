<template>
  <div class="center-it">
    <div class="side">
      <RInput
        ref="firstInputRef"
        placeholder="test"
        label="Username"
        id="username"
        @focus="onFocus"
        hint="Optional"
      ></RInput>
      <RInput v-model.number="state.model" placeholder="input" label="Email Conflicts">
        <template #after>
          <div class="after">
            <RButton>Hey</RButton>
            <div>After</div>
          </div>
        </template>
      </RInput>
      <RInput ref="textareaRef" textarea v-model="state.model" placeholder="some placeholder" @input="onInput"></RInput>
      <RInput textarea v-model="state.model" placeholder="some placeholder" @input="onInput"></RInput>
      <RInput label="Email" errorMessage="invalid email" message="invalid" disabled></RInput>
      <RInput label="Email" errorMessage="invalid email" message="invalid" id="user-email"></RInput>
    </div>
    <RButton @click="focusFirst">Focus First Input</RButton>
    <RButton @click="focusTextarea">Focus Textarea</RButton>
  </div>
</template>

<script setup lang="ts">
import { RInput } from "../../src/main";
import { reactive, ref } from "vue";

const state = reactive<{
  model: string;
}>({
  model: "",
});

const firstInputRef = ref();
const textareaRef = ref();

const onInput = (e: any) => {
  console.log(e);
};
const onFocus = () => {};

const focusFirst = () => {
  firstInputRef.value.focus();
};
const focusTextarea = () => {
  textareaRef.value.focus();
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
