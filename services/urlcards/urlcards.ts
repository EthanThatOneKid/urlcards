/**
 * URLCardsService is the interface for the URLCardsService.
 */
export interface URLCardsService {
  /**
   * createCard creates a URLCard.
   */
  createCard(r: CreateURLCardRequest): Promise<URLCard>;

  /**
   * listCards lists all URLCards.
   */
  listCards(): Promise<URLCard[]>;

  /**
   * getPicture gets the picture for a URLCard.
   */
  getPicture(r: GetURLCardPictureRequest): Promise<Uint8Array>;

  /**
   * updateCard updates a URLCard.
   */
  updateCard(r: UpdateURLCardRequest): Promise<URLCard>;

  /**
   * deleteCard deletes a URLCard.
   */
  deleteCard(r: DeleteURLCardRequest): Promise<void>;

  /**
   * updateSettings updates the settings for the URLCardsService.
   */
  updateSettings(r: UpdateURLCardsSettingsRequest): Promise<void>;
}

/**
 * UpdateURLCardRequest is the parsed request for updating a URLCard.
 */
export interface UpdateURLCardRequest extends Partial<CreateURLCardRequest> {
  /**
   * id is the id of the URLCard.
   */
  id: string;
}

/**
 * CreateURLCardRequest is the parsed request for creating a URLCard.
 */
export interface CreateURLCardRequest extends URLCard {
  /**
   * picture is the picture of the URLCard.
   */
  picture: Uint8Array;
}

/**
 * DeleteURLCardRequest is the parsed request for deleting a URLCard.
 */
export type DeleteURLCardRequest = Pick<URLCard, "id">;

/**
 * GetURLCardPictureRequest is the parsed request for getting a URLCard's
 * picture.
 */
export type GetURLCardPictureRequest = Pick<URLCard, "id">;

/**
 * URLCard is a representation of a URLCard in the URLCardsService.
 */
export interface URLCard {
  /**
   * id is the id of the URLCard.
   */
  id: string;

  /**
   * title is the title of the URLCard.
   */
  title: string;

  /**
   * url is the URL of the URLCard.
   */
  url: string;
}

/**
 * UpdateURLCardsSettingsRequest is the parsed request for updating the
 * settings for the URLCardsService.
 */
export interface UpdateURLCardsSettingsRequest
  extends Partial<URLCardsSettings> {
  /**
   * picture is the picture on the index page.
   */
  picture?: Uint8Array;
}

/**
 * URLCardsSettings is the settings for the URLCardsService.
 */
export interface URLCardsSettings {
  /**
   * title is the text content on the index page.
   */
  title: string;

  /**
   * background is the value of the index page's body's background CSS property.
   */
  background: string;

  /**
   * allowList is the list of allowed URLs. If empty, all URLs are allowed.
   */
  allowList: string[];
}
