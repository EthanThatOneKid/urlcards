import { Handlers } from "$fresh/server.ts";
import { ADMIN_TOKEN } from "#/env.ts";
import { urlcardsService } from "#/services/mod.ts";
import { multiParser } from "multiparser/mod.ts";

/*
<form class="urlcards-admin-create-form" action={`/${ADMIN_TOKEN}/cards`}>
      <fieldset>
        <legend>Create URLCard</legend>

        <label>
          Title:
          <input
            type="text"
            name="title"
            placeholder="Title"
            class="urlcards-admin-create-title"
          />
        </label>

        {props.allowList && props.allowList.length > 0
          ? (
            <label>
              Select URL from Allow List:
              <select name="url" class="urlcards-admin-create-url">
                {props.allowList.map(({ name, url }) => (
                  <option value={url}>{name}</option>
                ))}
              </select>
            </label>
          )
          : (
            <label>
              URL:
              <input
                type="text"
                name="url"
                placeholder="URL"
                class="urlcards-admin-create-url"
              />
            </label>
          )}

        <label>
          Picture File:
          <input
            type="file"
            name="picture_file"
            placeholder="Picture file"
            class="urlcards-admin-create-picture-file"
          />
        </label>

        <button type="submit" class="urlcards-admin-create-submit">
          Create
        </button>
      </fieldset>
    </form>
    */

export const handler: Handlers = {
  async POST(request, ctx) {
    console.log({ request, ctx });
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
    const formData = await multiParser(request);
    console.log({ formData });
    return new Response("", {
      status: 302,
      headers: {
        Location: `/${ADMIN_TOKEN}`,
      },
    });
  },
};
