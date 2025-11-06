import Sidebar from "@/layout/relationship/sidebar";
import { Outlet } from "react-router";

export default function RelationPage() {
  return (
    <div className="flex min-h-[calc(100dvh-3rem)] w-full overflow-hidden">
      <Sidebar />
      {/* SECTION: Main Content
      --------------------------------------------- */}
      <div className="w-full flex flex-col justify-start items-start">
        <Outlet />
      </div>
    </div>
  );
}
