import type { FileDataFromDB, FormattedFileData } from "@/types/files";
import { formatTimestamp } from "./useFormatTime";

export const formatFile = (file: FileDataFromDB): FormattedFileData => ({
  id: file.id,
  name: file.name,
  creationDate: formatTimestamp(file.creation_date),
  modifyDate: formatTimestamp(file.modify_date),
  uploader: file.uploader ?? "Desconhecido",
  size: file.size,
  version: file.version.toFixed(1),
  groups: file.groups,
  users: file.users.map((user) => ({
    ...user,
    groups: user.group,
  })),
});

export const formatFiles = (files: FileDataFromDB[]): FormattedFileData[] =>
  files.map(formatFile);
