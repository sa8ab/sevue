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
<div class="actions">
  <RButton @click="loadingOnButton" fill ref="targetButton" class="button">
    On Button
  </RButton>
  <RButton @click="loadingOnContainer">On Container</RButton>
</div>
<div class="target-container">Target for loading</div>
```

</code-block>
<code-block label="Script">

```javascript
methods: {
  loadingOnButton() {
    const loading = this.$r.loading({
      target: this.$refs.targetButton,
      scale: 0.6,
    });
    setTimeout(() => {
      loading.close();
    }, 3000);
  },
  loadingOnContainer() {
    const loading = this.$r.loading({
      target: ".target-container",
    });
    setTimeout(() => {
      loading.close();
    }, 3000);
  },
},
```

</code-block>
</code-group>
</demo>

## Background & Color

You can change the background or color of the loading using `color`/`backround` properties. Available values are `prm`, `red`, `green`, `yellow`, `HEX` or any `RGB`/`RGBA` values.

<demo>
<template #demo>
<loading-color></loading-color>
</template>
<code-group>
<code-block label="Template" active>

```html
<RButton @click="prmBackground">Loading</RButton>
<RButton @click="hexBackground">HEX Background</RButton>
<RButton @click="hexColor">HEX Color</RButton>
```

</code-block>
<code-block label="Script">

```javascript
methods: {
  prmBackground() {
    const loading = this.$r.loading({
      background: "prm",
      color: "#fff",
    });
    setTimeout(() => {
      loading.close();
    }, 2500);
  },
  hexBackground() {
    const loading = this.$r.loading({
      background: "#27ae60",
      color: "#fff",
    });
    setTimeout(() => {
      loading.close();
    }, 3000);
  },
  hexColor() {
    const loading = this.$r.loading({
      color: "#27ae60",
      text: "Loading #27ae60",
    });
    setTimeout(() => {
      loading.close();
    }, 3000);
  },
},
```

</code-block>
</code-group>
</demo>

## Text

You can set Text below spinner using `text` prop.

<demo>
<template #demo>
<loading-text></loading-text>
</template>
<code-group>
<code-block label="Template" active>

```html
<RButton @click="loading">Loading With Text</RButton>
```

</code-block>
<code-block label="Script">

```javascript
methods: {
  loading() {
    const loading = this.$r.loading({
      background: "prm",
      color: "#fff",
      text: "Please Wait...",
    });
    setTimeout(() => {
      loading.close();
    }, 2500);
  },
},
```

</code-block>
</code-group>
</demo>
