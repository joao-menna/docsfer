import { AxiosError } from "axios";
import { api } from "../httpClient";

export const groupService = {
  getAllGroups: async () => {
    try {
      const groups = await api.get("/group");
      return groups.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  createGroup: async (name: string) => {
    try {
      await api.post("/group", {
        name: name,
      });
      return name;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  insertUser: async (userId: string, groupId: string) => {
    try {
      await api.post(`/group/associate`, null, {
        params: { userId, groupId },
      });
      return { success: true, message: "User added to group." };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 490) {
          return { success: false, message: "User is already in this group." };
        }
      }
      console.error(error);
      throw error;
    }
  },
  getUsers: async (groupId: string) => {
    try {
      const { data } = await api.get(`/group/${groupId}/users`);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
