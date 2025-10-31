import { User } from "lucide-react";

export function bottomBtn() {
  return (
    <button
      type="button"
      className="flex items-center justfiy-between w-full p-1 group hover:bg-gray-800/40 rounded-lg"
    >
      {/* SECTION: user description
        ------------------------------ */}
      <div className="flex gap-2 items-center">
        {/* icon */}
        <div className="p-2 text-gray-400 rounded-full bg-gray-800/40 group-hover:bg-gray-800/80">
          <User />
        </div>
        {/* text */}
        <div className="flex flex-col items-start">
          <div className="flex gap-2 font-gabarito font-semibold text-gray-200 text-[1rem]">
            <h3>Você</h3>
            <h3>⇒</h3>
            <h3> Rodrigo</h3>
          </div>
          <span className="text-gray-400 text-[0.875rem]">
            ArquivoDaora.txt
          </span>
        </div>
      </div>
    </button>
  );
}
