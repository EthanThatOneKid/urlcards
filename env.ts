import { load } from "$std/dotenv/mod.ts";

await load({ export: true });

export const ADMIN_PATH = Deno.env.get("ADMIN_PATH")!;
