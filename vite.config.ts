import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import DefineOptions from "unplugin-vue-define-options/vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    DefineOptions(),
    {
      ...dts({
        skipDiagnostics: false,
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
});


// tsconfigOverride: {
//   compilerOptions: {
//     outDir: "dist",
//     sourceMap: true,
//     declaration: true,
//     declarationMap: true,
//   },
// },