import { generateActivities } from "@/hooks/useMockData";
import { useMemo, useState } from "react";
import { NewCardTemplate } from "@/components/base/dashboard/NewCardTemplate";
import Table from "@/components/base/dashboard/Table";
import EditFileModal from "@/components/base/dashboard/EditFileModal";

type Person = { name: string };
type Group = { name: string };
type FileRow = {
  id: number;
  name: string;
  sharedWith: Person[];
  uploadedAt: string;
  groups: Group[];
  size: string;
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
        uploadedAt: "25/01/2025 16:00",
        groups: [{ name: "HR" }, { name: "Finance" }],
        size: "120 MB",
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
        uploadedAt: "02/02/2025 10:15",
        groups: [{ name: "HR" }, { name: "Admin" }, { name: "Marketing" }],
        size: "85 MB",
      },
      {
        id: 3,
        name: "budget.xlsx",
        sharedWith: [{ name: "John" }, { name: "John" }, { name: "John" }],
        uploadedAt: "10/02/2025 09:30",
        groups: [{ name: "Finance" }],
        size: "42 MB",
      },
      {
        id: 4,
        name: "contract.pdf",
        sharedWith: [
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
        ],
        uploadedAt: "15/02/2025 13:45",
        groups: [{ name: "Legal" }, { name: "HR" }, { name: "Admin" }],
        size: "5 MB",
      },
      {
        id: 5,
        name: "report.pdf",
        sharedWith: [
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
        ],
        uploadedAt: "20/02/2025 11:00",
        groups: [
          { name: "Admin" },
          { name: "HR" },
          { name: "Finance" },
          { name: "IT" },
        ],
        size: "200 MB",
      },
      {
        id: 6,
        name: "notes.txt",
        sharedWith: [
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
        ],
        uploadedAt: "01/03/2025 18:20",
        groups: [{ name: "Research" }, { name: "HR" }],
        size: "2 MB",
      },
      {
        id: 7,
        name: "design.png",
        sharedWith: [
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
        ],
        uploadedAt: "05/03/2025 15:40",
        groups: [
          { name: "Design" },
          { name: "Marketing" },
          { name: "Admin" },
          { name: "HR" },
          { name: "Finance" },
        ],
        size: "36 MB",
      },
      {
        id: 8,
        name: "video.mp4",
        sharedWith: [
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "John" },
          { name: "aaa" },
          { name: "John" },
        ],
        uploadedAt: "08/03/2025 21:10",
        groups: [
          { name: "Media" },
          { name: "HR" },
          { name: "Admin" },
          { name: "Finance" },
          { name: "Legal" },
          { name: "IT" },
        ],
        size: "950 MB",
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
            Bem-vindo de volta, Jaozin!
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
              <h3 className="inline-flex w-fit font-gabarito dark:text-sky-500 tracking-wider px-3 py-2 rounded-sm dark:bg-sky-500/20">
                Meus Arquivos
              </h3>
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

                          <Table.Cell>{file.uploadedAt}</Table.Cell>

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
            <section className="flex flex-col h-dvh"></section>
          </div>
        </div>
      </div>
      {editingFile && (
        <EditFileModal file={editingFile} onClose={() => setEditingId(null)} />
      )}
    </>
  );
};

export default DashboardPage;
