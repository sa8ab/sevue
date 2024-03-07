<template>
  <div class="input-items">
    <!-- #region template -->
    <RInput v-model="name" placeholder="Please enter your name" label="Name" hint="Optional" />
    <RInput v-model="name" placeholder="Error Input" errorMessage="Can't leave empty" label="Name" />
    <RInput v-model="name" placeholder="Green Color" icon="bx-user-circle" color="green" label="Name" />
    <!-- #endregion template -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const name = ref("");
</script>
