import { FileChartColumn } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { File } from "@/types/search";
import { useNavigate } from "react-router";

interface FileSidebarProps {
  selectedFile: File | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (file: File) => void;
}

export default function FileSidebar({
  selectedFile,
  isOpen,
}: /* onClose, */
FileSidebarProps) {
  const navigate = useNavigate();
  if (!isOpen || !selectedFile) return null;

  const displayName = selectedFile.name ?? selectedFile.fileName ?? "Arquivo";
  const modified = selectedFile.modifyDate ?? selectedFile.createdAt ?? "—";
  const created = selectedFile.creationDate ?? selectedFile.createdAt ?? "—";
  const version = selectedFile.version ?? selectedFile.currentVersion ?? "—";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed right-0 top-12 h-[calc(100dvh-3rem)] w-xl bg-gray-900 shadow-[4px_8px_4px_8px_rgba(11,24,66,0.5)]"
      >
        <div className="flex flex-col items-center justify-between font-gabarito w-full h-full border-l border-gray-700 px-8 pb-12">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col w-full gap-5 items-center">
              <h1 className="pt-10 pb-4 border-b border-gray-700 w-full text-start font-josefin text-2xl text-gray-200">
                Detalhes do arquivo
              </h1>
              {/* card */}
              <div className="flex flex-col items-center gap-5 rounded-xl border border-gray-700">
                <div className="flex-center flex-col gap-3 px-20 pt-8 ">
                  <FileChartColumn className="size-32 stroke-gray-900 fill-gray-700" />
                  <span className="p-2 rounded-full bg-sky-500/20 text-sky-500">
                    leitor
                    {/* TODO: instead of 'leitor' get the logged user's permission */}
                  </span>
                </div>
                <div className="py-3 w-full flex flex-col border-t border-gray-700">
                  <h2 className="text-xl text-gray-300 text-center">
                    {displayName}
                  </h2>
                  <h3 className="text-gray-500 text-center">
                    {`Modificado em ${modified}`}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                className="text-gray-900 rounded-lg bg-sky-500 py-2 px-4 font-semibold hover:bg-sky-600"
                onClick={() => navigate(`/files/${selectedFile.id}`)}
              >
                Editar
              </button>
              <h1 className="py-4 border-b border-gray-700 w-full text-start font-josefin text-2xl text-gray-200">
                Sobre
              </h1>
            </div>
            <div className="flex flex-col w-full items-start gap-2">
              <div className="flex justify-between w-full">
                <span className="text-gray-500">Versão atual</span>
                <span className="text-gray-200">${version}</span>
              </div>
              <div className="flex justify-between w-full">
                <span className="text-gray-500">Versões totais</span>
                <span className="text-gray-200">
                  8 {/* TODO: will we implement this?*/}
                </span>
              </div>
              <div className="flex justify-between w-full">
                <span className="text-gray-500">Comentários</span>
                <span className="text-gray-200">
                  15 {/* TODO: will we implement this?*/}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between w-full">
              <span className="text-gray-500">Criado em</span>
              <span className="text-gray-200">{created}</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="text-gray-500">Criado por</span>
              <span className="text-gray-200">
                {selectedFile.uploader ?? "—"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
