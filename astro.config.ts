import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import lotus from "@prosefly/astro-theme-lotus";

export default defineConfig({
  redirects: { "/": "/getting-started" },
  integrations: [lotus()],
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
