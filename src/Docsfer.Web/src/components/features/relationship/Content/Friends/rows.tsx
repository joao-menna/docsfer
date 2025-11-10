import { UserIcon } from "@/components/UI/Button/UserIcon";
import { FilePlus2, History } from "lucide-react";

export function FriendsRow() {
  return (
    <div className="flex w-full h-16 justify-between items-center xl:max-w-4xl lg:max-w-2xl group hover:bg-[#1a2133] transition-all duration-200 ease-out friendRowHover hover:border-transparent box-border border-t border-gray-800">
      <div className="w-full flex gap-3 items-center">
        <UserIcon />
        <div>
          <h3 className="font-gabarito text-gray-200 font-semibold">
            Robertinho
          </h3>
          <span className="font-gabarito text-gray-400">Administração</span>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="size-10 flex items-center justify-center rounded-full transition-all duration-50 border ease-out  text-gray-400 bg-gray-800/40 group-hover:bg-gray-800/80 border-gray-800">
          <History className="size-6" />
        </div>
        <div className="size-10 flex items-center justify-center rounded-full transition-all border duration-50 ease-out text-sky-400 bg-sky-800/40 group-hover:bg-sky-800/80 hover:border-2 border-sky-400/25 hover:border-sky-400">
          <FilePlus2 className="size-6" />
        </div>
      </div>
    </div>
  );
}
