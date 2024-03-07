import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import "../styles/doc-style.scss";

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app }) => {},
} satisfies Theme;
