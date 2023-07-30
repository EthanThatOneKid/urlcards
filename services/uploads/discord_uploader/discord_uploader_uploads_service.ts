import type {
  CreateUploadRequest,
  CreateUploadResponse,
  UploadsService,
} from "../mod.ts";

/**
 * DiscordUploaderUploadsService uploads files to Discord.
 */
export class DiscordUploaderUploadsService implements UploadsService {
  public constructor(
    private readonly apiURL = DEFAULT_DISCORD_UPLOADER_API_URL,
  ) {}

  /**
   * createUpload uploads a picture to Discord and returns the media
   * URL.
   *
   * See:
   * https://etok.codes/discord_uploader#readme
   */
  public async createUpload(
    r: CreateUploadRequest,
  ): Promise<CreateUploadResponse> {
    const formData = new FormData();
    formData.append("file", r.file, r.file.name);

    // Upload to Discord.
    const response = await fetch(this.apiURL, {
      method: "POST",
      body: formData,
    });
    const responseBody = await response.json();

    // Parse link from Discord response.
    if (responseBody?.attachments.length !== 1) {
      throw new Error(
        "Discord response does not contain exactly one attachment.",
      );
    }

    const url = new URL(responseBody.attachments[0].proxy_url);
    return { url: url.toString() };
  }
}

/**
 * DEFAULT_DISCORD_UPLOADER_API_URL is the default URL for the service that
 * uploads files to Discord.
 *
 * @see
 * https://github.com/EthanThatOneKid/acmcsuf.com/blob/d7d51f8726af6056085ce9c3697ad7c2d8348ee6/src/lib/components/cropper/discord-uploader.ts
 */
export const DEFAULT_DISCORD_UPLOADER_API_URL =
  "https://discord-uploader.netlify.app/upload";
