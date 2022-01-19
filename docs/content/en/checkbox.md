---
title: Checkbox
description: "UI components for Vue JS and Nuxt JS | Sevue"
position: 8
category: "Components"
---

## Default

<demo>
<template #demo>
<checkbox-default></checkbox-default>
</template>
<code-group>
<code-block label="Template" active>

```html
<RCheckbox v-model="value">Default Checkbox</RCheckbox>
```

</code-block>
<code-block label="Script" >

```js
{
  data: () => ({
    value: false,
  }),
}
```

</code-block>
</code-group>
</demo>

## Array Value

<demo>
<template #demo>
<checkbox-array></checkbox-array>
</template>
<code-group>
<code-block label="Template" active>

```html
<RCheckbox
  v-model="selected"
  v-for="{ name, id } in list"
  :key="id"
  :val="name"
>
  {{ name }}
</RCheckbox>
```

</code-block>
<code-block label="Script" >

```js
data: () => ({
  selected: [],
  list: [
    { name: "Jack", id: 1 },
    { name: "James", id: 2 },
    { name: "Walter", id: 3 },
    { name: "Daniel", id: 4 },
  ],
}),
```

</code-block>
</code-group>
</demo>

## Color

<demo>
<template #demo>
<checkbox-color></checkbox-color>
</template>
<code-group>
<code-block label="Template" active>

```html
<RCheckbox
  v-model="selected"
  v-for="{ name, id, color } in list"
  :key="id"
  :val="name"
  :color="color"
>
  {{ name }}
</RCheckbox>
```

</code-block>
<code-block label="Script" >

```js
data: () => ({
  selected: [],
  list: [
    { name: "Red", id: 1, color: "red" },
    { name: "RGBA color", id: 2, color: "rgba(243, 104, 224, 1)" },
    { name: "Hex Value", id: 3, color: "#e67e22" },
    { name: "RGB color", id: 4, color: "rgb(22, 160, 133)" },
  ],
}),
```

</code-block>
</code-group>
</demo>
