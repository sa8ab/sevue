# Installation

1. Add `Sevue` to your project:

:::code-group
  ```bash [NPM]
  npm install sevue
  ```
  ```bash [Yarn]
  yarn add sevue
  ```
:::

2. Use `Sevue` in your app:

```js [src/main.ts]
import { createApp } from 'vue'
import Sevue from 'sevue'
import 'sevue/dist/style.css'

const app = createApp()
app.use(Sevue, {
  // options
})
```

For Nuxt JS add Sevue in a plugin

:::code-group
  ```js [plugins/sevue.ts]
  import Sevue from 'sevue'
  import 'sevue/dist/style.css'
  import { NuxtLink } from '#imports'
  
  export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Sevue, {
      nuxtOptions: {
        isNuxt: true,
        // will be used when `RButton` has `to` prop
        NuxtLink: NuxtLink
      }
      // options
    })
  })
  ```
:::