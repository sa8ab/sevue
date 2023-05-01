<template>
  <div class="center-it">
    <RInput v-model="value" placeholder="input">
      <template #after>
        <div class="after">
          <RButton iconOnly>Hey</RButton>
          <RButton>
            hi2
            <template #icon>
              <i class="bx bx-search"></i>
            </template>
          </RButton>
        </div>
      </template>
    </RInput>
    <RInput
      tag="textarea"
      v-model="value"
      placeholder="some placeholder"
      @input="onInput"
    ></RInput>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import { RInput } from "../../src/main";

const value = ref("sdds");

const onInput = (e) => {
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
