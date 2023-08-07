import { URLCardComponent } from "#/components/urlcard_component.tsx";
import type { URLCard, URLCardsSettings } from "#/services/urlcards/mod.ts";

/**
 * URLCardsPageProps are the props for the URLCardsPage component.
 */
export interface URLCardsPageProps {
  settings: URLCardsSettings;
  cards: URLCard[];
}

/**
 * URLCardsPage is the component for the URLCardsPage page.
 */
export default function URLCardsPage(props: URLCardsPageProps) {
  return (
    <div class="urlcards-page">
      <img src={props.settings.logoSrc} alt="logo" class="urlcards-logo" />
      <h1 class="urlcards-title">{props.settings.title}</h1>
      <ul class="urlcards-list">
        {props.cards
          .map((card) => (
            <li>
              <URLCardComponent key={card.id} data={card} />
            </li>
          ))}
      </ul>
    </div>
  );
}
