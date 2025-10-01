import Dropzone from "@/components/base/sharing/Dropzone";
import SwitchFileButton from "@/components/base/sharing/SwitchFileButton";
import FileInput from "@/components/base/sharing/FileInput";
import { useState } from "react";
import { usePermissions } from "@/hooks/useMockData";
import { SelectButton } from "@/components/common/SelectButton";

export default function SharingPage() {
  const [selectedPermission, setSelectedPermission] = useState("");
  const handleFiles = () => {
    console.warn("implementar depois");
  };

  const { getPermissionsForSelect } = usePermissions();

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
                <div className="flex flex-col w-full">
                  <FileInput
                    placeholder="Skip the extension (.xlsx, .docx ❌)"
                    label="File name"
                  />
                </div>
                <div className="flex flex-col w-full">
                  {/* TODO: Mudar para um select do radixui */}
                  <label className="text-zinc-400">Permissions</label>
                  <SelectButton
                    placeholder="Choose permissions"
                    value={selectedPermission}
                    onValueChange={setSelectedPermission}
                    options={getPermissionsForSelect()}
                  />
                </div>
              </fieldset>
              {/* toggle */}
              <div className="flex gap-2">
                <span className="text-zinc-400 font-gabarito">
                  Every user in the group?
                </span>{" "}
                <SwitchFileButton />
              </div>
              {/* bottom inputs */}
              <fieldset className="flex gap-2 font-gabarito">
                <div className="flex flex-col w-full">
                  <FileInput
                    placeholder="João, Gabriela, Ricardo..."
                    label="Users"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <FileInput placeholder="RH, Admin, TI" label="Goups" />
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
          <div className="flex flex-col font-gabarito text-zinc-400">
            <h2>Description</h2>
            <textarea
              placeholder="An optional description..."
              className="rounded-lg border border-zinc-600 px-2 py-1"
              rows={6}
            ></textarea>
          </div>

          <div className="flex w-full justify-between font-gabarito">
            <button className="rounded-lg bg-sky-500 py-2 px-4">Send</button>
            <button className="rounded-lg border border-red-500 px-4 py-2 text-red-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
