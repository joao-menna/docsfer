import { X } from "lucide-react";
import { useLoaderData, useParams } from "react-router";
import UserAccessRow from "@/components/common/FileDetailsUser";

type Group = {
  name: string;
  permission: "read" | "write" | "admin";
};

type User = {
  name: string;
};

type File = {
  id: string;
  name: string;
  creationDate: string;
  modifyDate: string;
  uploader: string;
  groups?: Group[];
  users?: User[];
};

type LoaderData = {
  files: File[];
};

export default function FileDetails() {
  const { files } = useLoaderData<LoaderData>();
  const { fileId } = useParams();

  const file = files.find((f) => String(f.id) === String(fileId)) ?? files[0];
  // pra mockar a tela de erro só tirar o ?? files[0];

  if (!file) {
    return (
      <div className="w-dvw h-dvh flex items-center justify-center font-gabarito text-red-500/50">
        Nenhum arquivo encontrado, desculpe.
      </div>
    );
  }

  return (
    <div className="flex justify-between px-6 py-4">
      {/* file content */}
      <div className="flex flex-col gap-10 min-w-xl">file content</div>
      {/* file permissions */}
      <div className="flex flex-col gap-10 items-start min-w-xl lg:py-10">
        {/* GRUPOS */}
        <div className="flex flex-col w-full gap-6">
          <h1 className="font-josefin text-xl text-sky-500">
            Grupos com acesso
          </h1>

          <div className="flex flex-col gap-2">
            {file.groups?.map((group) => (
              <div
                key={fileId}
                className="flex justify-between text-zinc-500 items-center px-3 py-1 border-2 border-zinc-500 rounded-lg"
              >
                <span className="font-gabarito pl-2">{group.name}</span>
                <div className="transition-all duration-200 ease-out cursor-pointer hover:bg-zinc-950 rounded-full p-1 hover:text-red-700">
                  <X />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* USUÁRIOS */}
        <div className="flex flex-col w-full gap-6">
          <h1 className="font-josefin text-xl text-sky-500">
            Usuários com acesso
          </h1>
          <div className="flex flex-col gap-2">
            {file.users?.map((user) => (
              <div key={fileId} className="flex gap-8 w-full items-center">
                <UserAccessRow
                  key={`${file.id}-${user.name}`}
                  name={user.name}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <button className="py-2 px-4 hover:bg-sky-600 transition-colors duration-300 bg-sky-500 text-zinc-900 font-gabarito rounded-lg">
            enviar
          </button>
          <button className="py-2 px-4 border border-red-500 rounded-lg text-red-500 font-gabarito">
            cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
