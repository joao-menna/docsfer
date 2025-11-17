export interface stateInterface {
  isPinned: boolean;
  isKeepMinimized: boolean;
  isExpanded: boolean;
}

export interface actionInterface {
  type: "ENTER" | "LEAVE" | "KEEP_PINNED" | "KEEP_MINIMIZED";
}

export interface UserRelationship {
  id: string;
  userName: string;
  email: string;
}

export interface RelationshipItem {
  user: UserRelationship;
  relationshipId: string;
}

export interface RelatedRelationshipsResponse {
  users: RelationshipItem[];
  groups?: string[];
}
