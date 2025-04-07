// vite.config.ts
import { defineConfig } from "file:///Users/bal7hazar/git/arcade/node_modules/.pnpm/vite@5.4.14_@types+node@20.17.24/node_modules/vite/dist/node/index.js";
import wasm from "file:///Users/bal7hazar/git/arcade/node_modules/.pnpm/vite-plugin-wasm@3.4.1_vite@5.4.14_@types+node@20.17.24_/node_modules/vite-plugin-wasm/exports/import.mjs";
import react from "file:///Users/bal7hazar/git/arcade/node_modules/.pnpm/@vitejs+plugin-react-swc@3.8.1_@swc+helpers@0.5.15_vite@5.4.14_@types+node@20.17.24_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import topLevelAwait from "file:///Users/bal7hazar/git/arcade/node_modules/.pnpm/vite-plugin-top-level-await@1.5.0_@swc+helpers@0.5.15_rollup@4.36.0_vite@5.4.14_@types+node@20.17.24_/node_modules/vite-plugin-top-level-await/exports/import.mjs";
import process from "node:process";
import mkcert from "file:///Users/bal7hazar/git/arcade/node_modules/.pnpm/vite-plugin-mkcert@1.17.8_vite@5.4.14_@types+node@20.17.24_/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), wasm(), topLevelAwait(), mkcert()],
  server: {
    port: process.env.NODE_ENV === "development" ? 3003 : void 0,
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  root: "./",
  build: {
    outDir: "dist",
    // Ref: https://github.com/vitejs/vite/issues/15012#issuecomment-1948550039
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === "SOURCEMAP_ERROR") {
          return;
        }
        defaultHandler(warning);
      },
    },
  },
  publicDir: "public",
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYmFsN2hhemFyL2dpdC9hcmNhZGUvY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYmFsN2hhemFyL2dpdC9hcmNhZGUvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9iYWw3aGF6YXIvZ2l0L2FyY2FkZS9jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHdhc20gZnJvbSBcInZpdGUtcGx1Z2luLXdhc21cIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgdG9wTGV2ZWxBd2FpdCBmcm9tIFwidml0ZS1wbHVnaW4tdG9wLWxldmVsLWF3YWl0XCI7XG5pbXBvcnQgcHJvY2VzcyBmcm9tIFwibm9kZTpwcm9jZXNzXCI7XG5pbXBvcnQgbWtjZXJ0IGZyb20gXCJ2aXRlLXBsdWdpbi1ta2NlcnRcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCB3YXNtKCksIHRvcExldmVsQXdhaXQoKSwgbWtjZXJ0KCldLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJkZXZlbG9wbWVudFwiID8gMzAwMyA6IHVuZGVmaW5lZCxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogXCIvc3JjXCIsXG4gICAgfSxcbiAgfSxcbiAgcm9vdDogXCIuL1wiLFxuICBidWlsZDoge1xuICAgIG91dERpcjogXCJkaXN0XCIsXG4gICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vdml0ZWpzL3ZpdGUvaXNzdWVzLzE1MDEyI2lzc3VlY29tbWVudC0xOTQ4NTUwMDM5XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb253YXJuKHdhcm5pbmcsIGRlZmF1bHRIYW5kbGVyKSB7XG4gICAgICAgIGlmICh3YXJuaW5nLmNvZGUgPT09IFwiU09VUkNFTUFQX0VSUk9SXCIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBkZWZhdWx0SGFuZGxlcih3YXJuaW5nKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcHVibGljRGlyOiBcInB1YmxpY1wiLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdSLFNBQVMsb0JBQW9CO0FBQ3JULE9BQU8sVUFBVTtBQUNqQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sWUFBWTtBQUduQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxjQUFjLEdBQUcsT0FBTyxDQUFDO0FBQUEsRUFDcEQsUUFBUTtBQUFBLElBQ04sTUFBTSxRQUFRLElBQUksYUFBYSxnQkFBZ0IsT0FBTztBQUFBLEVBQ3hEO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQTtBQUFBLElBRVIsZUFBZTtBQUFBLE1BQ2IsT0FBTyxTQUFTLGdCQUFnQjtBQUM5QixZQUFJLFFBQVEsU0FBUyxtQkFBbUI7QUFDdEM7QUFBQSxRQUNGO0FBRUEsdUJBQWUsT0FBTztBQUFBLE1BQ3hCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFdBQVc7QUFDYixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
