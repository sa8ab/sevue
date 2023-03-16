---
title: Customization
description: "UI components for Vue JS and Nuxt JS"
position: 3
category: "Guide"
---

## Color

Default colors of Sevue are (rgb-b1 and rgb-b2 are backround colors):

```css
--rgb-prm: 0, 168, 255;
--rgb-red: 235, 59, 90;
--rgb-green: 38, 222, 129;
--rgb-yellow: 247, 159, 31;
--rgb-text: 18, 18, 18;
--rgb-b1: 246, 246, 246;
--rgb-b2: 255, 255, 255;

/* for dark theme under .dark class */
--rgb-text: 246, 246, 246;
--rgb-b1: 18, 18, 18;
--rgb-b2: 30, 30, 30;
```

which results in the folowing

<colors></colors>

### Using CSS

In order to customize the colors directly using css you can set your own colors in `rgb()` format without the parantheses nor rgb. for example the color `rgba(0, 168, 255)` should be used as `0, 168, 255`.

For Example:

```css
:root {
  --rgb-prm: 46, 204, 113;
  --rgb-red: 192, 57, 43;
  --rgb-text: 0, 0, 0;
}
.dark {
  --rgb-text: 255, 255, 255;
}
```

### Using JS

You can change the default colors using Javascipt by passing the options to Sevue
Accepted Formats are `HEX`, `RGBA` and `RGB`

```javascript
Vue.use(Sevue, {
  colors: {
    prm: "#1abc9c",
    red: "rgb(211, 84, 0)",
    green: "rgb(39, 174, 96)",
    red: "rgba(241, 196, 15, 1.0)",
  },
});
```

## Icons

### Boxicons

Sevue does not use any icon packs by default, if you don't set any icon prefix classname it will use `bx` which is for [boxicons](https://boxicons.com/). You will need to install it:

```bash
npm i boxicons
# or
# yarn add boxicons
```

And then import it:

```javascript
import "boxicons/css/boxicons.min.css";
```

### Using a different icon library

Sevue gives you the ability to set any other icon libraries you need. In order to configure the icon set, give `iconPrefix` to Sevue options when installing

```javascript
Vue.use(Sevue, {
    iconPrefix: 'fa'
  },
});
```

Then whenever you pass icons to the components like `RButton`, the rendered icon element will be `<i :class="['fa', icon] "></i>`

You can also pass an empty string if you don't want any prefixes.

## Disabling Ripple

The Ripple Effect is using [vue-material-design-ripple](https://github.com/partyka1/vue-material-design-ripple) directive.
You can disable Ripple Effect on Elements by setting `ripple: false` in options of Sevue

```javascript
Vue.use(Sevue, {
    ripple: false
  },
});
```
