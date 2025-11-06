import { SidebarBottom } from "@/components/features/relationship/Sidebar/SidebarBottom";
import { Sidebarheader } from "@/components/features/relationship/Sidebar/SidebarHeader";
import { SidebarTop } from "@/components/features/relationship/Sidebar/SidebarPages";

export default function Sidebar() {
  return (
    <div className="flex flex-col">
      <Sidebarheader />
      <div className="flex flex-col height-atme-content justify-start lg:w-96 gap-2 px-3 border-r border-gray-800  overflow-y-auto">
        <SidebarTop />
        <SidebarBottom />
      </div>
    </div>
  );
}
