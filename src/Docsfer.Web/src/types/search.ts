export type Group = { name: string };
export type User = { name: string };

export type File = {
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
