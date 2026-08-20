import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Reads a Cloudflare Worker binding first (wrangler.jsonc vars / secrets),
 * then `process.env`. Must be async: after any `await` in a route, the sync
 * AsyncLocalStorage context is gone and `getCloudflareContext()` throws.
 */
export async function readEnv(name: string): Promise<string | undefined> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const fromWorker = env[name as keyof typeof env];
    if (typeof fromWorker === "string" && fromWorker.trim()) {
      return fromWorker.trim();
    }
  } catch {
    // Not running inside the Cloudflare worker (e.g. next dev).
  }

  const fromProcess = process.env[name]?.trim();
  return fromProcess || undefined;
}
