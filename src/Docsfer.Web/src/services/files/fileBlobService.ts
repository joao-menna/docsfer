import { api } from "../httpClient";

export interface UploadBlobRequest {
  file: File;
  from: string;
  to: string;
}

export interface UploadBlobResponse {
  url?: string;
  id?: string;
}

export const fileUploadService = {
  /**
   * Uploads a file (blob) along with relationship data
   * @param file - The file to upload
   * @param from - The sender's user ID
   * @param to - The recipient's user ID
   * @returns Promise with the upload response (URL)
   */

  uploadBlob: async ({
    file,
    from,
    to,
  }: UploadBlobRequest): Promise<UploadBlobResponse> => {
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("from", from);
      formData.append("to", to);

      const response = await api.post<UploadBlobResponse>(
        "/blob/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error uploading the file: ${error}`);
      throw error;
    }
  },

  /**
   * Validates file before upload
   * @param file - The file to validate;
   * @param maxSizeMB - Maximum file size (default: 12MB);
   * @param allowedTypes - Array of allowed MIME types;
   * @returns boolean indicating if file is valid
   */
  validateFile: (
    file: File,
    maxSizeMB: number = 12,
    allowedTypes?: string[]
  ): { valid: boolean; error?: string } => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return {
        valid: false,
        error: `File size exceeds ${maxSizeMB}MB limit`,
      };
    }

    if (allowedTypes && !allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type ${file.type} is not allowed`,
      };
    }

    return { valid: true };
  },

  getPath: async (
    relationshipId: string,
    blobEntryFileName: string,
    version: number = 0
  ) => {
    try {
      const path = await api.get(
        `/blob/path?relationshipId=${relationshipId}&blobEntryFileName=${blobEntryFileName}&version=${version}`
      );
      return path.data.path;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  download: async (path: string, fileName: string) => {
    try {
      const resp = await api.get(`/blob/download?path=${path}`, {
        responseType: "blob"
      });

      const blob = new Blob([resp.data]);
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
