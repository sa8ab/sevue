<template>
  <div class="page">
    <div class="section">
      <pre>{{ checked }}</pre>
      <RCheckbox v-model="checked" class="custom-classname" color="red" trueValue="yes" falseValue="no">
        Checkbox
      </RCheckbox>
      <RCheckbox v-model="checked"> Checkbox </RCheckbox>
      <RCheckbox v-model="checked" disabled> Checkbox </RCheckbox>
    </div>
    <div class="section">
      {{ groupCheked }}
      <RCheckbox v-model="groupCheked" value="1" color="red"> Checkbox </RCheckbox>
      <RCheckbox v-model="groupCheked" value="2"> Checkbox </RCheckbox>
      <RCheckbox v-model="groupCheked" value="3" color="red" disabled> Checkbox </RCheckbox>
    </div>
    <div class="section">
      <CheckboxRoot v-slot="{ isChecked }" v-model="checked" value="on">
        <div :class="['contained', { isChecked }]">Contained Checkbox Item</div>
      </CheckboxRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CheckboxRoot } from "../../src/main";

const checked = ref();
const groupCheked = ref(["1"]);
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.section {
  display: flex;
  gap: 20px;
}
.contained {
  padding: 10px;
  background-color: #666;
  border-radius: 4px;
  &.isChecked {
    background: #222;
  }
}
</style>
