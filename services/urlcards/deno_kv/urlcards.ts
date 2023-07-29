import * as blob from "kv_toolbox/blob.ts";
import type {
  CreateURLCardRequest,
  DeleteURLCardRequest,
  UpdateURLCardRequest,
  URLCard,
  URLCardsService,
} from "../mod.ts";

enum URLCardsKvPrefix {
  CARDS = "urlcards_cards",
  SETTINGS = "urlcards_settings",
  PICTURES = "urlcards_pictures",
}

/**
 * DenoKvURLCardsService is a URLCardsService that uses Deno.Kv as the storage
 * layer.
 */
export class DenoKvURLCardsService implements URLCardsService {
  constructor(
    private readonly kv: Deno.Kv,
    private readonly namespace: Deno.KvKey = [],
  ) {}

  async createCard(r: CreateURLCardRequest): Promise<URLCard> {
    const card: URLCard = {
      id: crypto.randomUUID(),
      title: r.title,
      url: r.url,
    };

    await blob.set(
      this.kv,
      this.namespace.concat(URLCardsKvPrefix.PICTURES, card.id),
      r.picture,
    );
    await this.kv.set(
      this.namespace.concat(URLCardsKvPrefix.CARDS, card.id),
      JSON.stringify(card),
    );

    return card;
  }

  async listCards(): Promise<URLCard[]> {
    const cards: URLCard[] = [];
    const asyncEntries = this.kv.list<URLCard>({
      prefix: this.namespace.concat(URLCardsKvPrefix.CARDS),
    });
    for await (const entry of asyncEntries) {
      cards.push(entry.value);
    }
    return cards;
  }
}
