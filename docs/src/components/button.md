<script setup>
  import ButtonDemo from '../../components/button/ButtonDemo.vue'
  import ButtonDefault from '../../components/button/ButtonDefault.vue'
  import ButtonColors from '../../components/button/ButtonColors.vue'
  import ButtonTypes from '../../components/button/ButtonTypes.vue'
  import ButtonLoading from '../../components/button/ButtonLoading.vue'
</script>

# Button

<ButtonDemo />

## Default

<Demo>

:::code-group
  ```vue [template]
    <RButton>Default</RButton> 
  ```
:::

<template #demo>
  <ButtonDefault />
</template>

</Demo>


## Color

Available values are `prm`, `yellow`, `red`, `green`, any `HEX` or `RGBA/RGB` value.

<Demo>

:::code-group
  ```vue [template] 
    <RButton color="red">Red</RButton>
    <RButton color="yellow">Yellow</RButton> 
    <RButton>Default</RButton>
    <RButton color="green">Green</RButton> 
    <RButton color="#FC427B">HEX</RButton> 
    <RButton color="rgb(33, 140, 116)">RGB</RButton> 
  ```
:::

<template #demo>
  <ButtonColors />
</template>

</Demo>


## Types

You can change the variant of `RButton` by passing the `variant` prop. Supported values are `flat`, `fill`, `bordered` and `textStyle`.

<Demo>

:::code-group
<<< ../../components/button/ButtonTypes.vue#snippet [template]
:::

<template #demo>
  <ButtonTypes />
</template>

</Demo>


## Loading

You can set a loading over the button using boolean `loading` prop

<Demo>

:::code-group
<<< ../../components/button/ButtonLoading.vue#snippet [template]
<<< ../../components/button/ButtonLoading.vue#script{ts} [script]
:::

<template #demo>
  <ButtonLoading />
</template>

</Demo>
