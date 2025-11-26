import type { Group } from "@/types/search";
import { api } from "../httpClient";

export interface BlobEntryDto {
  id: number;
  fileName: string;
  blobName: string;
  createdAt: string;
  currentVersion: number;
  size?: string;
  uploader: string;
  sharedWith?: string;
  groups?: Group[];
}

export interface UploadFileRequest {
  file: File;
  from: string;
  to: string;
}

export interface UploadFileResponse {
  path: string;
}

export const fileService = {
  async list(relationshipId: string) {
    const response = await api.get<BlobEntryDto[]>("/blob", {
      params: { relationshipId },
    });

    return response.data;
  },

  async upload({ file, from, to }: UploadFileRequest) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("from", from);
    formData.append("to", to);

    const response = await api.post<UploadFileResponse>(
      "/blob/upload",
      formData
    );
    return response.data;
  },
};
