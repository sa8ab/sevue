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

## Visible items ( sideCount & mainCount )

You can specify how many items to be visible from start and end ( `sideCount` ) and around current page ( `mainCount` )

## Icon

There are two ways of setting icons.

- You can set icon for tabs using `icon` prop on `<RTabIem />` component
- You can pass slot to `<RTab />` component in name of `icon-${index}` where index is same as index of item you are passing the icon two
