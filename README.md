# Personal website

Next.js portfolio with public and private views of one personal atlas, discovered through a homepage Easter egg. Primary hosting: Vercel project `theskrtnerd`, targeting `https://theskrtnerd.vercel.app`.

- `/atlas/`: the existing collection minus music and LeetCode, open without a password.
- `/atlas/private/`: the full collection, protected by the existing shared password.
- Homepage discovery: the only five visible capital letters outside the bio spell ATLAS in reading order. A concise clue in Others tells visitors to add the hidden word after `/` in the address bar. The avatar only flips photos. Atlas pages, data and media carry search-exclusion directives. This is discovery, not access control.

- `npm run dev`: local preview on port 3667.
- `npm run build`: production Next.js build for Vercel.
- `npm run test:atlas`: session and encrypted-storage integrity checks (requires ignored local atlas source).
- `npm run test:atlas:routes`: public filtering, private access and search-exclusion checks against the running local server (requires ignored local atlas source and credentials).
- `vercel deploy --prod`: publish to the linked Vercel project.

GitHub Pages serves a separate static copy of the public site from the `gh-pages` branch. Run `node scripts/build-github-pages.mjs [revision]` to export a committed revision (default: `HEAD`) into `out-github-pages/`, then publish that directory to `gh-pages`. The export uses the same public components and styles as Vercel, without including local uncommitted edits. Atlas URLs forward to Vercel, where their server APIs and authentication run. Public Atlas bundles are excluded from the static export. GitHub Pages must be republished after content changes; it does not automatically track Vercel deployments.

If Vercel was deployed from local edits, use `node scripts/build-github-pages.mjs --working-tree` to include edits and new non-ignored files under `src`, `content`, and `public`. Ignored files and local credentials are never copied.

See [atlas access](docs/atlas-access.md) for collection storage and access. Never upload `.env.local`, `.atlas-password`, or `private/`; `.vercelignore` explicitly excludes them. Changing local atlas content requires repackaging before deployment. Durable web capture remains future work.
