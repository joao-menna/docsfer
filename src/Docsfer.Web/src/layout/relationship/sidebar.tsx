import { SidebarBottom } from "@/components/features/relationship/Sidebar/SidebarBottom";
import { Sidebarheader } from "@/components/features/relationship/Sidebar/SidebarHeader";
import { SidebarTop } from "@/components/features/relationship/Sidebar/SidebarPages";
import type { UserInfo } from "@/services/auth/authService";

export default function Sidebar({ userId }: UserInfo) {
  return (
    <div className="flex flex-col">
      <Sidebarheader />
      <div className="flex flex-col height-atme-content justify-start lg:w-96 gap-2 px-3 border-r border-gray-800  overflow-y-auto truncate">
        <SidebarTop />
        <SidebarBottom userId={userId} />
      </div>
    </div>
  );
}
