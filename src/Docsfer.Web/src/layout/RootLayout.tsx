import { PageHeader } from "../components/PageHeader";
import { PageAside } from "../components/PageAside";
import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <div className="min-h-dvh w-dvw bg-zinc-100 dark:bg-gray-900 overflow-hidden scrollbar-thin scrollbar-track-gray-900">
      <PageHeader />
      <main className="flex-1 overflow-auto relative h-[calc(100dvh-48px)] w-full">
        <PageAside />
        <div className="ml-16">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
