import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import DefineOptions from "unplugin-vue-define-options/vite";
import vue from "@vitejs/plugin-vue";
import typescript2 from "rollup-plugin-typescript2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    {
      ...typescript2({
        check: false,
        include: [
          "src/components/**/*.vue",
          "src/components/*.vue",
          "src/composables/**",
          "src/directives/**",
          "src/main.ts",
          "src/utils/**",
        ],
        tsconfigOverride: {
          compilerOptions: {
            outDir: "dist",
            sourceMap: true,
            declaration: true,
            declarationMap: true,
          },
        },
        exclude: ["vite.config.ts"],
      }),
      name: "build-only",
      apply: "build", // or 'serve'
    },
  ],
  build: {
    lib: {
      entry: "src/main.ts",
      name: "sevue",
      fileName: (format) => `sevue.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: { globals: { vue: "Vue" } },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:math";
          @import "./src/styles/variables.scss";
        `,
      },
    },
  },
});
