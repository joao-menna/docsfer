import Sidebar from "@/layout/relationship/sidebar";
import { Outlet } from "react-router";
import { useLoaderData } from "react-router";
import type { LoaderData } from "@/types/files";

export default function RelationPage() {
  const { user } = useLoaderData<LoaderData>();

  return (
    <div className="flex min-h-[calc(100dvh-3rem)] w-full overflow-hidden">
      <Sidebar userId={user.userId} />
      {/* SECTION: Main Content
      --------------------------------------------- */}
      <div className="w-full flex flex-col justify-start items-start">
        <Outlet />
      </div>
    </div>
  );
}
