import {
  X,
  File as FileIcon,
  Send,
  SquareMousePointer,
  Loader2,
} from "lucide-react";
import Dropzone from "@/components/UI/Dropzone";
import { useState } from "react";
import { motion } from "motion/react";
import { useFileColor } from "@/utils/files/useFileColor";
import clsx from "clsx";
import { useRecipientSuggestions } from "@/hooks/file/useSuggestions";
import { useNewFileUpload } from "@/hooks/file/useFileUpload";
/* import { useQuery } from "@tanstack/react-query"; */

interface ModalProps {
  onClose: () => void;
  currentUserId?: string;
}

export default function NewFileModal({ onClose, currentUserId }: ModalProps) {
  const {
    senderId,
    recipientId,
    fileName,
    fileExtension,
    isSubmitting,
    errorMessage,
    submitError,
    submitSuccess,
    setSenderId,
    setRecipientId,
    setFileName,
    handleFiles,
    handleSubmit,
  } = useNewFileUpload({ currentUserId });
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { filteredSuggestions } = useRecipientSuggestions(recipientId);

  const fileColor = useFileColor(fileExtension);

  return (
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
                          disabled={isSubmitting}
                          className="peer w-full rounded-lg border-2 border-gray-700 py-2 pl-9 text-gray-100 placeholder:text-gray-500 focus:outline-none transition-all duration-150 ease-in bg-gray-700/50 focus:border-sky-500 disabled:opacity-60 disabled:cursor-not-allowed"
                          onChange={(e) => setFileName(e.target.value)}
                        />
                        {/* Left Icon */}
                        <FileIcon className="pointer-events-none absolute top-0 mt-3.5 left-3 size-5 opacity-70 stroke-gray-800 fill-gray-500 peer-focus:fill-sky-500! peer-focus:opacity-100 transition-all duration-150 ease-in" />
                        {/* File extension */}
                        {fileExtension && (
                          <span
                            className={clsx(
                              `absolute right-4 top-0 mt-2.5 pointer-events-none ${fileColor} pointer-events-none`
                            )}
                          >
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
                      <label className="block text-md text-lg text-gray-400">
                        Sender
                        <div className="relative mt-1">
                          {/* Input */}
                          <input
                            type="text"
                            placeholder="User or Group"
                            value={senderId}
                            disabled={isSubmitting}
                            onChange={(event) =>
                              setSenderId(event.target.value)
                            }
                            className="peer w-full rounded-lg border-2 border-gray-700 py-2 pl-9 text-gray-100 placeholder:text-gray-500 focus:outline-none transition-all duration-150 ease-in bg-gray-700/50 focus:border-sky-500 disabled:opacity-60 disabled:cursor-not-allowed"
                          />
                          {/* Left Icon */}
                          <Send className="pointer-events-none absolute top-0 mt-3.5 left-3 size-5 opacity-70 stroke-gray-500 peer-focus:stroke-sky-500! peer-focus:opacity-100 transition-all duration-150 ease-in" />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full font-gabarito">
                      <label className="block text-md text-lg text-gray-400">
                        Recipient
                        <div className="relative mt-1">
                          {/* Input */}
                          <input
                            type="text"
                            placeholder="User or Group"
                            value={recipientId}
                            disabled={isSubmitting}
                            onChange={(event) => {
                              setRecipientId(event.target.value);
                              setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => {
                              setTimeout(() => setShowSuggestions(false), 200);
                            }}
                            className="peer w-full rounded-lg border-2 border-gray-700 py-2 pl-9 text-gray-100 placeholder:text-gray-500 focus:outline-none transition-all duration-150 ease-in bg-gray-700/50 focus:border-sky-500 disabled:opacity-60 disabled:cursor-not-allowed"
                          />
                          {/* Left Icon */}
                          <SquareMousePointer className="pointer-events-none absolute top-0 mt-3.5 left-3 size-5 opacity-70 stroke-gray-500 peer-focus:stroke-sky-500 peer-focus:opacity-100 transition-all duration-150 ease-in" />

                          {/* Autocomplete Dropdown */}

                          {showSuggestions &&
                            !recipientId &&
                            filteredSuggestions.length > 0 && (
                              <ul className="absolute z-10 mt-1 w-full rounded-lg border-2 border-gray-700 bg-gray-800 shadow-lg max-h-60 overflow-auto">
                                {filteredSuggestions.map(
                                  (suggestion, index) => (
                                    <li
                                      key={index}
                                      onClick={() => {
                                        setRecipientId(suggestion.user.id);
                                        setShowSuggestions(false);
                                      }}
                                      className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-gray-100 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                                    >
                                      <div className="font-medium">
                                        {suggestion.user.userName}
                                      </div>
                                      {/**
                                       * @param type - filter  if it's a user or a group
                                       */}
                                      {/* {suggestion.type && (
                                        <div className="text-sm text-gray-400">
                                          {suggestion.type}
                                        </div>
                                      )} */}
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                        </div>
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>

              {/* dropzone */}
              <div className="flex flex-col gap-2 font-gabarito">
                <h2 className="text-xl dark:text-zinc-400">Select File</h2>
                <Dropzone
                  onFiles={handleFiles}
                  multiple={false}
                  disabled={isSubmitting}
                />
              </div>
            </div>
            {errorMessage.length > 0 && (
              <div className="text-red-500 font-semibold">{errorMessage}</div>
            )}
            {submitError && (
              <div className="text-red-400 font-semibold">{submitError}</div>
            )}
            {submitSuccess && (
              <div className="text-emerald-400 font-semibold">
                {submitSuccess}
              </div>
            )}

            {/* Botões Enviar e Cancelar */}
            <div className="flex w-full justify-between gap-4 pt-4 font-gabarito">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg py-2 px-4 w-full cursor-pointer text-gray-900 bg-sky-400 hover:bg-sky-500 font-bold tracking-widest transition-all duration-100 ease-out disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    Sending
                  </span>
                ) : (
                  "Share"
                )}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                className="rounded-lg border px-4 py-2 w-full cursor-pointer border-red-500 text-red-500 outline-red-800 hover:bg-red-500/20 transition-all duration-100 ease-out font-bold tracking-widest disabled:opacity-70 disabled:cursor-not-allowed"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
