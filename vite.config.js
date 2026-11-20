import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    allowedHosts: [
      "localhost",
      "192.168.0.31",
      "100.69.132.35",
      "oh-my-arch.taild74bda.ts.net",
    ],
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001/",
        changeOrigin: true,
      },
    },
  },
});
