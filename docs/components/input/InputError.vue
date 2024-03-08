<template>
  <div class="doc-input">
    <!-- #region template -->
    <RInput v-model="email" type="email" label="Email" :errorMessage="message" />
    <!-- #endregion template -->
  </div>
</template>

<script lang="ts" setup>
// #region script
import { ref, computed } from "vue";
const email = ref("");
const hasError = computed(() => !email.value);
const message = computed(() => (hasError.value ? `Email Can't be empty` : ""));
// #endregion script
</script>
