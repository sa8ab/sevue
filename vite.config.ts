import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import typescript2 from "rollup-plugin-typescript2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    typescript2({
      check: false,
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      // include: ["src/components/**/*.vue", "src/components/*.vue"],
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
});
