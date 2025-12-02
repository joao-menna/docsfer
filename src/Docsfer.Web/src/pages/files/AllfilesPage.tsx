import { ChevronDown, ChevronUp, List, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useLoaderData } from "react-router";
import type { File } from "@/types/search.ts";
import type { UserInfo } from "@/services/auth/authService";
import clsx from "clsx";
import { Table } from "lucide-react";
import ListView from "@/components/features/files/table_views/TableView";
import GridView from "@/components/features/files/table_views/CardView";
import { useFileSorting } from "@/utils/files/useFileSorting";
import FileSidebar from "@/layout/File_Sidebar";

type LoaderData = {
  files: File[];
  user: UserInfo;
};

export default function AllFiles() {
  const [viewMode, setViewMode] = useState("list");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { files } = useLoaderData<LoaderData>();
  const { sortedFiles, sortConfig, handleSort, clearSort } =
    useFileSorting(files);

  const toggleView = () => {
    setViewMode((prev) => (prev === "list" ? "grid" : "list"));
  };

  const handleFileClick = (file: File) => {
    if (selectedFile?.id === file.id && isSidebarOpen) {
      setSelectedFile(null);
      setIsSidebarOpen(false);
    } else {
      setSelectedFile(file);
      setIsSidebarOpen(true);
    }
  };

  const handleCloseSidebar = () => {
    setSelectedFile(null);
    setIsSidebarOpen(false);
  };

  const getSortIcon = (field: "fileName" | "uploader") => {
    if (sortConfig.field !== field) {
      return <ChevronDown className="size-4" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="size-4" />
    ) : (
      <ChevronDown className="size-4" />
    );
  };

  const getSortButtonStyles = (field: "fileName" | "uploader") => {
    const isActive = sortConfig.field === field;
    return clsx(
      "h-10 px-4 flex-center gap-2 rounded-lg border border-gray-500 cursor-pointer transition-all duration-200",
      isActive
        ? "bg-gray-950 text-gray-200 border-sky-500"
        : "text-gray-500 hover:bg-gray-800 hover:border-gray-400"
    );
  };

  return (
    <>
      <div className="flex flex-col gap-8 px-6 py-4 relative">
        {/* Heading */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="font-josefin text-xl dark:text-zinc-400">
              Documents shared by you, or with you.
            </h2>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4 px-6 py-4 w-full">
          <h2 className="font-josefin text-xl dark:text-zinc-200">Arquivos</h2>
          {/* Filters */}
          <div className="flex justify-between md:max-w-2xl lg:max-w-5xl w-full">
            <div className="flex gap-2 text-gray-500 font-gabarito">
              {/* <div className="h-10 px-4 flex-center rounded-lg border border-gray-500">
                Tipo de arquivo
                <ChevronDown />
              </div> */}
              <button
                type="button"
                onClick={() => handleSort("uploader")}
                className={getSortButtonStyles("uploader")}
              >
                Encaminhado por
                {getSortIcon("uploader")}
              </button>
              <button
                type="button"
                onClick={() => handleSort("fileName")}
                className={getSortButtonStyles("fileName")}
              >
                Nome
                {getSortIcon("fileName")}
              </button>
              {sortConfig.field && (
                <button
                  type="button"
                  onClick={clearSort}
                  className="size-10 flex-center rounded-lg border border-red-800 text-red-500 hover:bg-red-950 hover:border-red-500 transition-all duration-200 cursor-pointer"
                >
                  <X />
                </button>
              )}
            </div>
            <button
              onClick={toggleView}
              className={clsx("inline-flex rounded-md group cursor-pointer")}
            >
              <div
                className={clsx(
                  "px-4 py-2 h-10 text-gray-500 flex-center gap-2 transition-all duration-200 ease-out rounded-s-lg border border-gray-500",
                  viewMode === "grid"
                    ? "bg-gray-950 text-gray-200! hover:shadow-[0px_0px_8px_2px_rgba(14,165,233,0.25)]"
                    : "hover:bg-gray-800 hover:shadow-[0px_0px_8px_2px_rgba(0,0,0,1)]"
                )}
              >
                <Table />
                Grid
              </div>
              <div
                className={clsx(
                  "px-4 py-2 h-10 text-gray-500 transition-all duration-200 ease-out flex-center gap-2 rounded-e-lg border border-gray-500",
                  viewMode === "list"
                    ? "bg-gray-950 text-gray-200! hover:shadow-[0px_0px_8px_2px_rgba(14,165,233,0.25)]"
                    : "hover:bg-gray-800 hover:shadow-[0px_0px_8px_2px_rgba(0,0,0,1)]"
                )}
              >
                <List />
                List
              </div>
            </button>
          </div>
          <motion.div layout className="relative max-w-5xl">
            <AnimatePresence mode="wait">
              {viewMode === "list" ? (
                <ListView
                  key="list"
                  data={sortedFiles} /* onFileClick={handleFileClick} */
                />
              ) : (
                <GridView
                  key="grid"
                  data={sortedFiles}
                  selectedFileId={selectedFile?.id}
                  onFileClick={handleFileClick}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      {files.length === 0 && (
        <div className="flex-center flex-col gap-24 w-full h-[calc(100dvh-8rem)]">
          <img src="/not-found.svg" alt="nothing found" className="max-w-82" />
          <div className="flex-center flex-col gap-2">
            <span className="font-josefin text-sky-300 text-4xl font-extrabold tracking-wider">
              Não encontramos nada! :(
            </span>
            <span className="font-gabarito  text-sky-100">
              Tente{" "}
              <button
                type="button"
                className="text-sky-300 hover:underline cursor-pointer"
              >
                {/* TODO: ABRIR O MODAL DE ENVIAR NOVO ARQUIVO AQUI */}
                enviar um novo arquivo
              </button>
              , ou peça para alguém compartilhar algum!
            </span>
          </div>
        </div>
      )}
      <FileSidebar
        selectedFile={selectedFile}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </>
  );
}
