import { useEffect, useState } from "react";
import {
  getFilePreview,
  type PreviewResult,
} from "@/services/utils/getFilePreview";
import { X } from "lucide-react";
import { motion } from "motion/react";
import type { File } from "@/types/search";

type Props = {
  file: File;
  onClose: () => void;
};

export default function EditFileModal({ file, onClose }: Props) {
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr(null);

    getFilePreview(file.name)
      .then((res) => {
        if (alive) setPreview(res);
      })
      .catch(() => {
        if (alive) setErr("Falha ao carregar a pré-visualização.");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [file.name]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -16, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-3xl rounded-2xl bg-gray-900 text-gray-200 shadow-xl"
      >
        <header className="flex items-start justify-between p-4 border-b border-gray-800">
          <div className="space-y-1">
            <h4 className="font-semibold">{file.name}</h4>
            <p className="text-xs text-gray-400">
              {file.size} • Enviado em {file.creationDate}
            </p>
            <p className="text-xs text-gray-400">
              Grupos: {file.groups.map((g) => g.name).join(", ") || "—"}
            </p>
            <p className="text-xs text-gray-400 text-wrap">
              Compartilhado com:{" "}
              {file.sharedWith?.map((u) => u.name).join(", ") || "—"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="px-2 text-gray-400 hover:text-gray-100"
          >
            <X />
          </button>
        </header>

        {/* PREVIEW */}
        <section className="p-4 flex justify-center">
          {loading && (
            <div className="animate-pulse h-48 bg-gray-800/60 rounded-md" />
          )}
          {err && <p className="text-red-400 text-sm">{err}</p>}

          {!loading && !err && preview?.kind === "image" && (
            <img
              src={preview.url}
              alt={file.name}
              className="max-h-[60dvh] w-auto rounded-md"
            />
          )}

          {!loading && !err && preview?.kind === "video" && (
            <video
              src={preview.url}
              controls
              className="w-full max-h-[60dvh] rounded-md"
            />
          )}

          {!loading && !err && preview?.kind === "pdf" && (
            <iframe
              src={preview.url}
              className="w-full h-[60dvh] rounded-md"
              title={file.name}
            />
          )}

          {!loading && !err && preview?.kind === "text" && (
            <pre className="whitespace-pre-wrap text-sm leading-6 bg-gray-800/60 p-3 rounded-md">
              {preview.text}
            </pre>
          )}
        </section>

        <footer className="p-4 flex justify-between  border-t border-gray-800 transition-all duration-300">
          <button
            type="button"
            className="px-3 py-2 rounded-md text-red-500 border-2 border-red-500 hover:bg-red-500/50 transition-all duration-150 ease-out hover:text-white"
          >
            Apagar
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              className="px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 duration-150 ease-out"
            >
              Baixar
            </button>
            <button
              type="button"
              className="px-3 py-2 rounded-md bg-sky-600 hover:bg-sky-500 duration-150 ease-out"
            >
              Salvar
            </button>
          </div>
        </footer>
      </motion.div>
    </motion.div>
  );
}
