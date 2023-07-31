import type { URLCard, URLCardsSettings } from "#/services/urlcards/mod.ts";

/**
 * URLCardsAdminPageProps are the props for the URLCardsAdminPage component.
 */
export interface URLCardsAdminPageProps {
  cards: URLCard[];
  settings?: URLCardsSettings;
}

// TODO:
// add urlcard list with delete buttons,
// settings form,
// and create urlcard form.

/**
 * URLCardsAdminPage is the component for the URLCardsAdminPage page.
 */
export default function URLCardsAdminPage(props: URLCardsAdminPageProps) {
  return (
    <div class="urlcards-admin-page">
    </div>
  );
}
