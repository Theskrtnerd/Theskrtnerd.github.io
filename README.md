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

The old GitHub Pages deployment workflow has been removed locally. The existing GitHub Pages site is not automatically redirected or deleted.

See [atlas access](docs/atlas-access.md) for collection storage and access. Never upload `.env.local`, `.atlas-password`, or `private/`; `.vercelignore` explicitly excludes them. Changing local atlas content requires repackaging before deployment. Durable web capture remains future work.
