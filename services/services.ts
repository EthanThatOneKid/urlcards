import type { URLCardsService } from "#/services/urlcards/mod.ts";
import { DenoKvURLCardsService } from "#/services/urlcards/deno_kv/mod.ts";
import { DiscordUploaderUploadsService } from "#/services/uploads/discord_uploader/mod.ts";

/**
 * urlcardsService is a singleton instance of the URLCardsService for the
 * application.
 */
export const urlcardsService = await makeURLCardsService();

/**
 * makeURLCardsService creates the URLCardsService for the application.
 */
export async function makeURLCardsService(): Promise<URLCardsService> {
  const kv = await Deno.openKv("./dev.db");
  return new DenoKvURLCardsService(
    kv,
    [],
    new DiscordUploaderUploadsService(),
  );
}
