import { UserIcon } from "@/components/UI/Button/UserIcon";

interface btnProps {
  sender: string;
  fileName: string;
}

export function bottomBtn({ sender, fileName }: btnProps) {
  return (
    <button
      type="button"
      className="flex items-center justfiy-between w-full p-1 group hover:bg-gray-800/40 rounded-lg  transition-colors duratin-75 ease-out"
    >
      {/* SECTION: user description
        ------------------------------ */}
      <div className="flex gap-2 items-center">
        {/* icon */}
        <UserIcon />
        {/* text */}
        <div className="flex flex-col items-start">
          <div className="flex gap-2 font-gabarito font-semibold text-gray-200 text-[1rem]">
            <h3>{sender}</h3>
          </div>
          <span className="text-gray-400 text-[0.875rem]">{fileName}</span>
        </div>
      </div>
    </button>
  );
}
