<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Primitive, Label } from "../../src/main";

const demoRef = ref();

onMounted(() => {
  console.log(demoRef.value);
  console.log(demoRef.value.$el);
});
</script>

<template>
  <div class="playground">
    <Primitive asChild class="test-class">
      <section>Hello</section>
    </Primitive>
    <Label ref="demoRef">Some Label</Label>
  </div>
</template>

<style lang="scss" scoped>
.playground {
  padding: 10px;
}
</style>
