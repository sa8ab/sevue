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
