---
title: Popup
description: "UI components for Vue JS and Nuxt JS | Sevue"
position: 7
category: "Components"
---

## Default

<demo>
<template #demo>
<popup-default></popup-default>
</template>
<code-group>
<code-block label="Template" active>

```html
<RButton @click="openPopup">Open Popup</RButton>
<RPopup :active.sync="active" title="Popup Title">
  <p>Some Content On Popup 1</p>
  <p>Some Content On Popup 2</p>
  <p>Some Content On Popup 3</p>
</RPopup>
```

</code-block>
<code-block label="Script" >

```js
{
  data: () => ({
    active: false,
  }),
  methods: {
    openPopup() {
      this.active = true;
    },
  },
}
```

</code-block>
</code-group>
</demo>

## Footer

You can add footer do the popup using `footer` slot: `<template #footer></template>`

<demo>
<template #demo>
<popup-footer></popup-footer>
</template>
<code-group>
<code-block label="Template" active>

```html
<RButton @click="openPopup">Open Popup</RButton>
<RPopup :active.sync="active" title="Popup Title">
  <p>Some Content On Popup 1</p>
  <p>Some Content On Popup 2</p>
  <p>Some Content On Popup 3</p>
  <template #footer>
    <RButton @click="save" fill>Save</RButton>
    <RButton @click="active = false" noColor>Cancel</RButton>>
  </template>
</RPopup>
```

</code-block>
<code-block label="Script" >

```js
{
  data: () => ({
    active: false,
  }),
  methods: {
    openPopup() {
      this.active = true;
    },
    save() {
      this.$r.notification({
        title: "Save Clicked",
        text: "But nothing saved :D",
        color: "green",
      });
      this.active = false;
    },
  },
}
```

</code-block>
</code-group>
</demo>

## No Close

You can disable the closing of the popup by user using `noClose` prop.

<demo>
<template #demo>
<popup-noclose></popup-noclose>
</template>
<code-group>
<code-block label="Template" active>

```html
<RButton @click="openPopup">Open Popup</RButton>
<RPopup :active.sync="active" title="Popup Title" noClose>
  This Popup does not close if you click outside of it Because it has `noColor`
  prop set as `true`.
  <template #footer>
    <RButton @click="active = false" fill>Done</RButton>
  </template>
</RPopup>
```

</code-block>
<code-block label="Script" >

```js
{
  data: () => ({
    active: false,
  }),
  methods: {
    openPopup() {
      this.active = true;
    },
  },
}
```

</code-block>
</code-group>
</demo>

## Usage With Vuex

You can set the `active` prop as a dynamic value without `.sync` modifier and use `@close` event to close the popup programatically.

<code-group>
<code-block label="Template" active>

```html
<RButton @click="openPopup">Open Popup From Vuex</RButton>
<RPopup :active="active" @close="closePopup">
  <!-- content goes here -->
</RPopup>
```

</code-block>
<code-block label="Script" >

```js
{
  methods: {
    ...mapMutations({
      closePopup: 'CLOSE_POPUP',
      openPopup: 'OPEN_POPUP'
    })
  },
  computed:{
    ...mapGetters({
      active: 'popupActive'
    })
  }
}
```

</code-block>
</code-group>
