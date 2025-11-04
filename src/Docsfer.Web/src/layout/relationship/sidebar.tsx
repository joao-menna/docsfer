import { SidebarBottom } from "@/components/features/relationship/Sidebar/SidebarBottom";
import { SidebarTop } from "@/components/features/relationship/Sidebar/SidebarTop";

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full justify-start lg:w-96 gap-2 px-3 border-r border-gray-700">
      <SidebarTop />
      <SidebarBottom />
    </div>
  );
}
