import { FriendsRow } from "./rows";
import { useLoaderData, useNavigate } from "react-router";
import CardComponent from "@components/features/files/CardView_Card";
import type { File } from "@/types/search";
import type { UserInfo } from "@/services/auth/authService";

type LoaderData = {
  files: File[];
  user: UserInfo;
};

export function FriendsContent() {
  const { files } = useLoaderData<LoaderData>();

  const navigate = useNavigate();

  const handleFileClick = (file: File) => {
    navigate(`/files/${file.id}`);
  };

  const recentFiles = files
    .sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    )
    .slice(0, 4);

  return (
    <div className="flex w-full flex-row flex-wrap justify-between height-atme-content px-2 overflow-hidden">
      {/* left-part */}
      <section className="flex flex-col items-start w-fit min-w-md h-full overflow-y-auto lg:min-w-xl xl:min-w-3xl md:min-w-sm py-4 scrollbar-gutter-stable">
        <div className="flex gap-2 font-gabarito font-semibold text-gray-200 px-2 pb-4">
          <h3 className="">Everyone</h3>
          <h3 className="">-</h3>
          <h3 className="">29</h3>
        </div>
        <div className="flex flex-col px-2 w-full">
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
        </div>
      </section>
      {/* right-part */}
      <section className="flex flex-col gap-10 xl:min-w-sm border-l height-atme-content px-7 border-gray-800 py-4">
        <h2 className="font-gabarito text-xl text-gray-200 w-full">
          Sent Recently
        </h2>
        <div className="flex flex-col gap-8 w-full xl:min-w-md">
          {recentFiles.map((file) => (
            <CardComponent
              key={file.id}
              file={file}
              onFileClick={handleFileClick}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
