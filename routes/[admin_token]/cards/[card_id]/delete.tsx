import { Handlers } from "$fresh/server.ts";
import { ADMIN_TOKEN } from "#/env.ts";
import { urlcardsService } from "#/services/services.ts";

export const handler: Handlers = {
  async POST(_, ctx) {
    // Redirect to public page if admin token is not provided.
    if (ctx.params.admin_token !== ADMIN_TOKEN) {
      return new Response("", {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    if (!ctx.params.card_id) {
      throw new Error("card_id is not present");
    }
    try {
      await urlcardsService.deleteCard({
        id: ctx.params.card_id,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }

    return new Response("", {
      status: 302,
      headers: {
        Location: `/${ADMIN_TOKEN}`,
      },
    });
  },
};
