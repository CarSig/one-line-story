/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@data": resolve(__dirname, "src/data"),
      "@pages": resolve(__dirname, "src/pages"),
      "@context": resolve(__dirname, "src/context"),
      "@templates": resolve(__dirname, "src/templates"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@config": resolve(__dirname, "src/config.js"),
      "@assets": resolve(__dirname, "src/assets"),
    },
  },
  server: {
    port: 3001,
    proxy: {
      "/socket.io": {
        target: "http://localhost:4444",
        // target: process.env.SERVER_URL,
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
