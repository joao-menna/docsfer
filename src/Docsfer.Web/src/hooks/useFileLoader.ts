import { requireAuth } from "./useRequireAuth";

export const filesLoader = async () => {
  await requireAuth();
  /* throw new Error("Error message!"); */
  return {
    files: [
      {
        id: 123,
        name: "Documento1.pdf",
        creationDate: "15 Abr 2025 16:00",
        modifyDate: "16 Abr 2025 17:00",
        uploeader: "Ricardo",
        Groups: [
          {
            name: "RH",
            permission: "write",
          },
          {
            name: "Administrativo",
            permission: "admin",
          },
        ],
        Users: [
          {
            name: "Joao",
          },
          {
            name: "Ricardo",
          },
          {
            name: "Henrique",
          },
        ],
      },
    ],
  };
};
