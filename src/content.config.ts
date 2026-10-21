import { defineCollection } from 'astro:content';
import { docsLoader, docsSchema } from '@prosefly/astro-theme-lotus/content';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
// Defaults to the submodule; override in .env to use a sibling checkout.
const base = process.env.OPENLINT_DOCS_DIR ?? env.OPENLINT_DOCS_DIR ?? './openlint/docs';

const docs = defineCollection({
  loader: docsLoader({ base, pattern: '**/*.{md,mdx}' }),
  schema: docsSchema(),
});

export const collections = { docs };
