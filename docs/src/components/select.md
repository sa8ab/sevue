<script setup>
  import SelectDemo from '../../components/select/SelectDemo.vue'
  import SelectDefault from '../../components/select/SelectDefault.vue'
  import SelectCustomOption from '../../components/select/SelectCustomOption.vue'
</script>

# Select

<p></p>

<SelectDemo />

## Default

`<RSelect />` is base component. It accepts `options` prop for rendering options. We need to identify id and text of each option to RSelect, so we pass in `getText` and `getValue` props which are functions, receiving option in first parameter and returning text and id or the option.

For instance, if we have an array like this:
```ts
const items = [
  { name: "Vue", id: 1 },
  { name: "React", id: 2 },
  { name: "Svelte", id: 3 },
  { name: "Nuxt", id: 4 },
  { name: "Node", id: 5 },
];
```

RSelect props will look like this `:options="items"`, `:getText="(option) => option.name"` and `:getValue="(option) => option.id"`


<Demo>

:::code-group
<<< ../../components/select/SelectDefault.vue#template [template]
<<< ../../components/select/SelectDefault.vue#script{ts} [script]
:::

<template #demo>
<SelectDefault />
</template>

</Demo>


## Custom Option

### Custom Option Text
You can override default rendering option and add your custom option using named `#option` slot. It receives your passed option and `isSelected` boolean which identifies if option is currently selected. It is still recomended to keep the `getText` prop because searching through elements is depending on that. Unless you provide your own custom search function.


<Demo>

:::code-group
<<< ../../components/select/SelectCustomOption.vue#template [template]
<<< ../../components/select/SelectCustomOption.vue#script{ts} [script]
:::

<template #demo>
<SelectCustomOption />
</template>

</Demo>



### Custom Option Template