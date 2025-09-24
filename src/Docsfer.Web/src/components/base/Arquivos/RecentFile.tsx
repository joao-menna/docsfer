import clsx from "clsx";
import { Ellipsis, File } from "lucide-react";
import { useState } from "react";

export default function RecentFile() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={clsx(
        "flex transition-all duration-200 ease-out flex-col bg-gray-950 border rounded-lg border-gray-700 items-center justify-start w-48 group",
        isClicked
          ? "shadow-[0_4px_16px_0px_rgba(14,165,233,0.25)] translate-y-0"
          : "hover:shadow-[0_8px_8px_-4px_rgba(0,0,0,1)] hover:-translate-y-1"
      )}
      onClick={() => setIsClicked(!isClicked)}
    >
      <div className="flex-center py-7 w-full">
        <File
          className={clsx(
            "transition-color duration-150 ease-in stroke-gray-950 size-8",
            isClicked ? "fill-sky-500" : "fill-gray-500"
          )}
        />
      </div>
      <div className="flex justify-between w-full px-2 py-1 text-gray-200 border-t gap-2 border-gray-700">
        <span className="font-gabarito truncate">ProjetoFigma.fig</span>
        <Ellipsis className="cursor-pointer" />
      </div>
    </div>
  );
}
