import { access } from "node:fs/promises";
import { join } from "node:path";

const serverEntry = join(
  process.cwd(),
  ".vercel/output/functions/__server.func/index.mjs",
);

try {
  await access(serverEntry);
  console.log("[postbuild] Vercel SSR function OK:", serverEntry);
} catch {
  console.error(
    "[postbuild] Missing Vercel SSR output at",
    serverEntry,
    "\nEnsure vite.config.ts uses nitro({ preset: \"vercel\" }) and cloudflare is disabled.",
  );
  process.exit(1);
}
