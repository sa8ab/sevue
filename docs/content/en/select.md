---
title: Select
description: "UI components for Vue JS and Nuxt JS | Sevue"
position: 9
category: "Components"
---

Consist of three components:

- RSelect - As parent component
- ROption - As options of the select component
- RSelectGroup - Used for grouping the options

## Default

<demo>
<template #demo>
<select-default></select-default>
</template>
<code-group>
<code-block label="Template" active>

```html
<div class="flex justify-center">
  <RSelect v-model="selected" placeholder="Select An Option">
    <ROption v-for="{ id, name } in items" :key="id" :text="name" :value="id" />
  </RSelect>
</div>
<pre>selected id: {{ selected }}</pre>
```

</code-block>
<code-block label="Script" >

```js
data: () => ({
  selected: null,
  items: [
    { name: "Vue", id: 1 },
    { name: "React", id: 2 },
    { name: "Svelte", id: 3 },
    { name: "Nuxt", id: 4 },
    { name: "Node", id: 5 },
  ],
}),
```

</code-block>
</code-group>
</demo>

## Label & Placeholder

You can pass `label` ond/or `placeholder` props to `RSelect`.

<demo>
<template #demo>
<select-label></select-label>
</template>
<code-group>
<code-block label="Template" active>

```html
<RSelect v-model="selected" placeholder="Select An Option" label="Label">
  <ROption v-for="{ id, name } in items" :key="id" :text="name" :value="id" />
</RSelect>
```

</code-block>
<code-block label="Script" >

```js
data: () => ({
  selected: null,
  items: [
    { name: "Vue", id: 1 },
    { name: "React", id: 2 },
    { name: "Svelte", id: 3 },
    { name: "Nuxt", id: 4 },
    { name: "Node", id: 5 },
  ],
}),
```

</code-block>
</code-group>
</demo>

## Color

Available values are `prm`, `yellow`, `red`, `green`, any HEX or RGBA/RGB value.

<demo>
<template #demo>
<select-color></select-color>
</template>
<code-group>
<code-block label="Template" active>

```html
<RSelect
  v-model="selected"
  placeholder="Select An Option"
  label="Red"
  color="red"
>
  <ROption v-for="{ id, name } in items" :key="id" :text="name" :value="id" />
</RSelect>
<RSelect
  v-model="selected"
  placeholder="Select An Option"
  label="RGB"
  color="rgb(1, 163, 164)"
>
  <ROption v-for="{ id, name } in items" :key="id" :text="name" :value="id" />
</RSelect>
<RSelect
  v-model="selected"
  placeholder="Select An Option"
  label="Custom"
  color="#f368e0"
>
  <ROption v-for="{ id, name } in items" :key="id" :text="name" :value="id" />
</RSelect>
```

</code-block>
<code-block label="Script" >

```js
data: () => ({
  selected: null,
  items: [
    { name: "Vue", id: 1 },
    { name: "React", id: 2 },
    { name: "Svelte", id: 3 },
    { name: "Nuxt", id: 4 },
    { name: "Node", id: 5 },
  ],
}),
```

</code-block>
</code-group>
</demo>

## Searchable (Autocomplete)

You can make the Select box seachable using `searchable` prop

<demo>
<template #demo>
<select-searchable></select-searchable>
</template>
<code-group>
<code-block label="Template" active>

```html
<RSelect
  v-model="selected"
  placeholder="Select An Option"
  label="Autocompletable"
  searchable
>
  <ROption v-for="{ id, name } in items" :key="id" :text="name" :value="id" />
</RSelect>
```

</code-block>
<code-block label="Script" >

```js
data: () => ({
  selected: null,
  items: [
    { name: "Manager", id: 1 },
    { name: "CEO", id: 2 },
    { name: "Partner", id: 3 },
    { name: "Developer", id: 4 },
  ],
}),
```

</code-block>
</code-group>
</demo>

## Grouped

You can group items into different sections using `RSelectGroup` component and `ROption` as children of it.

<demo>
<template #demo>
<select-grouped></select-grouped>
</template>
<code-group>
<code-block label="Template" active>

```html
<RSelect
  v-model="selected"
  placeholder="Select An Option"
  label="Grouped Options"
  searchable
>
  <RSelectGroup v-for="{ cities, name } in items" :key="name" :title="name">
    <ROption
      v-for="city in cities"
      :key="city.id"
      :text="city.name"
      :value="city.id"
    />
  </RSelectGroup>
</RSelect>
```

</code-block>
<code-block label="Script" >

```js
data: () => ({
  selected: null,
  items: [
    {
      name: "Greece",
      cities: [
        { name: "Athens", id: 1 },
        { name: "Patras", id: 2 },
        { name: "Larissa", id: 3 },
      ],
    },
    {
      name: "Russia",
      cities: [
        { name: "Moscow", id: 4 },
        { name: "Yekaterinburg", id: 5 },
        { name: "Kazan", id: 6 },
        { name: "Samara", id: 7 },
      ],
    },
    {
      name: "UAE",
      cities: [
        { name: "Dubai", id: 8 },
        { name: "Abu Dhabi", id: 9 },
      ],
    },
  ],
  }),
```

</code-block>
</code-group>
</demo>
