export type Group = { name: string };

export interface User {
  id: string;
  userName?: string | null;
  email?: string | null;
  phoneNumber?: string;
}

/* export type User = { name: string }; */

export interface File {
  id: number;
  fileName: string;
  blobName: string;
  createdAt: string;
  currentVersion: string;
  size?: string;
  uploader: string;
  relationshipId?: string;
  sharedWith?: string;
  groups?: Group[];
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
