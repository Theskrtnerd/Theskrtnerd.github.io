# Atlas access

## Public and private views

Both views use the same existing collection and gallery interface. `/atlas/` is public and contains every entry except music (`recording`), LeetCode, and entries containing uploaded audio. `/atlas/private/` shows the complete original collection after password login. No second visitor manifest or duplicate entries are maintained. New entries follow the same category rules automatically.

Filtering happens on the server before returning public JSON. The public media endpoint serves only uploads referenced by public entries. Excluded music and other private-only media return 404 from that endpoint, even when the browser has a private session. Private data and uploads use separate authenticated endpoints. Direct requests for packaged `.enc` storage files are blocked.

The homepage’s only five visible capital letters spell ATLAS in reading order, outside the bio: Apps and Technical in Highlights, sLow in the blog list, then Australia and Singapore in Others. A text-only “secret” row below the countries list hints at visiting `/word`. Visitors find the word and enter `/atlas` in their address bar. The avatar only flips photos. Neither Atlas route appears in the navbar, and the public interface does not link to the private view.

## Search discovery

Both Atlas pages emit `noindex, nofollow` metadata. All `/atlas/*` and `/api/atlas/*` responses also carry `X-Robots-Tag: noindex, nofollow, noimageindex`, including media, JSON, partial responses and errors. No sitemap includes these routes. Do not block their crawling in `robots.txt`, because crawlers need to read the indexing directives.

These directives discourage search discovery; they do not prevent guessed or shared public URLs. Only the private view uses authentication. Publishing changes requires an explicit deployment request.

## Private access and storage

The existing shared password issues a signed HttpOnly, SameSite=Strict cookie lasting 24 hours. Reloading restores access while the session is valid. Changing the password or signing secret invalidates existing sessions. The password is never stored in browser storage or included in public code.

Original entries and uploads remain in ignored `private/atlas/`. The packaging script keeps `public/atlas/*.enc` encrypted so plaintext originals are not added to Git. Collection and media APIs decrypt these files on the server.

- Editable source and original uploads: `private/atlas/` (ignored).
- Existing password/encryption key: `ATLAS_PASSWORD` in `.env.local` (ignored) and the hosting environment.
- Existing session signing key: `ATLAS_SESSION_SECRET` in the same environments. Neither key may use a `NEXT_PUBLIC_` prefix.
- Packaged ciphertext: `public/atlas/*.enc`, read only by the server.
- Public endpoints: `/api/atlas/collection/` and `/api/atlas/media/[filename]/`.
- Private endpoints: `/api/atlas/private/collection/` and `/api/atlas/private/media/[filename]/`.
- Login/logout endpoint: `/api/atlas/access/` (`POST`/`DELETE`).

Existing credentials and ignored credential files are unchanged. Never upload `.env.local`, `.atlas-password`, or `private/`; `.vercelignore` excludes them.

## Updating the collection

The atlas is browse-only. Add or edit entries in `private/atlas/entries.json`, and place original uploads alongside it. Dates are set only when supplied by Bach; do not invent missing dates. Reflections/descriptions (`note`) are optional. Set `completed: false` for an item still in progress; its caption shows “in progress”.

Run `npm run atlas:encrypt` after editing. Local dev/build scripts also package the collection. Keep a separate backup of `private/atlas/`; Git does not back it up. Publication is a separate step and requires an explicit request.

`npm run test:atlas` checks signed sessions, expiry, encryption integrity and lossless decryption. `npm run test:atlas:routes` checks the public projection, private authentication, media separation, byte-range playback, direct ciphertext denial and search-exclusion headers against a running server. Set `ATLAS_TEST_URL` to test a different local port.
