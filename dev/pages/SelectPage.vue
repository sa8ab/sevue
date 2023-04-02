<template>
  <div class="center-it">
    <div class="container">
      <RSelect v-model="selected" placeholder="Select Something" searchable multiple>
        <ROption v-for="x in 100" :value="x" :text="`item #${x}`"></ROption>
      </RSelect>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selected = ref([])
</script>


<style lang="scss" scoped>
.container {
  max-width: 280px;
}
</style>