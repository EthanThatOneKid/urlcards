import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ADMIN_TOKEN } from "#/env.ts";
import { urlcardsService } from "#/services/mod.ts";
import URLCardsPage, {
  type URLCardsPageProps,
} from "#/components/urlcards_page.tsx";

export const handler: Handlers<URLCardsPageProps | null> = {
  async GET(request, ctx) {
    const settings = await urlcardsService.getSettings()
      .catch((error) => {
        console.error(error);
        return null;
      });
    if (!settings) {
      return new Response("", {
        status: 307,
        headers: { Location: `/${ADMIN_TOKEN}` },
      });
    }

    const pageProps: URLCardsPageProps = {
      cards: await urlcardsService.listCards(),
      settings: await urlcardsService.getSettings(),
    };

    console.log({ pageProps }); // TODO: remove.
    return ctx.render(pageProps);
  },
};

export default function HomePage(props: PageProps<URLCardsPageProps>) {
  return (
    <>
      <Head>
        <title>{props.data.settings.title || "urlcards"}</title>
      </Head>
      <URLCardsPage {...props.data} />
    </>
  );
}
