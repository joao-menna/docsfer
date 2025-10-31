import { Plus } from "lucide-react";
import { bottomBtn as RouteBtn } from "./SidebarBottom_btn";

export function SidebarBottom() {
  return (
    <div className="flex flex-col justify-start font-gabarito text-[0.875rem] gap-4">
      {/* SECTION: title
            --------------------------------------- */}
      <div className="flex justify-between items-center text-gray-400">
        <span>Last submissions</span>
        <Plus className="size-5" />
      </div>
      {/* SECTION: users
            --------------------------------------- */}
      <div className="flex flex-col gap-0.5">
        <RouteBtn />
      </div>
    </div>
  );
}
