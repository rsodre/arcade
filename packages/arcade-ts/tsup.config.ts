import { defineConfig } from "tsup";

export default defineConfig(() => ({
  entry: ["src/index.ts"],
  sourcemap: true,
  clean: true,
  format: ["cjs", "esm"],
  globalName: "starknet",
  noExternal: ["@cartridge/internal", "@cartridge/marketplace"],
  external: ["@dojoengine/torii-wasm"],
  esbuildOptions(options, context) {
    if (context.format === "iife") {
      options.platform = "browser";
      options.external = [...(options.external || []), "node:*", "*.wasm"];
    }
  },
}));
