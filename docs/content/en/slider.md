---
title: Slider
description: ""
position: 10
category: Components
---

## Default

Slider for selecting value(s) from given range. it requires `min` & `max` props and updates the given v-model.

<demo>
<template #demo>
  <slider-default></slider-default>
</template>
<code-group>
<code-block label="Template" active>

```html
<RSlider v-model="slider" :min="0" :max="100" />
```

</code-block>
<code-block label="Script">

```javascript
data: () => ({
  slider: 80,
}),
```

</code-block>
</code-group>
</demo>

## Step

With this prop value will move in steps instead of one by one. this can have decimals like `1.5`

<demo>
<template #demo>
  <slider-step :step="10"></slider-step>
</template>
<code-group>
<code-block label="Template" active>

```html
<RSlider v-model="slider" :min="0" :max="100" :step="10" />
```

</code-block>
<code-block label="Script" active>

```javascript
data: () => ({
  slider: 10,
}),
```

</code-block>
</code-group>
</demo>

With decimal values you need to pass `precision` prop which is the number of digits after point. for example for `0.50` it will be `2`

<demo>
<template #demo>
<slider-step :step="0.5" :precision="1"></slider-step>
</template>
<code-group>
<code-block label="Template" active>

```html
<RSlider v-model="slider" :min="0" :max="100" :step="0.5" :precision="1" />
```

</code-block>
<code-block label="Script" active>

```javascript
data: () => ({
  slider: 10,
}),
```

</code-block>
</code-group>
</demo>

## Range

You can pass Array as v-model in order to render range slider

<demo>
<template #demo>
  <slider-range :ticks="true" :tick-labels="true"></slider-range>
</template>
<code-group>
<code-block label="Template" active>

```html
<RSlider v-model="slider" :step="5" :min="0" :max="100" ticks />
```

</code-block>
<code-block label="Script">

```javascript
data: () => ({
  slider: [10, 40],
}),
```

</code-block>
</code-group>
</demo>

## Ticks & TickLabels

Shows ticks using `ticks` prop and its values using `tickLabels` prop.

<demo>
<template #demo>
  <slider-ticks :ticks="true" :tick-labels="true"></slider-ticks>
</template>
<code-group>
<code-block label="Template" active>

```html
<RSlider v-model="slider" :step="10" :min="0" :max="100" ticks tickLabels />
```

</code-block>
<code-block label="Script">

```javascript
data: () => ({
  slider: [20, 80],
}),
```

</code-block>
</code-group>
</demo>

## Tooltip

Setting `tooltip` prop to `true` renders a tooltip once the user starts dragging

<demo>
<template #demo>
  <slider-tooltip></slider-tooltip>
</template>
<code-group>
<code-block label="Template" active>

```html
<RSlider v-model="slider" :step="5" :min="0" :max="100" ticks tooltip>
</RSlider>
```

</code-block>
<code-block label="Script">

```javascript
data: () => ({
  slider: [10, 40],
}),
```

</code-block>
</code-group>
</demo>

You can set `alwaysTooltip` prop to `true` to always show the tooltip.

<demo>
<template #demo>
  <slider-tooltip :always-tooltip="true"></slider-tooltip>
</template>
<code-group>
<code-block label="Template" active>

```html
<RSlider
  v-model="slider"
  :step="5"
  :min="0"
  :max="100"
  ticks
  tooltip
  alwaysTooltip
>
  <template #tooltip="{ value }">{{ value }}</template>
</RSlider>
```

</code-block>
<code-block label="Script">

```javascript
data: () => ({
  slider: 10,
}),
```

</code-block>
</code-group>
</demo>

## Color

Available values are `prm`, `yellow`, `red`, `green`, any HEX or RGBA/RGB value.

<demo>
<template #demo>
  <slider-color ></slider-color>
</template>
<code-group>
<code-block label="Template" active>

```html
<RSlider v-model="slider1" :min="0" :max="10" color="green" ticks />
<RSlider v-model="slider2" :min="0" :max="10" color="red" ticks />
<RSlider v-model="slider3" :min="0" :max="10" color="#e056fd" ticks />
```

</code-block>
<code-block label="Script">

```javascript
data: () => ({
  slider1: [0, 4],
  slider2: 4,
  slider3: 8,
}),
```

</code-block>
</code-group>
</demo>
