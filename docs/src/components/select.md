<script setup>
  import SelectDemo from '../../components/select/SelectDemo.vue'
  import SelectDefault from '../../components/select/SelectDefault.vue'
  import SelectCustomOption from '../../components/select/SelectCustomOption.vue'
  import SelectCustomOptionContent from '../../components/select/SelectCustomOptionContent.vue'
  import SelectMultiple from '../../components/select/SelectMultiple.vue'
  import SelectDisabled from '../../components/select/SelectDisabled.vue'
  import SelectGroup from '../../components/select/SelectGroup.vue'
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

### Custom Option Content

You can also override the whole option including its container using `#option-content` slot. Meaning you would have to handle clicks, active state, and all the events being passed down to it.
Here is the value of slot being passed.

```ts
{
  text?: string,
  disabled?: boolean,
  isFocused: boolean,
  isSelected: boolean,
  isLastActive: boolean,
  color?: string,
  onClick: () => void,
  onMouseover: () => void,
}
```

<Demo>

:::code-group
<<< ../../components/select/SelectCustomOptionContent.vue#template [template]
<<< ../../components/select/SelectCustomOptionContent.vue#script{ts} [script]
:::

<template #demo>
<SelectCustomOptionContent />
</template>

</Demo>


## Multiple

Using `multiple` prop users can select multiple options. It's recommended but not necessary to pass initial value of v-model as array.
To prevent closing of dropdown after each selection, you can use `closeAfterSelection` boolean prop.


<Demo>

:::code-group
<<< ../../components/select/SelectMultiple.vue#template{4,5} [template]
<<< ../../components/select/SelectMultiple.vue#script{ts} [script]
:::

<template #demo>
<SelectMultiple />
</template>

</Demo>


## Disabled

`disabled` prop can be passed to `RSelect` to disable the whole select.
If you want to disable some options, use `:getIsDisabled` prop.


<Demo>

:::code-group
<<< ../../components/select/SelectDisabled.vue#template{5,17} [template]
<<< ../../components/select/SelectDisabled.vue#script{ts} [script]
:::

<template #demo>
<SelectDisabled />
</template>

</Demo>

## Group

To show the items in goups, `groupedOptions` is used instead of `options`. Another required props when using groups are `getGroupOptions` and `getGroupTitle`, which is a similar syntax to `getText` which this one returns the options and title in each group.


<Demo>

:::code-group
<<< ../../components/select/SelectGroup.vue#template [template]
<<< ../../components/select/SelectGroup.vue#script{ts} [script]
:::

<template #demo>
<SelectGroup />
</template>

</Demo>

## Empty slots

`#option-empty` named slot will be shown when there is some search but no items are found. receives `search` slot prop which is the currently searched query. Defaults to:
```vue
<span>"{{ search }}" Not found</span>
```

`#empty` slot will be shown when there are no items. Defaults to:
```vue
<span>No Options</span>
```

## Creating options

Feature will be added soon.

## Vitrual List

Feature will be added soon.


## State

Refer to [Input State](/components/input#states)

## Props

## Props

| Name                    | Type                                       | Required | Default Value                             | Description                                                                                                                                             |
| ----------------------- | ------------------------------------------ | -------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| searchable              | boolean                                    | No       | false                                     | If true, allows users to search for and select options from a dropdown menu.                                                                            |
| multiple                | boolean                                    | No       | false                                     | If true, allows users to select multiple options from the dropdown menu.                                                                                |
| modelValue              | array \| number \| string                  | Yes      | undefined                                 | The selected value(s) of the dropdown menu.                  |
| placeholder             | string                                     | No       | ""                                        | The text displayed inside the dropdown menu when no options are selected.                                                                               |
| disabled                | boolean                                    | No       | false                                     | If true, disables the dropdown menu.                                                                                                                    |
| label                   | string                                     | No       | undefined                                 | The label displayed above the dropdown menu.                                                                                                            |
| closeAfterSelection    | boolean                                    | No       | true                                     | If true, closes the dropdown menu after a selection has been made.                                                                                  |
| color                   | string                                     | No       | undefined                                 | The color of the Select.                                                                                                                                |
| error                   | boolean                                    | No       | false                                     | If true, adds error styling.                                                                                                                            |
| message                 | string                                     | No       | undefined                                 | The message displayed below the dropdown menu.                                                                                                          |
| errorMessage            | string                                     | No       | undefined                                 | The errorMessage displayed below the dropdown menu.                                                                                                          |
| inputProps              | object of any                              | No       | undefined                                 | Props to pass down to input                                                                                                                             |
| showDropdownOnEmptySearch | boolean                                    | No       | true                                 | When search value is empty dropdown will not show (or hide of it is was open)                                                                           |
| noDropdown              | boolean                                    | No       | undefined                                 | whether do show a dropdown or not. can be usefull when user can create options by itself                                                                |
| loading                 | boolean                                    | No       | undefined                                 | Loading state on select ( shows a spinner instead of chevron )                                                                                          |
| customSearch            | (search?: string, option: Option) => boolean    | No       | undefined                                 | called for each item and filters the list based on returned boolean                                 |
| options                   | any\[]                                     | No       | undefined                                 | options of select                                                                                      |
| getText         | (option: Option) => string                                     | No       | undefined                                     | returns text of each item                                  |
| getValue         | (option: Option) => string                                     | No       | undefined                                     | returns value of each item                                  |
| getIsDisabled         | (option: Option) => boolean                                     | No       | undefined                                     | returns if option is disabled                                  |
| groupedOptions         |  any\[]                                     | No       | undefined                                     | will be used instead of options if grouped items are being used                                  |
| getGroupOptions         |   (group: Group) => Option                                       | No       | undefined                                     | Returns options of each group                                  |
| getGroupTitle         |   (group: Group) => string                                       | No       | undefined                                     | Returns title of each group                                  |
| dropdownClass           | string                 | No       | undefined                                 | extra classes to pass down to dropdown ( since it's rendered on body you need to specify global styles for it. )                   |
