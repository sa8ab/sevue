---
title: Button
description: ""
position: 4
category: Components
---

## Default

<demo>
<template #demo>
    <button-default></button-default>
</template>
<code-group>
<code-block label="template" active>

```html
<RButton>Default</RButton>
```

</code-block>
</code-group>
</demo>

## Color

Available values are `prm`, `yellow`, `red`, `green`, any HEX or RGBA/RGB value.

<demo>
<template #demo>
<button-color></button-color>
</template>
<code-group>
<code-block label="template" active>

```html
<RButton color="red">Red</RButton>
<RButton color="yellow">Yellow</RButton>
<RButton color="prm">Default</RButton>
<RButton color="green">Green</RButton>
<RButton color="#FC427B">HEX</RButton>
<RButton color="rgb(33, 140, 116)">RGB</RButton>
```

</code-block>
</code-group>
</demo>

## Variants

You can change the look of the component by passing the boolean props of `flat`, `bordered`, `fill`& `noColor` or multiple ones at the same time.

<demo>
<template #demo>
<button-variant></button-variant>
</template>
<code-group>
<code-block label="template" active>

```html
<RButton flat>Flat</RButton>
<RButton bordered>Bordered</RButton>
<RButton flat bordered>Flat & Bordered</RButton>
<RButton fill>Filled Button</RButton>
<RButton noColor>No Color</RButton>
```

</code-block>
</code-group>
</demo>

## Icon

You can show an icon before or after button content with `icon` prop. In order to customize you own icon pack please refer to [icons section](/customization#icons).

`iconAfter` prop places the icon after the content of the button.

<demo>
<template #demo>
<button-icon></button-icon>
</template>
<code-group>
<code-block label="template" active>

```html
<RButton icon="bx-star" fill>Default</RButton>
<RButton icon="bx-heart" fill iconAfter>Icon After</RButton>
```

</code-block>
</code-group>
</demo>

## Icon Using Template

As an alternative you can pass the icon using slot named `icon` to the button component

<demo>
<template #demo>
<button-icon-template></button-icon-template>
</template>
<code-group>
<code-block label="template" active>

```html
<RButton fill>
  <template #icon> <i class="bx bxl-vuejs"></i></template>
  Icon Slot
</RButton>
<RButton fill iconAfter>
  <template #icon> <i class="bx bxs-hot"></i></template>
  Icon After
</RButton>
```

</code-block>
</code-group>
</demo>

## Only Icon

You can pass `iconOnly` prop to make the width if the button fit the icon

<demo>
<template #demo>
<button-icon-only></button-icon-only>
</template>
<code-group>
<code-block label="template" active>

```html
<RButton fill icon="bx-user" color="yellow" iconOnly></RButton>
<RButton icon="bx-star" color="yellow" iconOnly></RButton>
<RButton fill icon="bx-envelope" color="red" round iconOnly></RButton>
<RButton icon="" color="red" round iconOnly>
  <template #icon><i class="bx bx-bell"></i></template>
</RButton>
```

</code-block>
</code-group>
</demo>

## Routing

In order to render `router-link` or `nuxt-link` component use `to` prop as for normal component, for normal `a` tag use `href`. You can also pass `exact` if `to` is set, or `target` if `href` is set.

<demo>
<template #demo>
<button-routing></button-routing>
</template>
<code-group>
<code-block label="template" active>

```html
<RButton to="/">Local Routing</RButton>
<RButton href="https://www.youtube.com/watch?v=zRZEWi-X2aw">
  External Link
</RButton>
<RButton
  href="https://www.youtube.com"
  target="_blank"
  icon="bxs-right-top-arrow-circle"
  iconAfter
  fill
>
  In New Tab
</RButton>
```

</code-block>
</code-group>
</demo>
