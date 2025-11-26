import { Plus } from "lucide-react";
import { bottomBtn as RouteBtn } from "./SidebarBottom_btn";
import { UserIcon } from "@/components/UI/Button/UserIcon";
import type { UserInfo } from "@/services/auth/authService";
import type { LoaderData } from "@/types/files";

type FileWithUserName = LoaderData["files"][number] & {
  relatedUserName: string;
};

type SidebarBottomProps = UserInfo & {
  files: FileWithUserName[];
};

export function SidebarBottom({ userId, files }: SidebarBottomProps) {
  const hasFiles = files.length > 0;
  console.log(files);
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col justify-start font-gabarito text-[0.875rem] gap-4">
        {/* SECTION: title
            --------------------------------------- */}
        <div className="flex justify-between items-center text-gray-400">
          <span>Last submissions</span>
          <div className="p-1 rounded-lg hover:bg-gray-800/80 hover:text-gray-200">
            <Plus className="size-5" />
          </div>
        </div>
        {/* SECTION: users
            --------------------------------------- */}
        <div className="flex flex-col gap-0.5">
          {hasFiles ? (
            files.map((file) => (
              <RouteBtn
                key={file.id}
                sender={file.relatedUserName ?? "desconhecido"}
                fileName={file.fileName ?? "arquivo"}
              />
            ))
          ) : (
            <span className="text-gray-500 text-sm">
              No files were shared yet.
            </span>
          )}
          {/* <RouteBtn
            sender="Ricardo"
            recipient="Henrique"
            fileName="ArquivoDaorasso.png"
          /> */}
        </div>
      </div>
      <div className="flex gap-4 items-center py-2">
        <UserIcon />
        <div className="">
          <h3 className="text-gray-200 font-semibold">Username</h3>
          {/* TODO: copy UID to clipboard on click */}
          <span
            title={userId}
            className="text-[0.875rem] text-gray-400 truncate max-w-96 select-all"
          >
            {userId}
          </span>
        </div>
      </div>
    </div>
  );
}
