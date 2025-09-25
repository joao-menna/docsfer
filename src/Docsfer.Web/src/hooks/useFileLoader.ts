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
        uploader: "Ricardo",
        size: "12 MB",
        version: 1.4,
        groups: [
          {
            name: "RH",
            permission: "write",
          },
          {
            name: "Administrativo",
            permission: "admin",
          },
        ],
        users: [
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
      {
        id: 124,
        name: "Relatorio_Financeiro.xlsx",
        creationDate: "10 Mar 2025 09:00",
        modifyDate: "12 Mar 2025 10:30",
        uploader: "Maria",
        size: "5 MB",
        version: 2.0,
        groups: [
          {
            name: "Financeiro",
            permission: "admin",
          },
        ],
        users: [
          {
            name: "Maria",
          },
          {
            name: "Carlos",
          },
        ],
      },
      {
        id: 125,
        name: "Apresentacao.pptx",
        creationDate: "01 Fev 2025 14:20",
        modifyDate: "02 Fev 2025 15:45",
        uploader: "Ana",
        size: "8 MB",
        version: 4.1,
        groups: [
          {
            name: "Marketing",
            permission: "write",
          },
        ],
        users: [
          {
            name: "Ana",
          },
          {
            name: "Joao",
          },
        ],
      },
      {
        id: 126,
        name: "Contrato.docx",
        creationDate: "20 Jan 2025 08:10",
        modifyDate: "21 Jan 2025 09:00",
        uploader: "Carlos",
        size: "2 MB",
        version: 4.2,
        groups: [
          {
            name: "Jurídico",
            permission: "read",
          },
        ],
        users: [
          {
            name: "Carlos",
          },
          {
            name: "Henrique",
          },
        ],
      },
    ],
  };
};
