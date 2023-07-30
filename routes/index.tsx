import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import URLCardsPage, {
  type URLCardsPageProps,
} from "#/components/urlcards_page.tsx";
import { urlcardsService } from "#/services/mod.ts";
import { ADMIN_PATH } from "#/env.ts";

export const handler: Handlers<URLCardsPageProps | null> = {
  async GET(_, ctx) {
    const settings = await urlcardsService.getSettings()
      .catch((error) => {
        console.error(error);
        return null;
      });
    if (!settings) {
      return Response.redirect(ADMIN_PATH);
    }

    const pageProps: URLCardsPageProps = {
      cards: await urlcardsService.listCards(),
      settings: await urlcardsService.getSettings(),
    };

    // TODO: remove.
    console.log({ pageProps });

    return ctx.render(pageProps);
  },
};

export default function Home(props: PageProps<URLCardsPageProps>) {
  return (
    <>
      <Head>
        <title>urlcards</title>
      </Head>
      <URLCardsPage {...props.data} />
    </>
  );
}
