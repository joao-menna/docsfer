export type Group = { id: string; name: string };

export interface User {
  id: string;
  userName?: string | null;
  email?: string | null;
  phoneNumber?: string;
  name?: string | null;
}

export interface File {
  id: number;
  fileName?: string;
  blobName?: string;
  createdAt?: string;
  currentVersion?: number;
  size?: string;
  uploader?: string;
  relationshipId?: string;
  sharedWith?: (User | { name: string })[] | string;
  groups?: Group[];
  // Legacy/compat fields used in some UI pieces
  name?: string;
  creationDate?: string;
  modifyDate?: string;
  version?: string;
  users?: User[];
}

/* export type File = {
  id: number;
  name: string;
  creationDate: string;
  modifyDate?: string;
  uploader?: string;
  groups: Group[];
  sharedWith: User[];
  size: string;
  version: string;
};
 */
