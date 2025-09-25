import RecentFile from "@/components/base/Arquivos/RecentFile";
import { ChevronDown, List } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useLoaderData } from "react-router";
import type { File } from "@/types/search.ts";
import clsx from "clsx";
import { Table } from "lucide-react";
import ListView from "@components/base/Arquivos/ListView";
import GridView from "@components/base/Arquivos/GridView.tsx";

type LoaderData = {
  files: File[];
};

export default function AllFiles() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("list");

  const { files } = useLoaderData<LoaderData>();

  const toggleView = () => {
    setViewMode((prev) => (prev === "list" ? "grid" : "list"));
  };

  const handleNotFound = () => {
    navigate("/newFile");
  };

  return (
    <>
      <div className="flex flex-col gap-8 px-6 py-4">
        {/* Heading */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="font-josefin text-gray-200 text-3xl">Documentos</h1>
            <span className="text-gray-400 font-josefin">
              Documentos e arquivos enviados para você, ou por você.
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="flex flex-col gap-5 items-start">
          {/* Arquivos Recentes */}
          <div className="flex flex-col font-gabarito text-gray-200 gap-5 items-start">
            <h2 className="font-josefin text-lg">Arquivos Recentes</h2>
            <button
              type="button"
              className="flex-center px-4 py-2 gap-2 rounded-lg bg-gray-950 border-2 border-gray-700 cursor-pointer"
            >
              <span>Mais velhos primeiro</span>
              <ChevronDown />
            </button>
            <div className="flex gap-6 justify-start w-full">
              <RecentFile />
              <RecentFile />
              <RecentFile />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-4 px-6 py-4 w-full">
          <h2 className="font-josefin text-xl dark:text-zinc-200">Arquivos</h2>
          {/* Filters */}
          <div className="flex justify-between md:max-w-2xl lg:max-w-5xl w-full">
            <div className="flex gap-2 text-gray-500 font-gabarito">
              <div className="h-10 px-4 flex-center rounded-lg border border-gray-500">
                Tipo de arquivo
                <ChevronDown />
              </div>
              <div className="h-10 px-4 flex-center rounded-lg border border-gray-500">
                Encaminhado por
                <ChevronDown />
              </div>
              <div className="h-10 px-4 flex-center rounded-lg border border-gray-500">
                Nome
                <ChevronDown />
              </div>
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
                <ListView key="list" data={files} />
              ) : (
                <GridView key="grid" data={files} />
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
                onClick={handleNotFound}
                className="text-sky-300 hover:underline cursor-pointer"
              >
                enviar um novo arquivo
              </button>
              , ou peça para alguém compartilhar algum!
            </span>
          </div>
        </div>
      )}
    </>
  );
}
