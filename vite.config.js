import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    open: true,
  },
  // Add public directory config to handle images
  publicDir: "public",
  // Add asset handling
  assetsInclude: ["**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.svg"],
});
