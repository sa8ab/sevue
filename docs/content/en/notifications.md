---
title: Notifications
description: "UI components for Vue JS and Nuxt JS | Sevue"
position: 3
category: "Components"
---

You can run notifications using `$r.notification()` function. the function accepts `title` and `text` properties.

## Default

<demo>
<template #demo>
<notification-default></notification-default>
</template>
<code-group>
<code-block label="Template" active>

```html
<RButton @click="onClick">Notification</RButton>
```

</code-block>
<code-block label="Script">

```javascript
methods: {
    onClick() {
      this.$r.notification({
        title: "Title for notification",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, adipisci!a",
      });
    },
  }
```

</code-block>
</code-group>
</demo>

## Placement

You can change the placement of the notification using `placement` property. Available values are:

- buttom-left <badge>default</badge>
- buttom-right
- top-left
- top-right
- bottom
- top

<demo>
<template #demo>
<notification-placement></notification-placement>
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

## Color

You can change the color of the notification using `color` property. Available values are `prm`, `red`, `green`, `yellow`, `HEX` or `RGB`/`RGBA` values.

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
