import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

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

export default function AdminPage(props: PageProps) {
  const { name } = props.params;

  return (
    <>
      <Head>
        <title>{props.data.settings.title || "urlcards"}</title>
      </Head>
      <main>
        <p>Greetings to you, {name}!</p>
      </main>
    </>
  );
}
