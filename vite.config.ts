import { defineConfig } from "vite-plus";

const ignorePatterns = ["pnpm-workspace.yaml", "**/*-lock.*", "__*"];

export default defineConfig({
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
    ignorePatterns: [...ignorePatterns],
  },
  fmt: {
    ignorePatterns: [...ignorePatterns],
  },
  staged: {
    "*": "vp check --no-error-on-unmatched-pattern",
  },
});
