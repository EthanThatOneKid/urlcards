import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { ADMIN_TOKEN } from "#/env.ts";
import { urlcardsService } from "#/services/mod.ts";
import URLCardsAdminPage, {
  type URLCardsAdminPageProps,
} from "#/components/urlcards_admin_page.tsx";

export const handler: Handlers<URLCardsAdminPageProps | null> = {
  async GET(_, ctx) {
    // Redirect to public page if admin token is not provided.
    if (ctx.params.admin_token !== ADMIN_TOKEN) {
      return new Response("", {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const pageProps: URLCardsAdminPageProps = {
      cards: await urlcardsService.listCards(),
      settings: await urlcardsService.getSettings()
        .catch((error): undefined => {
          console.error(error);
        }),
    };

    return ctx.render(pageProps);
  },
};

export default function AdminPage(props: PageProps<URLCardsAdminPageProps>) {
  return (
    <>
      <Head>
        <title>Admin | {props.data.settings?.title || "URLCards"}</title>
      </Head>
      <URLCardsAdminPage {...props.data} />
    </>
  );
}
