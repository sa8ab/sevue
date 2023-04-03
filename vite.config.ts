import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
// @ts-ignore
import DefineOptions from "unplugin-vue-define-options/vite";
import Components from 'unplugin-vue-components/vite'
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import ViteSVGLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    ViteSVGLoader(),
    {
      ...Components({
        dts: './dist/components.d.ts',
        resolvers: [
          (componentName) => {
            return { name: componentName, from: './src/components' }
          }
        ]
      }),
      name: "build-only",
      apply: "build",
    },
    {
      ...dts({
        skipDiagnostics: true,
        entryRoot: './src',
        copyDtsFiles: true
      }),
      name: "build-only",
      apply: "build",
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
  server: {
    port: 4000
  }
});