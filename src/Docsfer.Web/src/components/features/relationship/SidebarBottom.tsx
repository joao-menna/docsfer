import { Plus } from "lucide-react";
import { bottomBtn as RouteBtn } from "./SidebarBottom_btn";

export function SidebarBottom() {
  return (
    <div className="flex flex-col justify-start font-gabarito text-[0.875rem] gap-4">
      {/* SECTION: title
            --------------------------------------- */}
      <div className="flex justify-between items-center text-gray-400">
        <span>Last submissions</span>
        <div className="p-1 rounded-lg hover:bg-gray-800/80 hover:text-gray-200">
          <Plus className="size-5" />
        </div>
      </div>
      {/* SECTION: users
            --------------------------------------- */}
      <div className="flex flex-col gap-0.5">
        <RouteBtn
          sender="Você"
          recipient="Rodrigo"
          fileName="ArquivoDaora.txt"
        />
        <RouteBtn
          sender="Ricardo"
          recipient="Henrique"
          fileName="ArquivoDaorasso.png"
        />
      </div>
    </div>
  );
}
