import { defineConfig } from "vite-plus";

const ignorePatterns = ["pnpm-workspace.yaml", "**/*-lock.*"];

export default defineConfig({
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
    ignorePatterns: [...ignorePatterns],
  },
  fmt: {},
  staged: {
    "*": "vp check --no-error-on-unmatched-pattern",
  },
});
