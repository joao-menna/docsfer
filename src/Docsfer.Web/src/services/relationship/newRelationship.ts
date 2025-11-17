import { api } from "../httpClient";
import type { RelatedRelationshipsResponse } from "@/types/relationship";

export interface relationshipDto {
  id: string;
  partyOneId: string;
  partyTwoId: string;
  partyOneType: number;
  partyTwoType: number;
  createdAt: string;
}

export interface CreateRelationshipRequest {
  partyOne: string;
  partyTwo: string;
}

export const relationshipService = {
  addFriend: async ({ partyOne, partyTwo }: CreateRelationshipRequest) => {
    try {
      const response = await api.post<relationshipDto>("/relationship", {
        partyOne: partyOne,
        partyTwo: partyTwo,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating relationship: ", error);
      throw error;
    }
  },
  getRelationship: async () => {
    try {
      const response = await api.get<RelatedRelationshipsResponse>(
        "/relationship/related"
      );
      return response.data;
    } catch (error) {
      console.error("GET failed ---------", error);
      throw error;
    }
  },
};
