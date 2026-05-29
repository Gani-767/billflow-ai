// @lovable.dev/vite-tanstack-config bundles TanStack Start, React, Tailwind, and path aliases.
// Nitro replaces the Cloudflare build plugin and produces Vercel-compatible SSR output (.vercel/output).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  // Cloudflare plugin outputs dist/client + dist/server (Workers) — wrong for Vercel SSR.
  cloudflare: false,
  plugins: [
    nitro({
      preset: "vercel",
    }),
  ],
  tanstackStart: {
    server: { entry: "server" },
  },
});
