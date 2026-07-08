import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import flowbiteReact from "flowbite-react/plugin/vite";

console.log("PROXY TARGET:", process.env.VITE_API_PROXY);

export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],

  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_PROXY,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

});
