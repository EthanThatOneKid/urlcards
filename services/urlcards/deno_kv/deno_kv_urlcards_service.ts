import type { UploadsService } from "#/services/uploads/mod.ts";
import type {
  CreateURLCardRequest,
  DeleteURLCardRequest,
  UpdateURLCardRequest,
  URLCard,
  URLCardsService,
} from "#/services/urlcards/mod.ts";
import {
  UpdateURLCardsSettingsRequest,
  URLCardsSettings,
} from "../urlcards.ts";

// TODO(EthanThatOneKid):
// Create adjacent `deno_kv_urlcards_service_test.ts` file.

/**
 * DenoKvURLCardsService is a URLCardsService that uses Deno.Kv as its
 * storage layer.
 */
export class DenoKvURLCardsService implements URLCardsService {
  public constructor(
    private readonly kv: Deno.Kv,
    private readonly namespace: string[],
    private readonly uploads: UploadsService,
  ) {}

  public async createCard(r: CreateURLCardRequest): Promise<URLCard> {
    // Upload the picture.
    const { url: pictureSrc } = await this.uploads.createUpload({
      file: r.picture,
    });

    // Make a URLCard.
    const card: URLCard = {
      id: crypto.randomUUID(),
      title: r.title,
      url: r.url,
      pictureSrc,
    };

    // Save the URLCard.
    const key = this.namespace.concat(URLCardsKvPrefix.CARDS, card.id);
    const result = await this.kv.set(key, card);
    if (!result.ok) {
      throw new Error("failed to save URLCard");
    }

    // Return the URLCard.
    return card;
  }

  public async listCards(): Promise<URLCard[]> {
    // Make empty URLCard array.
    const cards: URLCard[] = [];

    // Make async URLCard entries iterator.
    const asyncEntries = this.kv.list<URLCard>({
      prefix: this.namespace.concat(URLCardsKvPrefix.CARDS),
    });

    // Add each URLCard to the array.
    for await (const entry of asyncEntries) {
      cards.push(entry.value);
    }

    // Return the URLCard array.
    return cards;
  }

  public async updateCard(r: UpdateURLCardRequest): Promise<URLCard> {
    // Get the card.
    const key = this.namespace.concat(URLCardsKvPrefix.CARDS, r.id);
    const cardResult = await this.kv.get<URLCard>(key);
    if (!cardResult.value) {
      throw new Error("URLCard not found");
    }

    // Update the picture if present.
    const card = cardResult.value;
    if (r.picture) {
      const { url } = await this.uploads.createUpload({
        file: r.picture,
      });
      card.pictureSrc = url;
    }

    // Update the title if present.
    if (r.title) {
      card.title = r.title;
    }

    // Update the URL if present.
    if (r.url) {
      card.url = r.url;
    }

    // Save the URLCard.
    const result = await this.kv.atomic()
      .check(cardResult)
      .set(key, card)
      .commit();
    if (!result.ok) {
      throw new Error("failed to save URLCard");
    }

    // Return the URLCard.
    return card;
  }

  public async deleteCard(r: DeleteURLCardRequest): Promise<void> {
    const key = this.namespace.concat(URLCardsKvPrefix.CARDS, r.id);
    await this.kv.delete(key);
  }

  public async getSettings(): Promise<URLCardsSettings> {
    const key = this.namespace.concat(URLCardsKvPrefix.SETTINGS);
    const settingsResult = await this.kv.get<URLCardsSettings>(key);
    if (!settingsResult.value) {
      throw new Error("settings not found");
    }

    return settingsResult.value;
  }

  public async updateSettings(
    r: UpdateURLCardsSettingsRequest,
  ): Promise<URLCardsSettings> {
    const key = this.namespace.concat(URLCardsKvPrefix.SETTINGS);
    const settingsResult = await this.kv.get<URLCardsSettings>(key);
    if (!settingsResult.value) {
      throw new Error("settings not found");
    }

    const settings: URLCardsSettings = settingsResult.value;
    if (r.title) {
      settings.title = r.title;
    }

    if (r.background) {
      settings.background = r.background;
    }

    if (r.allowList) {
      settings.allowList = r.allowList;
    }

    if (r.logo) {
      const { url } = await this.uploads.createUpload({
        file: r.logo,
      });
      settings.logoSrc = url;
    }

    const result = await this.kv.atomic()
      .check(settingsResult)
      .set(key, settings)
      .commit();
    if (!result.ok) {
      throw new Error("failed to save settings");
    }

    return settings;
  }
}

/**
 * URLCardsKvPrefix is the prefix for all keys in the URLCardsService.
 */
export enum URLCardsKvPrefix {
  CARDS = "cards",
  SETTINGS = "settings",
}
