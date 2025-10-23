import Dropzone from "@/components/base/sharing/Dropzone";
import FileInput from "@/components/base/sharing/FileInput";
import { useNavigate } from "react-router";
import { File } from "lucide-react";

export default function SharingPage() {
  const navigate = useNavigate();
  const handleFiles = () => {
    console.warn("handle files --> implementar depois");
  };

  return (
    // TODO: create a modal that appears after you click on "Enviar" or "Cancelar"
    <div className="flex flex-col gap-2 px-6 py-4">
      <h2 className="font-josefin text-xl dark:text-zinc-400">
        Detalhes do novo arquivo
      </h2>
      <div className="flex flex-col gap-8 w-full h-full justify-center items-center">
        <form className="flex flex-col gap-5 w-fit">
          {/* inputs + dropzone */}
          <div className="flex flex-col gap-8 w-full justify-between">
            {/* text inputs */}
            <div className="flex flex-col gap-2">
              {/* top inputs */}
              <fieldset className="flex gap-2 font-gabarito">
                <div className="flex flex-col w-full font-gabarito">
                  <label className="block text-md text-lg text-gray-400 overflow-hidden">
                    Nome do arquivo
                    <div className="relative mt-1">
                      <input
                        type="text"
                        placeholder="SEM a extensão (.xlsx, .docx)"
                        className="w-full rounded-lg border-2 border-gray-500 py-2 pl-9
                 text-gray-100 placeholder:text-white/25 focus:outline-none transition-all duration-200 ease-out bg-gray-800 focus:border-sky-500 group"
                      />
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                        <File className="h-5 w-5 opacity-70 stroke-gray-800 fill-gray-500 group-focus:fill-sky-500" />
                      </span>
                    </div>
                  </label>
                  <FileInput
                    placeholder="SEM a extensão (.xlsx, .docx)"
                    label="Nome do Arquivo"
                  />
                </div>
                <div className="flex flex-col w-full">
                  {/* TODO: Mudar para um select do radixui */}
                </div>
              </fieldset>

              {/* bottom inputs */}
              <fieldset className="flex gap-2 font-gabarito">
                <div className="flex flex-col w-full">
                  <FileInput placeholder="Usuário ou Grupo" label="Remetente" />
                </div>
                <div className="flex flex-col w-full">
                  <FileInput
                    placeholder="Usuário ou Grupo"
                    label="Destinatário"
                  />
                </div>
              </fieldset>
            </div>
            {/* dropzone */}
            <div className="flex flex-col gap-2 font-gabarito">
              <h2 className="text-xl dark:text-zinc-400">Enviar arquivos</h2>
              <Dropzone onFiles={handleFiles} />
            </div>
          </div>
          {/* textbox */}
          {/* <div className="flex flex-col font-gabarito text-zinc-400">
            <h2>Descrição</h2>
            <textarea
              placeholder="An optional description..."
              className="rounded-lg border border-zinc-600 px-2 py-1"
              rows={6}
            ></textarea>
          </div> */}

          <div className="flex w-full justify-between font-gabarito">
            <button className="rounded-lg bg-sky-500 py-2 px-4">Enviar</button>
            <button
              className="rounded-lg border border-red-500 px-4 py-2 text-red-500 outline-red-800 cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
