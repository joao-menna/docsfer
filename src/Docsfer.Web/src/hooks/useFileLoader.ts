import { requireAuth } from "./useRequireAuth";
import type { LoaderFunctionArgs } from "react-router";

interface FileDataFromDB {
  id: number;
  name: string;
  creation_date: string;
  modify_date: string;
  uploader: string;
  size: string;
  version: number;
  groups: Array<{
    name: string;
    permission: string;
  }>;
  users: Array<{
    name: string;
    pfp?: string;
    email?: string;
    group?: Array<string>;
  }>;
}

interface FormattedFileData {
  id: number;
  name: string;
  creationDate: string;
  modifyDate: string;
  uploader: string;
  size: string;
  version: number;
  groups: Array<{
    name: string;
    permission: string;
  }>;
  users: Array<{
    name: string;
    pfp?: string;
    email?: string;
    groups?: Array<string>;
  }>;
}

type FileDetailLoaderData = {
  files: FormattedFileData[];
  currentFile: FormattedFileData | null;
};

const monthNames = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

const formatTimestamp = (pgTimestamp: string): string => {
  const date = new Date(pgTimestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}`;
};

export const filesLoader = async (): Promise<{
  files: FormattedFileData[];
}> => {
  await requireAuth();
  const rawFiles: FileDataFromDB[] = [
    {
      id: 123,
      name: "Documento1.pdf",
      creation_date: "2025-04-15 16:00:00",
      modify_date: "2025-04-16 17:00:00",
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
          email: "henrique@example.com",
          group: ["TI"],
        },
        {
          name: "Ricardo",
          email: "ricardo@example.com",
          group: ["Admin"],
        },
        {
          name: "Henrique",
          email: "henrique@example.com",
          group: ["Admin"],
        },
      ],
    },
    {
      id: 124,
      name: "Relatorio_Financeiro.xlsx",
      creation_date: "2025-03-10 09:00:00",
      modify_date: "2025-03-12 10:30:00",
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
          email: "maria@example.com",
          group: ["RH"],
        },
        {
          name: "Carlos",
          email: "carlos@example.com",
          group: ["RH"],
        },
      ],
    },
    {
      id: 125,
      name: "Apresentacao.pptx",
      creation_date: "2025-02-01 14:20:00",
      modify_date: "2025-02-02 15:45:00",
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
          email: "ana@example.com",
          group: ["TI"],
        },
        {
          name: "Joao",
          email: "joao@example.com",
          group: ["Admin"],
        },
      ],
    },
    {
      id: 126,
      name: "Contrato.docx",
      creation_date: "2025-01-20 08:10:00",
      modify_date: "2025-01-21 09:00:00",
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
          email: "carlos@example.com",
          group: ["Financeiro"],
        },
        {
          name: "Henrique",
          email: "henrique@example.com",
          group: ["Financeiro"],
        },
      ],
    },
  ];
  /*
---[ USO QUANDO TIVER CONETADO ]---
const rawFiles: FielDataFromDB[] = await db.query(`
  SELECT
    id,
    name,
    creation_date,
    modify_date,
    uploader,
    size,
    version
    ...
    FROM files
`);
*/

  const formattedFiles: FormattedFileData[] = rawFiles.map((file) => ({
    id: file.id,
    name: file.name,
    creationDate: formatTimestamp(file.creation_date),
    modifyDate: formatTimestamp(file.modify_date),
    uploader: file.uploader,
    size: file.size,
    version: file.version,
    groups: file.groups,
    users: file.users.map((user) => ({
      ...user,
      groups: user.group,
    })),
  }));
  return {
    files: formattedFiles,
  };
};

export const fileDetailLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<FileDetailLoaderData> => {
  await requireAuth();
  const fileId = params.id;

  const { files } = await filesLoader();

  const currentFile =
    files.find((f) => String(f.id) === String(fileId)) || null;

  /*
  const [filesResponse, fileResponse] = await Promise.all([
    db.query(`SELECT * FROM files`),
    db.query(`SELECT * FROM files WHERE id = $1`, [fileId])
  ]);
  const files = formatFiles(filesResponse);
  const currentFile = fileResponse.length > 0 ? formatFiles([fileResponse[0]])[0] : null;
  */

  return {
    files,
    currentFile,
  };
};
