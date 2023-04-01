<template>
  <div class="center-it">
    <RSelect v-model="selected">
      <ROption v-for="x in 10" :value="x" text="x"></ROption>
    </RSelect>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref('')
</script>