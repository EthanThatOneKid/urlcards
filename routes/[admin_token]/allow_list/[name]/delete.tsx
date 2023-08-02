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

    // Throw an error if the name is not present.
    if (!ctx.params.name) {
      throw new Error("name is not present");
    }

    // Remove the item from the allow list.
    try {
      await urlcardsService.updateSettings(({ allowList }) => {
        const newAllowList = allowList.filter((item) =>
          item.name !== ctx.params.name
        );
        return { allowList: newAllowList };
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
