import { Handlers } from "$fresh/server.ts";
import { ADMIN_TOKEN } from "#/env.ts";
import { urlcardsService } from "#/services/services.ts";
// import { urlcardsService } from "#/services/mod.ts";

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

    // Parse the form data.
    const formData = await request.formData();
    const title = formData.get("title");
    if (typeof title !== "string") {
      throw new Error("title is not a string");
    }

    const url = formData.get("url");
    if (typeof url !== "string") {
      throw new Error("url is not a string");
    }

    const pictureFile = formData.get("picture_file");
    if (!(pictureFile instanceof File)) {
      throw new Error("picture_file is not a File");
    }

    try {
      await urlcardsService.createCard({
        title,
        url,
        pictureFile,
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
