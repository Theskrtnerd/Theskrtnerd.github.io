import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Build a committed revision independently of the Vercel app and local private data.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workingTree = process.argv[2] === "--working-tree";
const revision = workingTree ? "HEAD" : process.argv[2] || "HEAD";
const output = path.join(root, "out-github-pages");
const staging = mkdtempSync(path.join(tmpdir(), "personal-website-pages-"));

function redirectPage(route, destination, noindex = false) {
  const directory = path.join(staging, "out", route);
  mkdirSync(directory, { recursive: true });
  writeFileSync(path.join(directory, "index.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Bach Tran</title>${noindex ? '<meta name="robots" content="noindex,nofollow,noimageindex">' : ''}
<link rel="icon" href="/favicon.svg?v=3" type="image/svg+xml">
<meta http-equiv="refresh" content="0;url=${destination}">
<link rel="canonical" href="${destination}">
</head><body><p><a href="${destination}">Continue to ${route.startsWith('atlas') ? 'Atlas' : 'Bach Tran'}</a></p>
<script>const target = new URL(${JSON.stringify(destination)}, location.origin); target.search = location.search; if (!target.hash) target.hash = location.hash; location.replace(target.href);</script>
</body></html>`);
}

try {
  const archive = path.join(staging, "source.tar");
  execFileSync("git", ["archive", "--format=tar", `--output=${archive}`, revision], { cwd: root });
  execFileSync("tar", ["-xf", archive, "-C", staging]);
  rmSync(archive);
  if (workingTree) {
    const files = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z", "src", "content", "public"], { cwd: root, encoding: "utf8" }).split("\0").filter(Boolean);
    for (const file of files) {
      if (file.startsWith("public/atlas/")) continue;
      const destination = path.join(staging, file);
      if (existsSync(path.join(root, file))) {
        mkdirSync(path.dirname(destination), { recursive: true });
        cpSync(path.join(root, file), destination);
      } else {
        rmSync(destination, { force: true });
      }
    }
  }
  for (const directory of ["src/app/api", "src/app/atlas", "src/app/highlights", "src/app/more", "src/proxy.ts", "public/atlas"]) {
    rmSync(path.join(staging, directory), { recursive: true, force: true });
  }
  writeFileSync(path.join(staging, "next.config.ts"), `import type { NextConfig } from "next";
const config: NextConfig = { output: "export", trailingSlash: true, images: { unoptimized: true } };
export default config;
`);
  symlinkSync(path.join(root, "node_modules"), path.join(staging, "node_modules"), "dir");
  // Invoke Next directly: the Vercel prebuild encrypts Atlas and is not needed here.
  execFileSync(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "build", "--webpack"], {
    cwd: staging, stdio: "inherit",
  });
  redirectPage("highlights", "/#highlights");
  redirectPage("more", "/#others");
  redirectPage("atlas", "https://theskrtnerd.vercel.app/atlas/", true);
  redirectPage("atlas/private", "https://theskrtnerd.vercel.app/atlas/private/", true);
  writeFileSync(path.join(staging, "out", ".nojekyll"), "");
  rmSync(output, { recursive: true, force: true });
  cpSync(path.join(staging, "out"), output, { recursive: true });
  console.log(`GitHub Pages export of ${workingTree ? "public working tree" : revision}: ${output}`);
} finally {
  rmSync(staging, { recursive: true, force: true });
}
