---
title: Loading
description: "UI components for Vue JS and Nuxt JS | Sevue"
position: 11
category: "Components"
---

You can show loadings using `$r.loading()` function. The function returns an object containing the close method.

## Default

<demo>
<template #demo>
<loading-default></loading-default>
</template>
<code-group>
<code-block label="Template" active>

```html
<RButton @click="onClick">Show Loading</RButton>
```

</code-block>
<code-block label="Script">

```javascript
methods: {
  onClick() {
    const loading = this.$r.loading();
    setTimeout(() => {
      loading.close();
    }, 3000);
  },
},
```

</code-block>
</code-group>
</demo>

## Target

<demo>
<template #demo>
<loading-target></loading-target>
</template>
<code-group>
<code-block label="Template" active>

```html
<RButton
  @click="notification('bottom-right')"
  icon="bx-border-radius"
  class="r-br"
  iconOnlyAlt
  iconLarge
>
</RButton>
<RButton
  @click="notification('bottom-left')"
  icon="bx-border-radius"
  class="r-bl"
  iconOnlyAlt
  iconLarge
>
</RButton>
<RButton
  @click="notification('top-right')"
  icon="bx-border-radius"
  class="r-tr"
  iconOnlyAlt
  iconLarge
>
</RButton>
<RButton
  @click="notification('top-left')"
  icon="bx-border-radius"
  class="r-tl"
  iconOnlyAlt
  iconLarge
>
</RButton>
<RButton
  @click="notification('top')"
  icon="bx-border-top"
  iconOnlyAlt
  iconLarge
>
</RButton>
<RButton
  @click="notification('bottom')"
  icon="bx-border-bottom"
  iconOnlyAlt
  iconLarge
>
</RButton>
```

</code-block>
<code-block label="Script">

```javascript
methods: {
    notification(placement) {
      this.$r.notification({
        title: placement,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, adipisci!a",
        placement,
      });
    },
  }
```

</code-block>
</code-group>
</demo>

## Color & Text Color

You can change the color or the text color of the notification using `color`/`textColor` properties. Available values are `prm`, `red`, `green`, `yellow`, `HEX` or `RGB`/`RGBA` values.
`textColor` defaults to white (#fff).

<demo>
<template #demo>
<notification-color></notification-color>
</template>
<code-group>
<code-block label="Template" active>

```html
<RButton
  @click="notification('bottom-right', 'prm')"
  icon="bx-border-radius"
  class="r-br"
  iconOnlyAlt
  iconLarge
>
</RButton>
<RButton
  @click="notification('bottom-left', 'red')"
  icon="bx-border-radius"
  class="r-bl"
  iconOnlyAlt
  iconLarge
  color="red"
>
</RButton>
<RButton
  @click="notification('top-right', 'green')"
  icon="bx-border-radius"
  class="r-tr"
  iconOnlyAlt
  iconLarge
  color="green"
>
</RButton>
<RButton
  @click="notification('top-left', 'yellow')"
  icon="bx-border-radius"
  class="r-tl"
  iconOnlyAlt
  iconLarge
  color="yellow"
>
</RButton>
<RButton
  @click="notification('top', '#d35400')"
  icon="bx-border-top"
  iconOnlyAlt
  iconLarge
  color="#d35400"
>
</RButton>
<RButton
  @click="notification('bottom', 'rgba(52, 73, 94, 1.0)')"
  icon="bx-border-bottom"
  iconOnlyAlt
  iconLarge
  color="rgba(52, 73, 94, 1.0)"
>
</RButton>
```

</code-block>
<code-block label="Script">

```javascript
methods: {
    notification(placement, color) {
      this.$r.notification({
        title: color,
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, adipisci!a",
        placement,
        color,
      });
    },
  }
```

</code-block>
</code-group>
</demo>
