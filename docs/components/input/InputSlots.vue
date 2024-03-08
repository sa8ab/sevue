<!-- #region template -->
<template>
  <div class="input-items">
    <RInput v-model="search" placeholder="Search..." label="Clearable Input">
      <template #after>
        <RButton iconOnly variant="transparent" color="red" @click="search = ''" v-if="!!search">
          <CloseIcon />
        </RButton>
        <RButton variant="transparent" iconOnly>
          <SearchIcon />
        </RButton>
      </template>
    </RInput>
    <RInput v-model="website" label="Website Address">
      <template #before>
        <div class="before">https://</div>
      </template>
    </RInput>
  </div>
</template>
<!-- #endregion template -->

<script lang="ts" setup>
import { ref } from "vue";
import SearchIcon from "../icons/SearchIcon.vue";
import CloseIcon from "../icons/CloseIcon.vue";
const search = ref("");
const website = ref("");
</script>

<style lang="scss">
.before {
  display: flex;
  align-items: center;
  padding: 0 var(--r-space-1);
  color: rgb(var(--r-disabled));
}
</style>
