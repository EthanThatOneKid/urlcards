import { Handlers } from "$fresh/server.ts";
import { ADMIN_TOKEN } from "#/env.ts";
import { urlcardsService } from "#/services/services.ts";

export const handler: Handlers = {
  async POST(request, ctx) {
    // Redirect to public page if admin token is not provided.
    if (ctx.params.admin_token !== ADMIN_TOKEN) {
      return new Response("", {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const formData = await request.formData();
    const color = formData.get("color");
    if (typeof color !== "string") {
      throw new Error("color is not present");
    }

    try {
      await urlcardsService.updateSettings(() => ({ color }));
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
