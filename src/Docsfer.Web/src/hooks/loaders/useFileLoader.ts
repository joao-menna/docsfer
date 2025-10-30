import { requireAuth } from "./useRequireAuth";
import type { LoaderFunctionArgs } from "react-router";
import type {
  FileDataFromDB,
  FilesLoaderData,
  FileDetailLoaderData,
} from "@/types/files";
import { formatFiles } from "../../utils/format/useFormatFiles";

// quando ligar no DB, torcar o rawFiles
const mockFiles: FileDataFromDB[] = [
  {
    id: "123",
    name: "Documento1.pdf",
    creation_date: "2025-04-15 16:00:00",
    modify_date: "2025-04-16 17:00:00",
    uploader: "Ricardo",
    size: "12 MB",
    version: 1.4,
    groups: [
      { name: "RH", permission: "write" },
      { name: "Administrativo", permission: "admin" },
    ],
    users: [
      { name: "Joao", email: "henrique@example.com", group: ["TI"] },
      { name: "Ricardo", email: "ricardo@example.com", group: ["Admin"] },
      { name: "Henrique", email: "henrique@example.com", group: ["Admin"] },
    ],
  },
  {
    id: "124",
    name: "Relatorio_Financeiro.xlsx",
    creation_date: "2025-03-10 09:00:00",
    modify_date: "2025-03-12 10:30:00",
    uploader: "Maria",
    size: "5 MB",
    version: 2.0,
    groups: [{ name: "Financeiro", permission: "admin" }],
    users: [
      { name: "Maria", email: "maria@example.com", group: ["RH"] },
      { name: "Carlos", email: "carlos@example.com", group: ["RH"] },
    ],
  },
];

export const filesLoader = async (): Promise<FilesLoaderData> => {
  const user = await requireAuth();
  const rawFiles = mockFiles;
  const files = formatFiles(rawFiles);
  return { files: files, user };
};

export const fileDetailLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<FileDetailLoaderData> => {
  await requireAuth();

  const { files, user } = await filesLoader();
  const fileId = params.id;
  const currentFile =
    files.find((f) => String(f.id) === String(fileId)) ?? null;
  return { files, currentFile, user };
};
