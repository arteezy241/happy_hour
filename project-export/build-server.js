import { build } from "esbuild";

build({
  entryPoints: ["server/index.ts"],
  bundle: true,
  platform: "node",
  packages: "external",
  format: "esm",
  outdir: "dist-server",
}).catch(() => process.exit(1));