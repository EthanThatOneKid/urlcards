import { Handlers } from "$fresh/server.ts";
import { urlcardsService } from "#/services/services.ts";
import { URLCardsSettings } from "#/services/urlcards/mod.ts";

export const handler: Handlers = {
  async GET() {
    const settings = await urlcardsService.getSettings()
      .catch((error): undefined => {
        console.error(error);
      });
    if (!settings) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(
      renderThemeCSS(settings),
      {
        headers: {
          "Content-Type": "text/css",
        },
      },
    );
  },
};

function renderThemeCSS(settings: URLCardsSettings): string {
  const coloredSelectors = [
    "label",
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "summary",
  ];

  const css = [];
  if (settings.background) {
    css.push(`html {
  background: ${settings.background};
}`);
  }

  if (settings.color) {
    css.push(`${coloredSelectors.join(",")} {
    color: ${settings.color};
}`);
  }

  return css.join("\n");
}
