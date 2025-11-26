import type { BlobEntryDto } from "@/services/files/fileService";
import type { UserInfo } from "@/services/auth/authService";
import type { File } from "@/types/search";
import { formatTimestamp } from "@/utils/format/useFormatTime";

export type FilesLoaderData = {
  files: File[];
  user: UserInfo;
};

export type FileDetailLoaderData = {
  files: File[];
  currentFile: File | null;
  user: UserInfo;
};

export type LoaderData = {
  files: File[];
  user: UserInfo;
};

export const formatFileFromBlob = (
  entry: BlobEntryDto,
  uploader: string,
  relationshipId: string
) => ({
  id: entry.id,
  fileName: entry.fileName,
  createdAt: formatTimestamp(entry.createdAt),
  blobName: entry.blobName,
  uploader,
  sharedWith: uploader ?? "",
  size: "—",
  currentVersion: entry.currentVersion ?? 1,
  groups: entry.groups,
  relationshipId: relationshipId,
});
