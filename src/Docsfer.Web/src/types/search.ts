export type Group = { name: string; permission: "read" | "write" | "admin" };
export type User = { name: string };

export type File = {
  id: number;
  name: string;
  creationDate: string;
  modifyDate: string;
  uploader: string;
  groups: Group[];
  users: User[];
};
