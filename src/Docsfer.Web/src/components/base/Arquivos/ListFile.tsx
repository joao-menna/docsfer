import { Ellipsis, FileChartColumn } from "lucide-react";
import { getFileTypeLabel } from "@hooks/useFileType";
import type { File } from "@/types/search";
import { useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router";

type FileProps = {
  file: File;
};

export default function ListFile({ file }: FileProps) {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const fileType = getFileTypeLabel(file.name);
  return (
    <button
      type="button"
      className={clsx(
        "flex flex-col cursor-pointer gap-6 px-6 py-4 group rounded-lg border border-gray-700 bg-[linear-gradient(135deg,#030712,#070B16)] font-gabarito text-gray-200 max-w-md   transition-all duration-300",
        isClicked
          ? "shadow-[0_4px_16px_0px_rgba(14,165,233,0.25)] translate-y-0 border-sky-500!"
          : "hover:shadow-[0_8px_8px_-4px_rgba(0,0,0,1)] hover:-translate-y-1"
      )}
      onClick={() => setIsClicked(!isClicked)}
    >
      <div className="flex flex-col items-start gap-3 lg:min-w-sm">
        <div className="flex justify-between w-full">
          <div className="flex gap-5">
            <div
              className={clsx(
                "flex-center size-14 rounded-lg transition-colors duration-150 ease-out",
                isClicked ? "bg-sky-500" : "bg-sky-700"
              )}
            >
              <FileChartColumn
                className={clsx(
                  "fill-gray-200 transition-colors duration-150 ease-out",
                  isClicked ? "stroke-sky-500" : "stroke-sky-700"
                )}
              />
            </div>
            <div className="flex flex-col justify-end items-start gap-2">
              <h2 className="text-lg max-w-full truncate" title={file.name}>
                {file.name}
              </h2>
              <h3 className="uppercase text-gray-500 max-w-full truncate">
                {fileType}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/files/${file.id}`)}
            className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 size-10 rounded-full hover:shadow-[0px_0px_4px_8px_rgba(14,165,233,0.25)]  flex-center"
          >
            <Ellipsis className="stroke-gray-200" />
          </button>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="py-2 px-4 rounded-4xl bg-[linear-gradient(135deg,#334145,#52656B)] border border-white/20">
            {file.size}
          </span>
          <span className="text-gray-500">{file.modifyDate}</span>
        </div>
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2 items-center">
          <span className="flex-center size-8 rounded-full bg-sky-500/20 text-sky-500">
            R
          </span>
          <span>{file.uploader}</span>
        </div>
        <span
          className={clsx(
            "py-1.5 px-4 rounded-4xl border transition-colors duration-150 ease-out",
            isClicked
              ? "bg-sky-500/50 border-sky-500"
              : "bg-sky-500/20 border-sky-500/20"
          )}
        >
          {`v${String(file.version.toFixed(1))}`}
        </span>
      </div>
    </button>
  );
}
