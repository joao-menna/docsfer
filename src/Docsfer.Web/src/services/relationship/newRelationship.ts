import { api } from "../httpClient";
import type {
  RelatedRelationshipsResponse,
  CreateRelationshipRequest,
  relationshipDto,
} from "@/types/relationship";

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
