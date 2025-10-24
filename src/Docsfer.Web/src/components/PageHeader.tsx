import { CloudUpload, Bell } from "lucide-react";
import usePageName from "../hooks/usePageName";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useLoaderData, useNavigate } from "react-router";
import CommandPalette from "./CommandPalette";
import type { File } from "@/types/search";
import { useState } from "react";
import NewFileModal from "./FileModal";

type LoaderData = { files: File[] };

export const PageHeader = () => {
  const pageName: string = usePageName();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { files } = useLoaderData<LoaderData>();

  const normalized = files.map((f: { uploader: string }) => ({
    ...f,
    uploader: f.uploader ?? "Desconhecido",
  })) as File[];

  return (
    <Tooltip.Provider>
      <header className="flex items-center w-full h-12 font-josefin border-b border-gray-400 dark:border-gray-700">
        {/* header content */}
        <nav className="flex w-full px-4 justify-between items-center">
          <div className="inline-flex justify-center items-center">
            {/* logo */}
            <div className="flex justify-center items-center size-7">
              <img
                src="/images/logo_docspider.png"
                alt="logo"
                className="scale-75"
              />
            </div>
            {/* separator */}
            <div className="inline-flex text-lg justify-center items-center size-8 text-gray-500 dark:text-gray-700 [&_svg]:h-4">
              /
            </div>
            <h2 className="text-lg pt-0.5 font-semibold text-gray-400">
              {pageName}
            </h2>
          </div>
          <div className="flex gap-4 items-center text-gray-800 dark:text-gray-400">
            <CommandPalette
              files={normalized}
              onOpenFile={(id) => navigate(`/files/${id}`)}
            />
            <div className="overflow-hidden flex  items-center rounded-full border border-gray-400 dark:border-gray-700">
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    id="upload"
                    type="button"
                    className="header-button__style group"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <div className="[&_svg]:h-5 [&_svg]:w-5">
                      <CloudUpload />
                    </div>
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-gray-950 font-gabarito font-semibold text-gray-400 border border-gray-700 px-2 py-1 rounded text-sm shadow-lg"
                    sideOffset={5}
                  >
                    Upload new file
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>

              {/* Notifications Button with Tooltip */}
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    id="notifs"
                    type="button"
                    className="header-button__style"
                  >
                    <div className="[&_svg]:h-5 [&_svg]:w-5">
                      <Bell />
                    </div>
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-gray-950 font-gabarito font-semibold text-gray-400 border border-gray-700 px-2 py-1 rounded text-sm shadow-lg"
                    sideOffset={5}
                  >
                    Notifications
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </div>
            <span className="inline-flex items-center justify-center text-center uppercase rounded-full size-8  border-2 border-sky-900 text-sky-900 dark:border-sky-500 dark:text-sky-500 font-semibold cursor-pointer font-quicksand">
              J
            </span>
          </div>
        </nav>
      </header>
      <NewFileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Tooltip.Provider>
  );
};
