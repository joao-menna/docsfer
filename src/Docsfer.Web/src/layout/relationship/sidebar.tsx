import { SidebarBottom } from "@/components/features/relationship/SidebarBottom";
import { SidebarTop } from "@/components/features/relationship/SidebarTop";

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-start lg:w-96 gap-2 px-4 border-r border-gray-700">
      <SidebarTop />
      <SidebarBottom />
    </div>
  );
}
