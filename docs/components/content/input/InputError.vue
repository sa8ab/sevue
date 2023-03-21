<template>
  <div class="doc-input">
    <RInput v-model="email" type="email" label="Email" :message="message" :error="hasError"/>
  </div>
</template>

<script lang="ts" setup>
const email = ref("")
const hasError = computed(() => !email.value)
const message = computed(() => hasError.value ? `Email Can't be empty` : '')
</script>
