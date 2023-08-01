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
    const adminToken = ctx.params.admin_token;
    if (ctx.params.admin_token !== ADMIN_TOKEN) {
      console.log({ adminToken: ctx.params });
      return Response.redirect("/");
    }

    const pageProps: URLCardsAdminPageProps = {
      cards: await urlcardsService.listCards(),
      settings: await urlcardsService.getSettings()
        .catch((error): undefined => {
          console.error(error);
        }),
    };

    console.log({ pageProps }); // TODO: remove.
    return ctx.render(pageProps);
  },
};

export default function AdminPage(props: PageProps<URLCardsAdminPageProps>) {
  return (
    <>
      <Head>
        <title>{props.data.settings?.title || "urlcards"}</title>
      </Head>
      <URLCardsAdminPage {...props.data} />
    </>
  );
}
