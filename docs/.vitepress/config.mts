import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Sevue",
  description: "Vue / Nuxt 3 UI Library",
  srcDir: "./src",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Documentation", link: "/guide/" },
    ],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Installation", link: "/guide/" },
          { text: "Customization", link: "/guide/customization" },
        ],
      },
      {
        text: "Components",
        items: [{ text: "Button", link: "/components/button" }],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/sa8ab/sevue" }],
  },
});
