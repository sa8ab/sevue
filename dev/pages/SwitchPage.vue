<template>
  <div class="container">
    <RSwitch v-model="checked" alternative square>
      <template #on> ON </template>
      <template #off> OFF </template>
    </RSwitch>
    <RSwitch v-model="active" value="1" color="green" alternative bordered ref="switchRef">
      Subscribe
      <template #circle>
        <div class="bx bx-envelope"></div>
      </template>
    </RSwitch>
    <RSwitch v-model="active" value="2" color="red" disabled>
      <template #on>123</template>
      <template #off>Subscribed 123</template>
    </RSwitch>
    <RSwitch v-model="active" value="3" />
    <RButton @click="active = []">Clean</RButton>
    <RButton @click="active = ['1', '2', '3']">Fill</RButton>
    <RButton @click="customFocus">Custom Focus</RButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const active = ref([]);
const checked = ref(false);
const switchRef = ref<HTMLInputElement | undefined>(undefined);

const customFocus = () => {
  switchRef.value.focus();
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 100vh;
  flex-wrap: wrap;
}
</style>
