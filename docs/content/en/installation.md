---
title: Installation
description: ""
position: 2
category: Guide
---

<!-- Check the [Nuxt.js documentation](https://nuxtjs.org/guides/configuration-glossary/configuration-modules) for more information about installing and using modules in Nuxt.js. -->

<!-- ## Installation -->

Add `sevue` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

```bash
yarn add sevue
```

  </code-block>
  <code-block label="NPM">

```bash
npm install sevue
```

  </code-block>
</code-group>

Then, add `sevue` to your app

```js
import Vue from "vue";
import Sevue from "sevue";
import "sevue/dist/sevue.css";

Vue.use(Sevue);
```

## Nuxt JS

Add the plugin in plugins directory

```js [plugins/sevue.js]
import Vue from "vue";
import Sevue from "sevue";
import "sevue/dist/sevue.css";

Vue.use(Sevue);
```

Add the plugin in `plugins` section of `nuxt.config.js`

```js [nuxt.config.js]
plugins: [
  // ...
  "@/plugins/sevue.js",
];
```
