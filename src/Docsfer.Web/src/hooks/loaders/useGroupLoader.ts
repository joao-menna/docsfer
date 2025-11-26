import { groupService } from "@/services/relationship/groups";
import type { Group } from "@/types/search";
import type { UserRelationship } from "@/types/relationship";

export const loadGroups = async () => {
  try {
    const response = await groupService.getAllGroups();
    const groups: Group[] = Array.isArray(response)
      ? response
      : response?.groups ?? [];

    const groupsWithUsers = await Promise.all(
      groups.map(async (group: Group) => {
        const usersResponse = await groupService.getUsers(group.id);
        const users: UserRelationship[] = usersResponse.map(
          (user: {
            id: string;
            username?: string;
            userName?: string;
            email?: string;
          }) => ({
            id: user.id,
            userName: user.userName ?? user.username ?? "",
            email: user.email ?? "",
          })
        );
        return {
          ...group,
          users,
        };
      })
    );
    return { groups: groupsWithUsers };
  } catch (error) {
    console.error("Failed to load groups", error);
    return { groups: [] };
  }
};
