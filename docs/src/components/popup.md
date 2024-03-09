<script setup>
  import PopupDemo from '../../components/popup/PopupDemo.vue'
  import PopupClose from '../../components/popup/PopupClose.vue'
  import PopupBeforeClose from '../../components/popup/PopupBeforeClose.vue'
  import PopupSlots from '../../components/popup/PopupSlots.vue'
</script>

# Popup

<p></p>

<PopupDemo />


## No Close

If `noClose` is true popup won't be closed by clicking the underlay. and if `noCloseButton` is true the close button will not be shown.


<Demo>

:::code-group
<<< ../../components/popup/PopupClose.vue#template [template]
:::

<template #demo>
<PopupClose />
</template>

</Demo>


## beforeClose

`beforeClose` is called when clicking outside of popup (the underlay) or when clicking close button. it recieves the `done` function as it's first parameter and when it's called the popup will close.


<Demo>

:::code-group
<<< ../../components/popup/PopupBeforeClose.vue#template [template]
<<< ../../components/popup/PopupBeforeClose.vue#script{ts} [script]
:::

<template #demo>
<PopupBeforeClose />
</template>

</Demo>


## Custom Header & Footer

Header and Footer of the popup is customizable using `header` and `footer` named slot.

<Demo>

:::code-group
<<< ../../components/popup/PopupSlots.vue#template [template]
<<< ../../components/popup/PopupSlots.vue#style{scss} [style]
:::

<template #demo>
<PopupSlots />
</template>

</Demo>