import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/server.ts"],
  outDir: "build",
  target: "es2020",
  format: ["cjs"],
  clean: true,
  loader: {
    ".sql": "copy",
  },
});
