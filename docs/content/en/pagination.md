---
title: Pagination
description: "UI components for Vue JS and Nuxt JS | Sevue"
position: 11
category: "Components"
---

Pagination component `RPagination`

## Default

Prop of `count` is a Number defining the number of pages. RPagination takes v-model as the active page.

<demo>
<template #demo>
<pagination-default></pagination-default>
</template>
<code-group>
<code-block label="Template" active>

```html
<RPagination v-model="page" :count="10" />
```

</code-block>
<code-block label="JavaScript" active>

```js
data: () => ({
  page: 1,
}),
```

</code-block>
</code-group>
</demo>

## Visible items ( sideRange & mainRange )

You can specify how many items to be visible from start and end ( `sideRange` ) and around current page ( `mainRange` ).
default values are:

- sideRange: `2`
- mainRange: `1`

![count](pagination-count.png)

<demo>
<template #demo>
<pagination-range></pagination-range>
</template>
<code-group>
<code-block label="Template" active>

```html
<RPagination v-model="page" :count="10" :mainRange="0" :sideRange="1" />
```

</code-block>
<code-block label="JavaScript">

```js
data: () => ({
  page: 1,
}),
```

</code-block>
</code-group>
</demo>

## Custom Icons

You can pass custom icons instead of default ones using `prev` and `next` slots.

<demo>
<template #demo>
<pagination-icon></pagination-icon>
</template>
<code-group>
<code-block label="Template" active>

```html
<RPagination v-model="page" :count="10" :mainRange="0" :sideRange="1">
  <template #prev>
    <i class="bx bx-left-arrow-alt"></i>
  </template>
  <template #next>
    <i class="bx bx-right-arrow-alt"></i>
  </template>
</RPagination>
```

</code-block>
<code-block label="JavaScript">

```js
data: () => ({
  page: 1,
}),
```

</code-block>
</code-group>
</demo>

## Hide Navigation Icons

If `noNavigation` is set to `true` the navigation buttons will be hidden.

<demo>
<template #demo>
<pagination-no-navigation />
</template>
<code-group>
<code-block label="Template" active>

```html
<RPagination
  v-model="page"
  :count="10"
  :mainRange="0"
  :sideRange="1"
  noNavigation
>
</RPagination>
```

</code-block>
<code-block label="JavaScript">

```js
data: () => ({
  page: 1,
}),
```

</code-block>
</code-group>
</demo>

## Compact

`compact` props is `Boolean` which sets layouts navigation buttons bellow pagination

<demo>
<template #demo>
<pagination-compact />
</template>
<code-group>
<code-block label="Template" active>

```html
<RPagination v-model="page" :count="10" compact> </RPagination>
```

</code-block>
<code-block label="JavaScript">

```js
data: () => ({
  page: 1,
}),
```

</code-block>
</code-group>
</demo>

## Color & ActiveTextColor

You can set color for navigation and text color of active item using `color` and `activeTextColor`.
Available values are `prm`, `yellow`, `red`, `green`, any HEX or RGBA/RGB value.

<demo>
<template #demo>
<pagination-color />
</template>
<code-group>
<code-block label="Template" active>

```html
<RPagination :count="10" v-model="page1" color="red" />
<RPagination :count="5" v-model="page2" color="#F5853F" />
<RPagination :count="30" v-model="page3" color="#32E875" />
<RPagination
  :count="14"
  v-model="page4"
  color="rgb(68, 207, 203)"
  class="fourth"
  activeTextColor="#000"
/>
```

</code-block>
<code-block label="JavaScript">

```js
data: () => ({
  page1: 1,
  page2: 3,
  page3: 5,
  page4: 2,
}),
```

</code-block>
</code-group>
</demo>

## Disabled

<demo>
<template #demo>
<pagination-disabled />
</template>
<code-group>
<code-block label="Template" active>

```html
<RButton @click="disabled = !disabled"
  >{{ disabled ? "enable" : "disable" }}</RButton
>
<RPagination v-model="page" :count="10" :mainRange="0" :disabled="disabled" />
```

</code-block>
<code-block label="JavaScript">

```js
data: () => ({
  page: 1,
  disabled: true,
}),
```

</code-block>
</code-group>
</demo>
