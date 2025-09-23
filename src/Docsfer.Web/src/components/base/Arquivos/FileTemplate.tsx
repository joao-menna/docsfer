import { Folder, Ellipsis } from "lucide-react";
import { useFileColor } from "@hooks/useFileColor";
import clsx from "clsx";
import { useNavigate } from "react-router";

interface FileDetailProps {
  fileName: string;
  fileDate: string;
  fileSize: string;
  fileMajorVersion?: number;
  fileMinorVersion?: number;
  sharedBy: string;
}

export const FileTemplate = ({
  fileName,
  fileDate,
  fileSize,
  fileMajorVersion = 1,
  fileMinorVersion = 0,
  sharedBy,
}: FileDetailProps) => {
  const fileColor = useFileColor(fileName);
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate("/files/123");
  };

  function formatDate(dateStr: string) {
    const [day, month, year] = dateStr.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    const s = new Intl.DateTimeFormat("pt-br", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
      .format(date)
      .replaceAll(".", "");
    return s.replace(/\b\p{L}/gu, (m) => m.toUpperCase());
  }
  return (
    <div className="flex flex-col justify-between  gap-16 rounded-lg bg-zinc-200 dark:bg-zinc-950 w-82">
      {/* top part from figma */}
      <div className="flex flex-col justify-between w-full">
        {/* icon + more (ellipsis) */}
        <div className="flex justify-between p-3">
          <Folder
            className={clsx("stroke-current fill-current size-8", fileColor)}
          />
          <Ellipsis className="text-zinc-200 hover:cursor-pointer" />
        </div>
        <div
          className="flex flex-col gap-2 justify-start items-start px-3"
          title={fileName}
        >
          <h3 className="font-gabarito text-xl text-zinc-200 line-clamp-2 break-words w-full">
            {fileName}
          </h3>
          <div className="flex flex-col text-zinc-400 font-gabarito text-sm">
            <p>
              {formatDate(fileDate)} - {fileSize}
            </p>
            <p>
              Ver. {fileMajorVersion}.{fileMinorVersion}
            </p>
          </div>
        </div>
      </div>
      {/* bottom part from figma */}
      <div className="flex justify-between p-3 items-center">
        <button
          type="button"
          className="hover:cursor-pointer px-2.5 py-1.5 bg-sky-500 hover:bg-sky-400 shadow-[0px_0px_8px_4px] shadow-sky-500/25 hover:shadow-sm rounded-sm text-zinc-950 font-gabarito tracking-wider transition-all duration-200 ease-out"
          onClick={handleDetails}
        >
          Detalhes
        </button>
        <div className="flex flex-col font-gabarito justify-end items-end">
          <span className="font-light text-sm tracking-widest dark:text-zinc-400">
            Compartilhado por
          </span>
          <span className="text-lg dark:text-zinc-200">{sharedBy}</span>
        </div>
      </div>
    </div>
  );
};
