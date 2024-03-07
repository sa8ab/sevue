import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import Sevue from "sevue";
import "../styles/doc-style.scss";

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app }) => {
    app.use(Sevue);
  },
} satisfies Theme;
