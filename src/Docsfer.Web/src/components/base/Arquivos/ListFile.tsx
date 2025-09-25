import { Ellipsis, FileChartColumn } from "lucide-react";
import { getFileTypeLabel } from "@hooks/useFileType";
import type { File } from "@/types/search";

type FileProps = {
  file: File;
};

export default function ListFile({ file }: FileProps) {
  const fileType = getFileTypeLabel(file.name);
  return (
    <div className="flex flex-col cursor-pointer gap-6 px-6 py-4 group rounded-lg border border-gray-700 bg-[linear-gradient(135deg,#030712,#070B16)] font-gabarito text-gray-200 max-w-md hover:-translate-y-1 hover:shadow-[0_8px_8px_-4px_rgba(0,0,0,1),0_4px_16px_0px_rgba(14,165,233,0.25)] transition-all duration-300">
      <div className="flex flex-col items-start gap-3 lg:min-w-sm">
        <div className="flex justify-between w-full">
          <div className="flex gap-5">
            <div className="flex-center size-14 bg-sky-700 rounded-lg">
              <FileChartColumn className="fill-gray-200 stroke-sky-700" />
            </div>
            <div className="flex flex-col justify-end gap-2">
              <h2 className="text-lg">{file.name}</h2>
              <h3 className="uppercase text-gray-500">{fileType}</h3>
            </div>
          </div>
          <div className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 size-10 rounded-full hover:shadow-[0px_0px_4px_8px_rgba(14,165,233,0.25)] flex-center">
            <Ellipsis className="stroke-gray-200" />
          </div>
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
        <span className="py-1.5 px-4 rounded-4xl bg-sky-500/20 border border-sky-500/20">
          {`v${String(file.version.toFixed(1))}`}
        </span>
      </div>
    </div>
  );
}
