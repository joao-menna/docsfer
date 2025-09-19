import { requireAuth } from "./useRequireAuth";

export const filesLoader = async () => {
  await requireAuth();
  /* throw new Error("Error message!"); */
  return {
    files: [
      {
        id: "123",
        name: "brabo",
      },
    ],
  };
};
