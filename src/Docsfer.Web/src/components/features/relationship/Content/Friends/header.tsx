import { PersonStanding } from "lucide-react";
import HeaderBtn from "./header_btn";

// TODO: implement routing/filtering (probably routering) for this header

export default function friendsHeader() {
  return (
    <div className="flex w-full gap-4 flex-col xl:flex-row justify-start items-start xl:items-center h-16 px-4  text-gray-200 xl:border-b border-gray-800">
      <div className="flex gap-4 p-2 items-center">
        <PersonStanding />
        <span className="font-gabarito font-semibold text-[1.25rem]">
          My Friends
        </span>
      </div>
      <div className="flex flex-wrap gap-4 lg:flex-nowrap lg:items-center">
        <div className="w-1/4 lg:w-auto">
          <HeaderBtn text="Relationships" />
        </div>
        <div className="w-1/4 lg:w-auto">
          <HeaderBtn text="All Friends" />
        </div>
        <div className="w-1/4 lg:w-auto">
          <HeaderBtn text="Recent Interactions" />
        </div>
      </div>
    </div>
  );
}
