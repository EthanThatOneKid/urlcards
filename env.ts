import { load } from "$std/dotenv/mod.ts";

await load({ export: true });

export const ADMIN_TOKEN = Deno.env.get("ADMIN_TOKEN")!;
