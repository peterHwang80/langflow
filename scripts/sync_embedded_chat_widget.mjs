#!/usr/bin/env node

import { access, copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const destination = resolve(
  repoRoot,
  "src/frontend/public/embedded-chat/idrflow-chat.js",
);

const candidateRoots = [
  process.argv[2],
  process.env.IDRFLOW_EMBEDDED_CHAT_REPO,
  resolve(repoRoot, "../../gitlab/idrflow-embedded-chat"),
].filter(Boolean);

async function findSourceFile() {
  for (const root of candidateRoots) {
    const candidate = resolve(root, "dist/idrflow-chat.js");
    try {
      await access(candidate);
      return candidate;
    } catch {
      // Try the next candidate.
    }
  }

  throw new Error(
    "Could not locate dist/idrflow-chat.js. Pass the embedded chat repo path as the first argument or set IDRFLOW_EMBEDDED_CHAT_REPO.",
  );
}

const source = await findSourceFile();
await mkdir(dirname(destination), { recursive: true });
await copyFile(source, destination);

console.log(`Synced embedded chat bundle from ${source} to ${destination}`);
