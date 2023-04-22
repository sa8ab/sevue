<template>
  <div class="center-it">
    <RInput v-model="value" placeholder="input">
      <template #after>
        <div class="after">
          <RButton iconOnly icon="bx-search"></RButton>
        </div>
      </template>
    </RInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RInput } from "../../src/components";

const value = ref("");

const vFocus = {
  mounted: (el) => console.log(el),
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
