import { CloudUpload, Bell } from "lucide-react";
import usePageName from "../hooks/usePageName";
import { useNavigate } from "react-router";
import * as Tooltip from "@radix-ui/react-tooltip";

export const PageHeader = () => {
  const pageName: string = usePageName();
  const navigate = useNavigate();

  const goToNewFile = () => {
    navigate("/newFile");
  };

  return (
    <Tooltip.Provider>
      <header className="flex items-center w-full h-12 font-josefin border-b border-gray-400 dark:border-zinc-700">
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
            <div className="inline-flex text-lg justify-center items-center size-8 text-gray-500 dark:text-zinc-700 [&_svg]:h-4">
              /
            </div>
            <h2 className="text-lg pt-0.5 font-semibold text-zinc-400">
              {pageName}
            </h2>
          </div>
          <div className="flex gap-4 items-center text-gray-800 dark:text-zinc-400">
            <div className="overflow-hidden flex  items-center rounded-full border border-zinc-400 dark:border-zinc-700">
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    id="upload"
                    type="button"
                    className="header-button__style group"
                    onClick={goToNewFile}
                  >
                    <div className="[&_svg]:h-5 [&_svg]:w-5">
                      <CloudUpload />
                    </div>
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-zinc-950 font-gabarito font-semibold text-zinc-400 border border-zinc-700 px-2 py-1 rounded text-sm shadow-lg"
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
                    className="bg-zinc-950 font-gabarito font-semibold text-zinc-400 border border-zinc-700 px-2 py-1 rounded text-sm shadow-lg"
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
    </Tooltip.Provider>
  );
};
