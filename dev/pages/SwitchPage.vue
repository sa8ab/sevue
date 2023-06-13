<template>
  <div class="center-it">
    <RSwitch v-model="checked" alternative square>
      <template #on> ON </template>
      <template #off> OFF </template>
    </RSwitch>
    <RSwitch v-model="active" value="1" color="green" alternative>
      Subscribe
      <template #circle>
        <div class="bx bx-envelope"></div>
      </template>
    </RSwitch>
    <RSwitch v-model="active" value="2" color="red">
      <template #on>123</template>
      <template #off>Subscribed 123</template>
    </RSwitch>
    <RSwitch v-model="active" value="3" />
    <RButton @click="active = []">Clean</RButton>
    <RButton @click="active = ['1', '2', '3']">Fill</RButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const active = ref([]);
const checked = ref(false);
</script>

<style lang="scss" scoped></style>
