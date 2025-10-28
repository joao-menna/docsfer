import { X, File, Send, SquareMousePointer } from "lucide-react";
import Dropzone from "@/components/Dropzone";
import { useState, type FormEvent } from "react";
import { splitFile, extFromMime } from "@/hooks/utils/useFileExtension";
import { validateFilename } from "@/hooks/utils/useFilenameValidator";
import { motion } from "motion/react";

interface NewFileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewFileModal({ isOpen, onClose }: NewFileModalProps) {
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFiles = (files: File[]) => {
    if (!files?.length) return;
    const f = files[0];

    const { base, ext } = splitFile(f.name);
    setFileName(base);
    setFileExtension(ext || extFromMime(f.type) || "");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Implement file sharing logic
    if (!validateFilename(fileName)) {
      setErrorMessage(
        `file names cannot contain any of the following characters: "\\ / : * ? \\" < > |"`
      );
      return;
    } else {
      console.log(validateFilename);
    }
    console.log(`Sharing file ${fileName}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: "backOut",
      }}
    >
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -24, opacity: 0 }}
        transition={{
          duration: 0.6,
          ease: "backOut",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <X className="size-5 text-gray-400" />
        </button>

        {/* Modal content */}
        <div className="flex flex-col gap-2 px-6 py-4">
          <h2 className="font-josefin text-xl dark:text-zinc-400">
            Share a new File
          </h2>
          <div className="flex flex-col gap-8 w-full h-full justify-center items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 w-full px-8 py-8 rounded-xl"
            >
              {/* inputs + dropzone */}
              <div className="flex flex-col gap-8 w-full justify-between">
                {/* text inputs */}
                <div className="flex flex-col gap-2">
                  {/* top inputs */}
                  <fieldset className="flex gap-2 font-gabarito">
                    <div className="flex flex-col w-full font-gabarito">
                      <label className="block text-md text-lg text-gray-400 overflow-hidden">
                        File Name
                        <div className="relative mt-1">
                          {/* Input */}
                          <input
                            type="text"
                            placeholder="CoolFileName"
                            value={fileName}
                            className="peer w-full rounded-lg border-2 border-gray-700 py-2 pl-9
                 text-gray-100 placeholder:text-gray-500 focus:outline-none transition-all duration-150 ease-in bg-gray-700/50 focus:border-sky-500"
                            onChange={(e) => setFileName(e.target.value)}
                          />
                          {/* Left Icon */}
                          <File className="pointer-events-none absolute top-0 mt-3.5 left-3 size-5 opacity-70 stroke-gray-800 fill-gray-500 peer-focus:fill-sky-500! peer-focus:opacity-100 transition-all duration-150 ease-in" />
                          {/* File extension */}
                          {fileExtension && (
                            <span className="absolute right-4 top-0 mt-2.5 text-sky-500 pointer-events-none">
                              {fileExtension}
                            </span>
                          )}
                          {!fileExtension && (
                            <span className="absolute right-4 top-0 mt-2.5 text-gray-500 pointer-events-none">
                              .extension
                            </span>
                          )}
                        </div>
                      </label>
                    </div>
                  </fieldset>

                  {/* bottom inputs */}
                  <fieldset className="flex gap-4 font-gabarito">
                    <div className="flex flex-col w-full">
                      <div className="flex flex-col w-full font-gabarito">
                        <label className="block text-md text-lg text-gray-400 overflow-hidden">
                          Sender
                          <div className="relative mt-1">
                            {/* Input */}
                            <input
                              type="text"
                              placeholder="User or Group"
                              className="peer w-full rounded-lg border-2 border-gray-700 py-2 pl-9
                 text-gray-100 placeholder:text-gray-500 focus:outline-none transition-all duration-150 ease-in bg-gray-700/50 focus:border-sky-500"
                            />
                            {/* Left Icon */}
                            <Send className="pointer-events-none absolute top-0 mt-3.5 left-3 size-5 opacity-70 stroke-gray-500  peer-focus:stroke-sky-500! peer-focus:opacity-100 transition-all duration-150 ease-in" />
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex flex-col w-full font-gabarito">
                        <label className="block text-md text-lg text-gray-400 overflow-hidden">
                          Recipient
                          <div className="relative mt-1">
                            {/* Input */}
                            <input
                              type="text"
                              placeholder="User or Group"
                              className="peer w-full rounded-lg border-2 border-gray-700 py-2 pl-9
                 text-gray-100 placeholder:text-gray-500 focus:outline-none transition-all duration-150 ease-in bg-gray-700/50 focus:border-sky-500"
                            />
                            {/* Left Icon */}
                            <SquareMousePointer className="pointer-events-none absolute top-0 mt-3.5 left-3 size-5 opacity-70 stroke-gray-500  peer-focus:stroke-sky-500! peer-focus:opacity-100 transition-all duration-150 ease-in" />
                          </div>
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                {/* dropzone */}
                <div className="flex flex-col gap-2 font-gabarito">
                  <h2 className="text-xl dark:text-zinc-400">Select File</h2>
                  <Dropzone onFiles={handleFiles} />
                </div>
              </div>
              {errorMessage.length > 0 && (
                <div className="text-red-500 font-semibold">{errorMessage}</div>
              )}

              {/* Botões Enviar e Cancelar */}
              <div className="flex w-full justify-between gap-4 pt-4 font-gabarito">
                <button
                  type="submit"
                  className="rounded-lg py-2 px-4 w-full cursor-pointer text-gray-900 bg-sky-400 hover:bg-sky-500 font-bold tracking-widest transition-all duration-100 ease-out"
                >
                  Share
                </button>
                <button
                  type="button"
                  className="rounded-lg border px-4 py-2 w-full cursor-pointer border-red-500 text-red-500 outline-red-800 hover:bg-red-500/20 transition-all duration-100 ease-out font-bold tracking-widest"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
