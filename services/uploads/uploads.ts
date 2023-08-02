/**
 * UploadsService is a service that handles the uploading of files to object
 * storage.
 */
export interface UploadsService {
  /**
   * createUpload uploads a file to object storage and returns the URL where it
   * can be accessed.
   */
  createUpload(r: CreateUploadRequest): Promise<CreateUploadResponse>;
}

/**
 * CreateUploadRequest is the parsed request for creating an upload.
 */
export interface CreateUploadRequest {
  /**
   * file is the file to upload.
   */
  file: File;
}

/**
 * CreateUploadResponse is the response for creating an upload.
 */
export interface CreateUploadResponse {
  /**
   * url is the URL where the file can be accessed.
   */
  url: string;
}
