<template>
  <div class="center-it">
    {{ active }}
    <RSwitch v-model="active" value="1">
      <template #on>ON</template>
      <template #circle>
        <div class="bx bx-envelope"></div>
      </template>
    </RSwitch>
    <RSwitch v-model="active" value="2" />
    <RSwitch v-model="active" value="3" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const active = ref([]);
</script>

<style lang="scss" scoped></style>
