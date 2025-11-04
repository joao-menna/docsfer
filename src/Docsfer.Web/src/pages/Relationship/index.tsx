import Sidebar from "@/layout/relationship/sidebar";
import { Outlet } from "react-router";
import FriendsHeader from "@/components/features/relationship/Content/Friends/header";

export default function RelationPage() {
  return (
    <div className="flex flex-col min-h-[calc(100dvh-3rem)] w-full">
      <FriendsHeader />
      {/* TODO: change the sidebar / header to make it so that the header is over the sidebar */}
      {/* TODO: change the h-full to resize based on header size */}
      <div className="flex h-full w-full">
        <Sidebar />
        {/* SECTION: Main Content
      --------------------------------------------- */}
        <div className="w-full flex flex-col justify-start items-start gap-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
