import { generateActivities } from "@/utils/files/useMockData";
import { useMemo, useState } from "react";
import { NewCardTemplate } from "@components/features/dashboard/DashboardCard";
import Table from "@/components/UI/Table/Table";
import EditFileModal from "@/components/features/dashboard/EditFileModal";
import { AnimatePresence } from "motion/react";

type Person = { name: string };
type Group = { name: string };
type FileRow = {
  id: number;
  name: string;
  sharedWith: Person[];
  creationDate: string;
  groups: Group[];
  size: string;
  uploader?: string;
  modifyDate?: string;
  version: string;
};

const DashboardPage = () => {
  const recentActivities = useMemo(() => generateActivities(7), []);
  const headers = [
    "Arquivo",
    "Compartilhado com",
    "Data de Envio",
    "Grupos",
    "Tamanho",
    "Ações",
  ];

  // TODO: remove esse mock HORRIVEL

  const files = useMemo<FileRow[]>(
    () => [
      {
        id: 1,
        name: "docs.docx",
        sharedWith: [
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
        ],
        creationDate: "25/01/2025 16:00",
        groups: [{ name: "HR" }, { name: "Finance" }],
        size: "120 MB",
        modifyDate: "26/01/2025 16:00",
        uploader: "Jaozin2",
        version: "v2.0",
      },
      {
        id: 2,
        name: "presentation.pptx",
        sharedWith: [
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
        ],
        creationDate: "02/02/2025 10:15",
        groups: [{ name: "HR" }, { name: "Admin" }, { name: "Marketing" }],
        size: "85 MB",
        modifyDate: "26/01/2025 16:00",
        uploader: "Jaozin2",
        version: "v2.0",
      },
    ],
    []
  );

  const [editingId, setEditingId] = useState<number | null>(null);
  const editingFile = useMemo(
    () => files.find((f) => f.id === editingId) ?? null,
    [files, editingId]
  );

  return (
    <>
      <div className="relative z-10 min-h-[calc(100dvh-3rem)]">
        <div className="flex flex-col gap-2 px-6 py-4">
          <h2 className="font-josefin text-xl dark:text-zinc-400">
            Welcome back!
            {/* NEXT TODO: PEGAR PELO MENOS ESSE NOME REATIVAMENTE PELO AMOR DE DEUS */}
          </h2>
          <div className="flex flex-col gap-12">
            {/* ↓ Seção 1: Atividade recente ↓ */}
            <section className="flex flex-col pt-4 w-full gap-2 overflow-x-auto">
              <h3 className="inline-flex w-fit relative font-gabarito dark:text-sky-500 tracking-wider px-3 py-2 rounded-sm dark:bg-sky-500/20">
                Atividade Recente
              </h3>
              <div className="flex gap-12 w-fit ">
                {recentActivities.map((activity, index) => (
                  <NewCardTemplate
                    key={index}
                    {...activity}
                    receiver={activity.receiver ?? ""}
                    email={activity.mail ?? ""}
                  />
                ))}
              </div>
            </section>
            {/* ↓ Seção 2: Arquivos Enviados ↓ */}
            <section className="flex flex-col gap-2">
              <div className="flex gap-2">
                <h3 className="inline-flex w-fit font-gabarito dark:text-sky-500 tracking-wider px-3 py-2 rounded-sm dark:bg-sky-500/20">
                  Meus Arquivos
                </h3>
              </div>
              <div className="h-[25dvh] overflow-auto pr-2">
                <Table>
                  <Table.Head>
                    <Table.Row>
                      {headers.map((h) => (
                        <Table.HeaderCell key={h}>{h}</Table.HeaderCell>
                      ))}
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {files.map((file) => {
                      const sharedNames = file.sharedWith
                        .map((p) => p.name)
                        .join(", ");
                      return (
                        <Table.BodyRow key={file.id}>
                          <Table.BodyHeaderCell>
                            {file.name}
                          </Table.BodyHeaderCell>

                          <Table.Cell>
                            <div
                              className="max-w-xs w-fit text-zinc-500"
                              title={sharedNames}
                            >
                              {file.sharedWith.map((p, i) => (
                                <span key={`${file.id}-u-${i}`}>
                                  {" "}
                                  {p.name};
                                </span>
                              ))}
                            </div>
                          </Table.Cell>

                          <Table.Cell>{file.creationDate}</Table.Cell>

                          <Table.Cell>
                            {file.groups.map((g, i) => (
                              <span key={`${file.id}-g-${i}`}> {g.name};</span>
                            ))}
                          </Table.Cell>

                          <Table.Cell>{file.size}</Table.Cell>

                          <Table.Cell>
                            <button
                              className="cursor-pointer hover:underline text-sky-500"
                              onClick={() => setEditingId(file.id)}
                            >
                              Editar
                            </button>
                          </Table.Cell>
                        </Table.BodyRow>
                      );
                    })}
                  </Table.Body>
                </Table>
              </div>
            </section>
            {/* ↓ Seção 3: Todos os Arquivos ↓ */}
            <section className="flex flex-col gap-2">
              <h3 className="inline-flex w-fit font-gabarito text-sky-500 tracking-wider px-3 py-2 rounded-sm bg-sky-500/20">
                Compartilhados comigo
              </h3>
              <div className="h-[50dvh] overflow-auto pr-2"></div>
            </section>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {editingFile && (
          <EditFileModal
            file={editingFile}
            onClose={() => setEditingId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default DashboardPage;
