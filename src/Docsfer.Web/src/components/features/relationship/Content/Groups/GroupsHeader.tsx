import { PersonStanding } from "lucide-react";

export default function GroupsHeader() {
  return (
    <div className="flex w-full gap-4 flex-col xl:flex-row justify-start items-start xl:items-center h-16 px-4  text-gray-200 xl:border-b border-gray-800">
      <div className="flex gap-4 p-2 items-center">
        <PersonStanding />
        <span className="font-gabarito font-semibold text-[1.25rem]">
          My Groups
        </span>
      </div>
      <div className="flex flex-wrap gap-4 lg:flex-nowrap lg:items-center">
        <div className="w-1/4 lg:w-auto">
          <button
            type="button"
            className={`rounded-lg px-4 py-2 text-nowrap font-semibold transition-colors duration-75 ease-out bg-gray-800/80 text-gray-200`}
          >
            All
          </button>
        </div>
      </div>
    </div>
  );
}
