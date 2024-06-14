import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";
export default defineConfig({
  mode: "production",
  build: {
    rollupOptions: {
      input: {
        axios: resolve(__dirname, "./package/index.ts"),
      },
    },
    lib: {
      formats: ["es", "umd"],
      entry: resolve(__dirname, "./utils/index.tsx"),
      name: "index",
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [
    dts({
      include: "./package",
    }),
  ],
});
