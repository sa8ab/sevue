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


## Only Icon

`iconOnly` sets same size on width and height of the element.

<Demo>

:::code-group

```vue
<RButton iconOnly>
  your icon here
</RButton>
```

:::

<template #demo>
  <RButton iconOnly>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path opacity="0.4" d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19Z" fill="currentColor"/>
      <path d="M12 22.96C11.45 22.96 11 22.55 11 22V21.92C11 21.37 11.45 20.92 12 20.92C12.55 20.92 13 21.37 13 21.92C13 22.47 12.55 22.96 12 22.96ZM19.14 20.14C18.88 20.14 18.63 20.04 18.43 19.85L18.3 19.72C17.91 19.33 17.91 18.7 18.3 18.31C18.69 17.92 19.32 17.92 19.71 18.31L19.84 18.44C20.23 18.83 20.23 19.46 19.84 19.85C19.65 20.04 19.4 20.14 19.14 20.14ZM4.86 20.14C4.6 20.14 4.35 20.04 4.15 19.85C3.76 19.46 3.76 18.83 4.15 18.44L4.28 18.31C4.67 17.92 5.3 17.92 5.69 18.31C6.08 18.7 6.08 19.33 5.69 19.72L5.56 19.85C5.37 20.04 5.11 20.14 4.86 20.14ZM22 13H21.92C21.37 13 20.92 12.55 20.92 12C20.92 11.45 21.37 11 21.92 11C22.47 11 22.96 11.45 22.96 12C22.96 12.55 22.55 13 22 13ZM2.08 13H2C1.45 13 1 12.55 1 12C1 11.45 1.45 11 2 11C2.55 11 3.04 11.45 3.04 12C3.04 12.55 2.63 13 2.08 13ZM19.01 5.99C18.75 5.99 18.5 5.89 18.3 5.7C17.91 5.31 17.91 4.68 18.3 4.29L18.43 4.16C18.82 3.77 19.45 3.77 19.84 4.16C20.23 4.55 20.23 5.18 19.84 5.57L19.71 5.7C19.52 5.89 19.27 5.99 19.01 5.99ZM4.99 5.99C4.73 5.99 4.48 5.89 4.28 5.7L4.15 5.56C3.76 5.17 3.76 4.54 4.15 4.15C4.54 3.76 5.17 3.76 5.56 4.15L5.69 4.28C6.08 4.67 6.08 5.3 5.69 5.69C5.5 5.89 5.24 5.99 4.99 5.99ZM12 3.04C11.45 3.04 11 2.63 11 2.08V2C11 1.45 11.45 1 12 1C12.55 1 13 1.45 13 2C13 2.55 12.55 3.04 12 3.04Z" fill="currentColor"/>
    </svg>
  </RButton>
</template>

</Demo>