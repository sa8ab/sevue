---
title: Tabs
description: "UI components for Vue JS and Nuxt JS | Sevue"
position: 6
category: "Components"
---

Component includes `RTab` and `RTabItem` components

## Default

<demo>
<template #demo>
<tabs-default></tabs-default>
</template>
<code-group>
<code-block label="Template" active>

```html
<RTab>
  <RTabItem title="Setting">
    User Settings Tab Content
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates autem
      debitis dolorem eveniet distinctio esse tenetur quis quod magni rerum!
    </p>
  </RTabItem>
  <RTabItem title="Favorites"> User Favorites Tab Content </RTabItem>
</RTab>
```

</code-block>
</code-group>
</demo>

## Fit

In order to make tabs take the full space of tab-bar, pass `flat` prop as `true`

<demo>
<template #demo>
<tabs-fit></tabs-fit>
</template>
<code-group>
<code-block label="Template" active>

```html
<RTab fit>
  <RTabItem title="Setting"> User Settings Tab Content </RTabItem>
  <RTabItem title="Favorites"> User Favorites Tab Content </RTabItem>
</RTab>
```

</code-block>
</code-group>
</demo>

## Icon

There are two ways of setting icons.

- You can set icon for tabs using `icon` prop on `<RTabIem />` component
- You can pass slot to `<RTab />` component in name of `icon-${index}` where index is same as index of item you are passing the icon two

<demo>
<template #demo>
<tabs-icon></tabs-icon>
</template>
<code-group>
<code-block label="Template" active>

```html
<RTab>
  <template #icon-2> <i class="bx bx-group"></i></template>
  <RTabItem title="Setting" icon="bx-desktop">
    User Settings Tab Content
  </RTabItem>
  <RTabItem title="Favorites" icon="bx-heart">
    User Favorites Tab Content
  </RTabItem>
  <RTabItem title="Groups"> Goups tab </RTabItem>
</RTab>
```

</code-block>
</code-group>
</demo>

## Only Icon

You can only show the icon of each item in the tabbar by setting `iconOnly` prop of RTab to `true`.

<alert type="warning">

You will still need to pass the `title` prop to each `RTabItem`.

</alert>

<demo>
<template #demo>
<tabs-icon-only></tabs-icon-only>
</template>
<code-group>
<code-block label="Template" active>

```html
<RTab iconOnly>
  <template #icon-2> <i class="bx bx-group"></i></template>
  <RTabItem title="Setting" icon="bx-desktop">
    User Settings Tab Content
  </RTabItem>
  <RTabItem title="Favorites" icon="bx-heart">
    User Favorites Tab Content
  </RTabItem>
  <RTabItem title="Groups"> Goups tab </RTabItem>
</RTab>
```

</code-block>
</code-group>
</demo>

## Scrollable

The `Scrollable` prop makes the tab-bar scroll when items overflow

<demo>
<template #demo>
<tabs-scrollable :bordered="true"></tabs-scrollable>
</template>
<code-group>
<code-block label="Template" active>

```html
<RTab scrollable>
  <RTabItem :title="`Item ${x} Title`" v-for="x in 8" :key="x">
    Tab {{ x }} Content
  </RTabItem>
</RTab>
```

</code-block>
</code-group>
</demo>

## Bordered

<demo>
<template #demo>
<tabs-default :bordered="true"></tabs-default>
</template>
<code-group>
<code-block label="Template" active>

```html
<RTab bordered>
  <RTabItem title="Setting">
    User Settings Tab Content
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates autem
      debitis dolorem eveniet distinctio esse tenetur quis quod magni rerum!
    </p>
  </RTabItem>
  <RTabItem title="Favorites"> User Favorites Tab Content </RTabItem>
</RTab>
```

</code-block>
</code-group>
</demo>

## Color

Available values are `prm`, `yellow`, `red`, `green`, any HEX or RGBA/RGB value.

<demo>
<template #demo>
<tabs-colors></tabs-colors>
</template>
<code-group>
<code-block label="Template" active>

```html
<RTab bordered color="red">
  <RTabItem title="Tab 1"> Some Content </RTabItem>
  <RTabItem title="Tab 2"> Second Some Content </RTabItem>
</RTab>
```

</code-block>
</code-group>
</demo>

## Mover Full Height

You can set make the mover have full height by setting `moverFull` prop to `true`

<demo>
<template #demo>
<tabs-colors :mover-full="true"></tabs-colors>
</template>
<code-group>
<code-block label="Template" active>

```html
<RTab moverFull color="red">
  <RTabItem title="Tab 1"> Some Content </RTabItem>
  <RTabItem title="Tab 2"> Second Some Content </RTabItem>
</RTab>
```

</code-block>
</code-group>
</demo>
