import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@apis": path.resolve(__dirname, "./src/apis"),
      "@core": path.resolve(__dirname, "../../packages/core/src"),
    },
    dedupe: ["react", "react-dom", "styled-components"],
  },
});
