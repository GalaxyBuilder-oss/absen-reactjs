import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    define: {},
    server: {
      host: "0.0.0.0",
      port: 3000,
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});
