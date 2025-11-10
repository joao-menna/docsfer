import { Pencil, File as FileIcon, Files } from "lucide-react";
import { getFileTypeLabel } from "@/utils/files/fileCardDocType";
import type { File } from "@/types/search";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { type MouseEvent } from "react";

type FileProps = {
  file: File;
  isSelected?: boolean;
  onFileClick: (file: File) => void;
};

export default function ListFile({ file, isSelected, onFileClick }: FileProps) {
  const navigate = useNavigate();
  const fileType = getFileTypeLabel(file.name);

  const handleCardClick = (e: MouseEvent) => {
    e.stopPropagation();
    onFileClick(file);
  };

  const handleEditClick = (e: MouseEvent) => {
    e.stopPropagation();
    navigate(`/files/${file.id}`);
  };

  return (
    <div
      className={clsx(
        "flex flex-col cursor-pointer gap-6 px-6 py-4 group rounded-lg border border-gray-700 bg-[linear-gradient(135deg,#030712,#070B16)] font-gabarito text-gray-200 max-w-md   transition-all duration-300",
        isSelected
          ? "shadow-[0_4px_16px_0px_rgba(14,165,233,0.25)] translate-y-0 border-sky-500!"
          : "hover:shadow-[0_8px_8px_-4px_rgba(0,0,0,1)] hover:-translate-y-1"
      )}
      onClick={handleCardClick}
    >
      <div className="flex flex-col items-start gap-3">
        <div className="flex justify-between w-full">
          <div className="flex gap-5">
            <div
              className={clsx(
                "flex-center size-14 rounded-lg transition-colors duration-150 ease-out",
                isSelected ? "bg-sky-500" : "bg-sky-700"
              )}
            >
              <FileIcon
                className={clsx(
                  "fill-gray-200 transition-colors duration-150 ease-out",
                  isSelected ? "stroke-sky-500" : "stroke-sky-700"
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
            onClick={handleEditClick}
            className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 size-10 rounded-full hover:shadow-[0px_0px_8px_2px_rgba(14,165,233,0.25)] flex-center"
          >
            <Pencil className="stroke-gray-400 " />
          </button>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="py-2 px-4 rounded-lg bg-gray-600">{file.size}</span>
          <span className="text-gray-500">{file.modifyDate}</span>
        </div>
      </div>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2 items-center">
          <span className="flex-center size-8 rounded-full bg-sky-800 text-sky-400">
            R
          </span>
          <span>{file.uploader}</span>
        </div>
        <span
          className={clsx(
            "flex justify-center gap-2 items-center py-1.5 px-3 rounded-lg transition-colors duration-150 ease-out",
            isSelected ? "bg-sky-600" : "bg-sky-900"
          )}
        >
          <Files
            className="
          size-5"
          />
          {`v${String(file.version)}`}
        </span>
      </div>
    </div>
  );
}
