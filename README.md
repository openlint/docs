# OpenLint Docs

Astro + [Lotus](https://astro-theme-lotus.prosefly.dev) site. Content lives in `openlint/docs`, pulled in as a git submodule (`./openlint`).

```sh
git submodule update --init
npm install
npm run dev
```

## Editing content locally

Copy `.env.example` to `.env` so the site reads `../openlint/docs` (your sibling checkout) instead of the submodule, giving live reload while you edit content in the openlint repo. To also point the submodule at your local clone:

```sh
git config submodule.openlint.url /path/to/openlint
```

Each page's title is in its frontmatter. Sidebar order is in `theme.config.json`.
