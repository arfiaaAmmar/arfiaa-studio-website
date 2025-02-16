import { defineConfig } from "vite";
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  server: {
    open: true,
  },
  // Add public directory config to handle images
  publicDir: "../public",
  // Add asset handling
  assetsInclude: ["**/*.jpg", "**/*.jpeg", "**/*.png", "**/*.svg"],
});
