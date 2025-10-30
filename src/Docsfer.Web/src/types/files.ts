import type { UserInfo } from "@/services/auth/authService";

export interface FileDataFromDB {
  id: string;
  name: string;
  creation_date: string;
  modify_date: string;
  uploader: string;
  size: string;
  version: number;
  groups: Array<{
    name: string;
    permission: string;
  }>;
  users: Array<{
    name: string;
    pfp?: string;
    email?: string;
    group?: Array<string>;
  }>;
}

export interface FormattedFileData {
  id: string;
  name: string;
  creationDate: string;
  modifyDate: string;
  uploader: string;
  size: string;
  version: string;
  groups: Array<{
    name: string;
    permission: string;
  }>;
  users: Array<{
    name: string;
    pfp?: string;
    email?: string;
    groups?: Array<string>;
  }>;
}

export type FilesLoaderData = {
  files: FormattedFileData[];
  user: UserInfo;
};

export type FileDetailLoaderData = {
  files: FormattedFileData[];
  currentFile: FormattedFileData | null;
  user: UserInfo;
};
