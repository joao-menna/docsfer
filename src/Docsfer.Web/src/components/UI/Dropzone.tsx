import { useDropzone, type FileRejection, type Accept } from "react-dropzone";
import clsx from "clsx";
import { CheckLine, CircleSlash, ImageUp } from "lucide-react";
import { motion } from "motion/react";

type DZProps = {
  accept?: Accept;
  maxSize?: number;
  multiple?: boolean;
  disabled?: boolean;
  onFiles?: (files: File[]) => void;
  className?: string;
};

export default function Dropzone({
  accept = { "*": [] },
  maxSize = 64 * 1024 * 1024, // isso são 64 MB
  multiple = true,
  disabled = false,
  onFiles,
  className,
}: DZProps) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept,
    maxSize,
    multiple,
    disabled,
    onDrop: (accepted) => onFiles?.(accepted),
  });

  const dropClasses = clsx(
    "group relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 text-center transition outline-none",
    // base
    "bg-sky-600/10 border-sky-700 hover:border-sky-500 hover:shadow-[0_0_8px_4px_rgba(0,52,120,0.4)]",
    // focus/active
    (isFocused || isDragActive) &&
      "border-sky-500 bg-sky-500/10 ring-2 ring-sky-400 border-sky-500/0!",
    // accept/reject
    isDragAccept && "border-emerald-500 bg-emerald-500/10",
    isDragReject && "border-rose-500 bg-rose-500/10",
    // disabled
    disabled && "opacity-60 pointer-events-none",
    className
  );

  return (
    <div className="w-full space-y-4">
      <div {...getRootProps({ className: dropClasses })}>
        <input {...getInputProps()} />
        {/* icon */}
        {isDragAccept && <CheckLine className="stroke-emerald-400 size-8" />}
        {isDragReject && <CircleSlash className="stroke-rose-500 size-8" />}
        {!isDragReject && !isDragAccept && (
          <motion.div
            animate={{ y: [2, -2, 2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "backOut" }}
          >
            <ImageUp className="stroke-sky-500 size-8" />
          </motion.div>
        )}

        {/* text */}
        <div className="space-y-1">
          <p className="font-medium text-gray-100">
            {isDragReject ? "File type not allowed" : "Drag & drop files here"}
          </p>
          <p className="text-sm text-gray-400">
            or{" "}
            <span className="underline decoration-dotted">click to browse</span>
          </p>
        </div>

        {/* hint row */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400">
          <span className="rounded-full bg-gray-700/60 px-2 py-0.5">
            Max: {(maxSize / (1024 * 1024)).toFixed(0)}MB
          </span>
          {multiple ? (
            <span className="rounded-full bg-gray-700/60 px-2 py-0.5">
              Multiple files
            </span>
          ) : (
            <span className="rounded-full bg-gray-700/60 px-2 py-0.5">
              Single file
            </span>
          )}
        </div>
      </div>

      {/* accepted files preview */}
      {acceptedFiles.length > 0 && (
        <ul className="divide-y divide-gray-700/60 overflow-hidden rounded-xl border border-gray-700/60">
          {acceptedFiles.map((f) => (
            <li
              key={f.name}
              className="flex items-center gap-3 bg-gray-800/40 px-4 py-3"
            >
              {/* thumbnail for images */}
              {f.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(f)}
                  alt={f.name}
                  className="h-10 w-10 rounded-md object-cover"
                />
              ) : (
                <div className="grid h-10 w-10 place-items-center rounded-md bg-gray-700/70 text-gray-300">
                  📄
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-gray-100">{f.name}</p>
                <p className="text-xs text-gray-400">
                  {(f.size / 1024).toFixed(0)} KB • {f.type || "unknown"}
                </p>
              </div>
              <span className="text-xs text-gray-400">queued</span>
            </li>
          ))}
        </ul>
      )}

      {/* errors */}
      {fileRejections.length > 0 && (
        <div className="space-y-2 rounded-xl border border-rose-500/40 bg-rose-500/5 p-3">
          {fileRejections.map((rej: FileRejection) => (
            <div key={rej.file.name} className="text-sm text-rose-300">
              <span className="font-medium">{rej.file.name}</span>
              <ul className="list-inside list-disc text-rose-300/90">
                {rej.errors.map((e) => (
                  <li key={e.code}>{e.message}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
