import { RotateCcw, X } from "lucide-react";
import { useLoaderData, useParams } from "react-router";
import UserAccessRow from "@/components/common/FileDetailsUser";
import Table from "@/components/base/dashboard/Table";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx/lite";

type Group = {
  name: string;
  permission: "read" | "write" | "admin";
};

type User = {
  name: string;
};

type File = {
  id: string;
  name: string;
  creationDate: string;
  modifyDate: string;
  uploader: string;
  groups?: Group[];
  users?: User[];
};

type LoaderData = {
  files: File[];
};

export default function FileDetails() {
  const { files } = useLoaderData<LoaderData>();
  const { fileId } = useParams();
  const header = ["versão", "modificado", "tamanho", "ações"];
  const versions = [
    {
      version: "v2.2 (atual)",
      modified: "Ricardo em 24/05/2005 18:00",
      size: "20 MB",
    },
    {
      version: "v2.1",
      modified: "João em 20/05/2005 14:30",
      size: "19 MB",
    },
    {
      version: "v2.0",
      modified: "Maria em 18/05/2005 09:15",
      size: "18 MB",
    },
    {
      version: "v1.1",
      modified: "Ana em 16/05/2005 11:45",
      size: "17 MB",
    },
    {
      version: "v1.0",
      modified: "Carlos em 15/05/2005 16:00",
      size: "16 MB",
    },
  ];

  const file = files.find((f) => String(f.id) === String(fileId)) ?? files[0];
  // pra mockar a tela de erro só tirar o ?? files[0];
  const [fileVersion, setFileVersion] = useState<string | null>(null);

  const editingFile = useMemo(
    () => versions.find((v) => v.version === fileVersion) ?? null,
    [versions, fileVersion]
  );

  const isModalOpen = !!editingFile;
  useEffect(() => {
    if (isModalOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  if (!file) {
    return (
      <div className="w-dvw h-dvh flex items-center justify-center font-gabarito text-red-500/50">
        Nenhum arquivo encontrado, desculpe.
      </div>
    );
  }
  return (
    <>
      <div className="flex justify-between px-6 py-4">
        {/* file content */}
        <div className="flex flex-col gap-10 min-w-xl">
          {/* TOP */}
          <div className="w-full flex items-start gap-4 flex-col">
            <div className="flex flex-col gap-5 w-full justify-start">
              {/* top header */}
              <div className="flex flex-col font-josefin gap-2">
                <h1 className="text-2xl text-sky-500">Documento1.pdf</h1>
                <h2 className="text-xl text-zinc-400">120 MB</h2>
              </div>
              {/* infos */}
              <div className="flex flex-col gap-5 pb-4 border-b-2 border-sky-800">
                <fieldset className="flex flex-col gap-2 text-zinc-200 font-gabarito">
                  <label className="flex flex-col">
                    File name{""}
                    <input
                      placeholder="Document.pdf"
                      className="px-4 py-2 rounded-lg border border-zinc-400"
                    />
                  </label>
                </fieldset>
                <div className="flex flex-col gap-2 text-zinc-400 font-gabarito">
                  <span className="flex justify-between">
                    <span>Criação:</span>
                    <span className="text-sky-500">15/05/2005 16:00</span>
                  </span>
                  <span className="flex justify-between">
                    <span>Modificado:</span>
                    <span className="text-sky-500">15/05/2005 17:00</span>
                  </span>
                  <span className="flex justify-between">
                    <span>Compartilhado por:</span>
                    <span className="text-sky-500">Ricardo</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 font-gabarito w-full">
              <h1 className="text-2xl text-sky-500 font-josefin">
                Histórico de Versões
              </h1>
              <div>
                <Table>
                  <Table.Head>
                    <Table.Row>
                      {header.map((h) => (
                        <Table.HeaderCell key={h}>{h}</Table.HeaderCell>
                      ))}
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {versions.map((v) => (
                      <Table.BodyRow key={v.version}>
                        <Table.BodyHeaderCell>{v.version}</Table.BodyHeaderCell>
                        <Table.Cell>{v.modified}</Table.Cell>
                        <Table.Cell>{v.size}</Table.Cell>
                        <Table.Cell>
                          <button
                            className="cursor-pointer hover:underline text-sky-500"
                            onClick={() => setFileVersion(v.version)}
                          >
                            Editar
                          </button>
                        </Table.Cell>
                      </Table.BodyRow>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </div>
          </div>
          {/* BOTTOM */}
          <div></div>
        </div>
        {/* file permissions */}
        <div className="flex flex-col gap-10 items-start min-w-xl lg:py-10">
          {/* GRUPOS */}
          <div className="flex flex-col w-full gap-6">
            <h1 className="font-josefin text-xl text-sky-500">
              Grupos com acesso
            </h1>

            <div className="flex flex-col gap-2">
              {file.groups?.map((group) => (
                <div
                  key={`${fileId}-group-${group.name}`}
                  className="flex justify-between text-zinc-500 items-center px-3 py-1 border-2 border-zinc-500 rounded-lg"
                >
                  <span className="font-gabarito pl-2">{group.name}</span>
                  <div className="transition-all duration-200 ease-out cursor-pointer hover:bg-zinc-950 rounded-full p-1 hover:text-red-700">
                    <X />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* USUÁRIOS */}
          <div className="flex flex-col w-full gap-6">
            <h1 className="font-josefin text-xl text-sky-500">
              Usuários com acesso
            </h1>
            <div className="flex flex-col gap-2">
              {file.users?.map((user) => (
                <div
                  key={`${fileId}-user-${user.name}`}
                  className="flex gap-8 w-full items-center"
                >
                  <UserAccessRow
                    key={`${file.id}-${user.name}`}
                    name={user.name}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between w-full">
            <button className="py-2 px-4 hover:bg-sky-600 transition-colors duration-300 bg-sky-500 text-zinc-900 font-gabarito rounded-lg">
              Salvar
            </button>
            <button className="py-2 px-4 border border-red-500 rounded-lg text-red-500 font-gabarito">
              Cancelar
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {editingFile && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm font-gabarito flex items-center justify-center p-6"
            onClick={() => setFileVersion(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="w-full max-w-xl rounded-2xl bg-zinc-900 text-zinc-200 shadow-xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: -32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <header className="flex items-start justify-between p-4 border-b border-zinc-800">
                <h4 className="font-josefin text-lg">{file.name}</h4>
                <X onClick={() => setFileVersion(null)} />
              </header>
              <section className="p-4 flex-center gap-4 flex-col">
                <span>
                  Versão:{" "}
                  <span
                    className={clsx(
                      `text-zinc-500`,
                      editingFile?.version?.includes("atual") && "text-sky-500"
                    )}
                  >
                    {editingFile.version}
                  </span>
                </span>
                <span>Criada em: {editingFile.modified}</span>
              </section>
              <footer className="p-4 flex justify-between  border-t border-zinc-800 transition-all duration-300">
                <button
                  type="button"
                  className="px-3 py-2 rounded-md text-red-500 border-2 border-red-500 hover:bg-red-500/50 transition-all duration-150 ease-out hover:text-white cursor-pointer"
                >
                  Apagar
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 duration-150 ease-out cursor-pointer"
                  >
                    Baixar
                  </button>
                  <button
                    title="Retorna para a versão selecionada."
                    type="button"
                    disabled={editingFile?.version?.includes("atual")}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-sky-600 hover:bg-sky-500 duration-150 ease-out disabled:opacity-50 disabled:hover:bg-sky-600 disabled:cursor-not-allowed"
                  >
                    rollback
                    <RotateCcw />
                  </button>
                </div>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
