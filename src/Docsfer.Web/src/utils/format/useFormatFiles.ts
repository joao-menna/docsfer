import type { BlobEntryDto } from "@/services/files/fileService";
import type { File } from "@/types/search";
import { formatTimestamp } from "./useFormatTime";

export const formatFile = (entry: BlobEntryDto): File => ({
  id: entry.id,
  fileName: entry.fileName,
  blobName: entry.blobName,
  createdAt: formatTimestamp(entry.createdAt),
  currentVersion: entry.currentVersion,
  size: entry.size,
  uploader: entry.uploader,
  sharedWith: entry.sharedWith,
  groups: entry.groups,
});

export const formatFiles = (entries: BlobEntryDto[]): File[] =>
  entries.map(formatFile);
