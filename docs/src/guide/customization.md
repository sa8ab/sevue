<script setup>
import Colors from '../../components/Colors.vue'
</script>

# Customization

## Default Theme

Default css variables ( `--r-b1` & `--r-b2` are background colors ):


```scss
:root {
  // colors
  --r-prm: 0, 168, 255;
  --r-primary-foreground: 246, 246, 246;
  --r-alternative: 247, 159, 31;
  --r-alternative-foreground: 246, 246, 246;
  --r-red: 235, 59, 90;
  --r-red-foreground: 246, 246, 246;
  --r-green: 38, 222, 129;
  --r-green-foreground: 246, 246, 246;
  --r-yellow: 247, 159, 31;
  --r-yellow-foreground: 18, 18, 18;
  --r-gray: 249, 250, 251;
  --r-b1: 246, 246, 246;
  --r-b2: 255, 255, 255;
  --r-text: 18, 18, 18;
  --r-disabled: 96, 96, 96;
  --r-hover: 140, 140, 140;
  --r-border-color: 60, 60, 60;
  --r-shadow-color: 140, 140, 140;

  --r-radius: 6px;
  --r-radius-2: 14px;
  --r-space-1: 4px;
  --r-space-2: 8px;
  --r-space-3: 14px;
  --r-space-4: 22px;
  --r-space-5: 38px;
  --r-normal-padding-y: 8px;
  --r-normal-padding-x: 12px;
  --r-normal-padding: var(--r-normal-padding-y) var(--r-normal-padding-x);
  --r-font-large: 1.18rem;
  --r-font-xlarge: 1.25rem;
  --r-font-small: 0.86rem;
  --r-font-xsmall: 0.74rem;

  --r-element-small-height: 28px;
  --r-element-default-height: 36px;
  --r-element-large-height: 40px;

  --r-element-min-height: 32px;

  // shadows & borders
  --r-border-width: 1px;
  --r-hover-alpha: 0.3;
  --r-shadow-alpha: 0.2;
  --r-disabled-alpha: 0.8;
  --r-duration: 0.2s;
  --r-light-alpha: 0.2;
  --r-info-alpha: 0.8;
  --r-disabled-alpha: 0.8;
  --r-border-alpha: 0.2;
  --r-border-active-alpha: 0.4;
  --r-focused-box-shadow-specs: 0px 0px 0px 2px;

  --r-popup-underlay-opacity: 0.2;
  --r-loading-background-opacity: 0.6;
}

.dark {
  --r-gray: 22, 27, 33;
  --r-b1: 18, 18, 18;
  --r-b2: 30, 30, 30;
  --r-text: 246, 246, 246;
  --r-disabled: 116, 125, 140;
  --r-hover: 180, 180, 180;
  --r-border-color: 200, 200, 200;
  --r-shadow-color: 40, 40, 40;

  --r-popup-underlay-opacity: 0.5;
}

```

<Colors />


## Custom Theme


### CSS

To use your own theme you need to override the default theme colors provided by sevue, this can happen by setting your own css variables in `:root` or any parent element. The syntax should be `rgb` color without parantheses nor rgb. For example the color `rgba(0, 168, 255)` should be used as `0, 168, 255`.

```css
:root {
  --r-prm: 46, 204, 113;
  --r-red: 192, 57, 43;
  --r-text: 0, 0, 0;
}
.dark {
  --r-text: 255, 255, 255;
}
```


## Disabling Ripple Effect

The Ripple Effect is using internal version of [vue-material-design-ripple](https://github.com/partyka1/vue-material-design-ripple) directive.
You can disable by setting `ripple: false` in options.

```ts
app.use(Sevue, {
    ripple: false
  },
});
```