import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: "./setup-tests.ts",
    environment: "jsdom",
    globals: true,
  },
});
