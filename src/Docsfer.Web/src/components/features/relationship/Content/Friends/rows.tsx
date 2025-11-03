import { UserIcon } from "@/components/UI/Button/UserIcon";
import { FilePlus2, History } from "lucide-react";

export function FriendsRow() {
  return (
    <div className="flex w-full h-16 justify-between items-center xl:max-w-4xl lg:max-w-2xl border-y group hover:bg-[#1a2133] border-gray-800 transition-all duration-200 ease-out friendRowHover hover:border-0">
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
        <div className="p-2 text-gray-400 rounded-full bg-gray-800/40 group-hover:bg-gray-800/80 border-gray-400">
          <History />
        </div>
        <div className="p-2 text-gray-400 rounded-full bg-gray-800/40 group-hover:bg-gray-800/80 border-gray-400">
          <FilePlus2 />
        </div>
      </div>
    </div>
  );
}
