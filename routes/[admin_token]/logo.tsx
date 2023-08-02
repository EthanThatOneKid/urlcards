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
    const logoFile = formData.get("logo_file");
    if (!(logoFile instanceof File)) {
      throw new Error("logo_file is not a File");
    }

    try {
      await urlcardsService.updateSettings(() => ({ logoFile }));
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
