import path from "node:path";
import { visit } from "unist-util-visit";

const REPO = "https://github.com/openlint/openlint/blob/main";

// Content is written for GitHub, with relative links to .md files. On the site
// each page is served at /<path>/, so rewrite those links to their page routes.
export default function remarkMdLinks({ base }: { base: string }) {
  const root = path.resolve(base);
  return (tree: any, file: any) => {
    if (!file.path) return;
    visit(tree, ["link", "definition"], (node: any) => {
      const m = /^(?![a-z]+:|\/|#)([^#?]+\.mdx?)(#.*)?$/i.exec(node.url);
      if (!m) return;
      const target = path.resolve(path.dirname(file.path), m[1]);
      const rel = path.relative(root, target).split(path.sep).join("/");
      if (rel.startsWith("..")) {
        // Outside the docs folder (such as the README): link to it on GitHub.
        const repoRel = path.relative(path.dirname(root), target).split(path.sep).join("/");
        if (!repoRel.startsWith("..")) node.url = `${REPO}/${repoRel}${m[2] ?? ""}`;
        return;
      }
      const route = rel.replace(/\.mdx?$/i, "").replace(/(^|\/)index$/, "");
      node.url = "/" + (route ? route + "/" : "") + (m[2] ?? "");
    });
  };
}
