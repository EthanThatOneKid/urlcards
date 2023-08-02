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
    "fieldset",
    "p",
    "summary",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
  ];
  return `html {
  background: ${settings.background};
}

${coloredSelectors.join(",")} {
    color: ${settings.color};
}`;
}
