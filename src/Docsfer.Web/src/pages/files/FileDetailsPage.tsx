import { X } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import UserAccessRow from "@/components/features/files/Permissions/UserPermissionsRow";
import Table from "@/components/UI/Table/Table";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
import type { FileDetailLoaderData } from "@/types/files";
import { fileUploadService } from "@/services/files/fileBlobService";

export default function FileDetails() {
  const navigate = useNavigate();

  const { currentFile: file } = useLoaderData<FileDetailLoaderData>();

  const header = ["versão", "ações"];
  const versions = useMemo(
    () => [
      {
        version: "v1.0 (Atual)",
        modified: "15/05/2005 16:00",
        size: "16 MB",
      },
    ],
    []
  );

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

  const downloadFile = async () => {
    try {
      console.log(file);
      if (!file.relationshipId || !file.fileName) {
        console.error("Arquivo sem relationshipId ou fileName.");
        return;
      }
      const path = await fileUploadService.getPath(
        file.relationshipId,
        file.fileName,
        file.currentVersion ?? 0
      );
      if (path) {
        await fileUploadService.download(path, file.fileName);
      } else {
        console.error(`=================== No path found ===================`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex flex-col xl:flex-row xl:justify-between px-6 py-4">
        {/* file content */}
        <div className="flex flex-col gap-10 min-w-xl">
          {/* breadcrumbs */}
          <div className="flex font-gabarito text-gray-500 text-md gap-2">
            <button
              onClick={() => navigate("/files")}
              type="button"
              className="cursor-pointer hover:text-gray-400"
            >
              / files{" "}
            </button>
            <button type="button" disabled className="text-gray-700">
              / {file.fileName ?? "arquivo"}
            </button>
          </div>
          {/* TOP */}
          <div className="w-full flex items-start gap-4 flex-col">
            <div className="flex flex-col gap-5 w-full justify-start">
              {/* top header */}
              <div className="flex flex-col font-josefin gap-2">
                <h1 className="text-2xl text-sky-500">
                  {file.fileName ?? "Arquivo"}
                </h1>
                <h2 className="text-xl text-gray-400">{file.size}</h2>
              </div>
              {/* infos */}
              <div className="flex flex-col gap-5 pb-4 border-b-2 border-sky-800">
                <fieldset className="flex flex-col gap-2 text-zinc-200 font-gabarito">
                  <label htmlFor={file.fileName ?? "file-name"}>
                    Nome do arquivo
                  </label>
                  <input
                    id={file.fileName ?? "file-name"}
                    placeholder={file.fileName ?? "Arquivo"}
                    defaultValue={file.fileName ?? ""}
                    className="px-4 py-2 rounded-lg border border-zinc-400"
                  />
                </fieldset>
                <div className="flex flex-col gap-2 text-zinc-400 font-gabarito">
                  <span className="flex justify-between">
                    <span>Criação:</span>
                    <span className="text-sky-500">
                      {file.createdAt ?? "—"}
                    </span>
                  </span>
                  <span className="flex justify-between">
                    <span>Compartilhado por:</span>
                    <span className="text-sky-500">{file.uploader ?? "—"}</span>
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
                        <Table.Cell>
                          <button
                            className="cursor-pointer underline text-sky-500"
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
                  key={`${file.id}-group-${group.name}`}
                  className="flex justify-between text-zinc-500 items-center px-3 py-1 border-2 border-zinc-500 rounded-lg"
                >
                  <span className="font-gabarito pl-2">{group.name}</span>
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
              <div className="flex gap-8 w-full items-center">
                <UserAccessRow name={file.uploader ?? "—"} />
              </div>
            </div>
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
              className="w-full max-w-xl rounded-2xl bg-gray-900 text-gray-200 shadow-xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: -32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <header className="flex items-start justify-between p-4 border-b border-gray-800">
                <h4 className="font-josefin text-lg">{file.fileName}</h4>
                <X onClick={() => setFileVersion(null)} />
              </header>
              <section className="p-4 flex-center gap-4 flex-col">
                <span>
                  Versão:{" "}
                  <span
                    className={clsx(
                      `text-gray-500`,
                      editingFile?.version?.includes("atual") && "text-sky-500"
                    )}
                  >
                    {editingFile.version}
                  </span>
                </span>
                <span></span>
              </section>
              <footer className="p-4 flex justify-between  border-t border-gray-800 transition-all duration-300">
                {/* <button
                  type="button"
                  className="px-3 py-2 rounded-md text-red-500 border-2 border-red-500 hover:bg-red-500/50 transition-all duration-150 ease-out hover:text-white cursor-pointer"
                >
                  Apagar
                </button> */}

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 duration-150 ease-out cursor-pointer"
                    onClick={downloadFile}
                  >
                    Baixar
                  </button>
                  {/* <button
                    title="Retorna para a versão selecionada."
                    type="button"
                    disabled={editingFile?.version?.includes("atual")}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-sky-600 hover:bg-sky-500 duration-150 ease-out disabled:opacity-50 disabled:hover:bg-sky-600 disabled:cursor-not-allowed"
                  >
                    rollback
                    <RotateCcw />
                  </button> */}
                </div>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
