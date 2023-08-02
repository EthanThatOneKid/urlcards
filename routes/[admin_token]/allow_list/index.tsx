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
    const name = formData.get("name");
    if (typeof name !== "string") {
      throw new Error("name is not present");
    }

    const url = formData.get("url");
    if (typeof url !== "string") {
      throw new Error("url is not present");
    }

    // Add allowed URL to the Allow List
    try {
      await urlcardsService.updateSettings(({ allowList }) => {
        const foundIndex = allowList.findIndex((item) => item.name === name);
        if (foundIndex !== -1) {
          allowList[foundIndex] = { name, url };
        } else {
          allowList.push({ name, url });
        }
        return { allowList };
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
