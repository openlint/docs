import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import lotus from "@prosefly/astro-theme-lotus";
import { loadEnv } from "vite";
import remarkMdLinks from "./src/remark-md-links";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
// Same default as src/content.config.ts.
const docsDir = process.env.OPENLINT_DOCS_DIR ?? env.OPENLINT_DOCS_DIR ?? "./openlint/docs";

export default defineConfig({
  redirects: { "/": "/getting-started" },
  integrations: [lotus()],
  markdown: { remarkPlugins: [[remarkMdLinks, { base: docsDir }]] },
  vite: {
    resolve: {
      // Content lives outside this project (submodule/sibling checkout), so imports
      // injected into its MDX files must resolve from here.
      alias: [
        {
          find: /^@prosefly\/astro-components$/,
          replacement: fileURLToPath(
            import.meta.resolve("@prosefly/astro-components")
          ),
        },
      ],
    },
  },
});
