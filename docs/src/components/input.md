<script setup>
  import InputDemo from '../../components/input/InputDemo.vue'
  import InputDefault from '../../components/input/InputDefault.vue'
  import InputLabel from '../../components/input/InputLabel.vue'
  import InputSlots from '../../components/input/InputSlots.vue'
  import InputError from '../../components/input/InputError.vue'
  import InputColor from '../../components/input/InputColor.vue'
</script>

# Input

<p></p>

<InputDemo />

## Default

<Demo>

:::code-group
<<< ../../components/input/InputDefault.vue#template [template]
<<< ../../components/input/InputDefault.vue#script{ts} [script]
:::


<template #demo>
<InputDefault />
</template>
</Demo>


## Events and attrs

All HTML `input` events and attrs can be used. for example `type="password"`:
<RInput type="password" placeholder="Password" />


## Label and Hint

`label` is used as html `<label />` for the input. If you provide `id` prop it will be also passed to `for` attribute on the label
`hint` props can be string to indicate further information on the input.

You can also provide custom content on label and hint using named `#label` and `#hint` slots


<Demo>

:::code-group
<<< ../../components/input/InputLabel.vue#template [template]
:::


<template #demo>
<InputLabel />
</template>
</Demo>


## Before & After

RInput supports before and after slots for rendering custom template beside input element


<Demo>

:::code-group
<<< ../../components/input/InputSlots.vue#template{4,11,14,16} [template]
:::


<template #demo>
  <InputSlots />
</template>
</Demo>


## States

You can modify state of input using boolean props of `error` ( boolean ) or `errorMessage` ( string ). Either of them will override the color of input to red. You can also provide custom template in named `#errorMessage` slot.


<Demo>

:::code-group
<<< ../../components/input/InputError.vue#template [template]
<<< ../../components/input/InputError.vue#script{ts} [script]
:::


<template #demo>
  <InputError />
</template>
</Demo>


## Color

Available values are `prm`, `yellow`, `red`, `green`, any HEX or RGBA/RGB value.

<Demo>

:::code-group
<<< ../../components/input/InputColor.vue#template [template]
:::

<template #demo>
  <InputColor />
</template>
</Demo>



## Props
| Name            | Type    | Required | Default Value | Description                                                                        |
| --------------- | ------- | -------- | ------------- | ---------------------------------------------------------------------------------- |
| modelValue      | string  | No       | undefined     | The value of the input element.                                                    |
| label           | string  | No       | undefined     | The label displayed above the input element.                                       |
| hint            | string  | No       | undefined     | The hint displayed above the input element.                                       |
| placeholder     | string  | No       | undefined     | The text displayed inside the input element before the user types anything.        |
| message         | string  | No       | undefined     | The message displayed below the input element.                                     |
| sharp           | boolean | No       | false         | If true, adds sharp corners to the input element.                                |
| color           | string  | No       | undefined     | The color of the input element.                                                    |
| disabled        | boolean | No       | false         | If true, disables the input element.                                             |
| error           | boolean | No       | false         | If true, adds error styling to the input element.                                |
| errorMessage    | string  | No       | undefined     | Shows error message.                                |
| containerClass  | string  | No       | undefined     | Additional class name(s) to apply to the container element of the input component. |
| textarea  | boolean  | No       | undefined     | renders a textarea instead of input. |
