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
   * updateCard updates a URLCard.
   */
  updateCard(r: UpdateURLCardRequest): Promise<URLCard>;

  /**
   * deleteCard deletes a URLCard.
   */
  deleteCard(r: DeleteURLCardRequest): Promise<void>;

  /**
   * getSettings gets the settings for the URLCardsService.
   */
  getSettings(): Promise<URLCardsSettings>;

  /**
   * updateSettings updates the settings for the URLCardsService.
   */
  updateSettings(r: UpdateURLCardsSettingsRequest): Promise<URLCardsSettings>;
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
export interface CreateURLCardRequest {
  /**
   * title is the title of the URLCard.
   */
  title: string;

  /**
   * url is the URL of the URLCard.
   */
  url: string;

  /**
   * pictureFile is the picture of the URLCard to be uploaded.
   */
  pictureFile: File;
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
export interface URLCard extends Omit<CreateURLCardRequest, "pictureFile"> {
  /**
   * id is the id of the URLCard.
   */
  id: string;

  /**
   * pictureSrc is the URL where the picture of the URLCard can be accessed.
   */
  pictureSrc: string;
}

/**
 * UpdateURLCardsSettingsRequest is the parsed request for updating the
 * settings for the URLCardsService.
 */
export interface UpdateURLCardsSettingsRequest
  extends Partial<URLCardsSettings> {
  /**
   * logo is the logo shown on the index page.
   */
  logo?: File;
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
  allowList: AllowList;

  /**
   * logoSrc is the URL where the logo can be accessed.
   */
  logoSrc: string;
}

/**
 * AllowList is a list of allowed URLs.
 */
export type AllowList = AllowedURL[];

/**
 * AllowedURL is a URL in the allow list.
 */
interface AllowedURL {
  /**
   * name is the unique name of the URL.
   */
  name: string;

  /**
   * url is the URL value.
   */
  url: string;
}
