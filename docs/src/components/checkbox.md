<script setup>
  import CheckboxDemo from '../../components/checkbox/CheckboxDemo.vue'
  import CheckboxArray from '../../components/checkbox/CheckboxArray.vue'
</script>

# Checkbox

<p></p>

<CheckboxDemo />


## Array Selection

`RCheckbox` works same as native checkbox. In order to have multiple selected items in an array, set initial value for `v-model` as `array` type.

<Demo>

:::code-group
<<< ../../components/checkbox/CheckboxArray.vue#template [template]
<<< ../../components/checkbox/CheckboxArray.vue#script{ts} [script]
:::

<template #demo>
<CheckboxArray />
</template>

</Demo>