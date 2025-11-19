import { relationshipService } from "@/services/relationship/newRelationship";
import { type RelationshipItem } from "@/types/relationship";
import { useEffect, useMemo, useState } from "react";

export function useRecipientSuggestions(recipientId: string) {
  const [suggestions, setSuggestions] = useState<RelationshipItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setIsLoading(true);
        const { users } = await relationshipService.getRelationship();
        console.log("users da API:", users);
        setSuggestions(users);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!recipientId) return suggestions;

    const query = recipientId.toLowerCase();

    return suggestions.filter((s) => {
      const name = s.user?.userName?.toLowerCase() ?? "";
      const id = s.user?.id?.toLowerCase() ?? "";

      return name.includes(query) || id.includes(query);
    });
  }, [recipientId, suggestions]);

  return { suggestions, filteredSuggestions, isLoading };
}
