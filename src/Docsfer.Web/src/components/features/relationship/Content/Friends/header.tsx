import { PersonStanding, Plus } from "lucide-react";
import HeaderBtn from "./header_btn";

// TODO: implement routing/filtering (probably routering) for this header

export default function friendsHeader() {
  return (
    <>
      <div className="flex gap-4 p-2 items-center">
        <PersonStanding />
        <span className="font-gabarito font-semibold text-[1.25rem]">
          My Friends
        </span>
      </div>
      <div className="flex gap-4 ">
        <HeaderBtn text="Relationships" />
        <HeaderBtn text="All Friends" />
        <HeaderBtn text="Recent Interactions" />
        <button
          type="button"
          className="flex gap-2 items-center rounded-lg px-4 py-2 bg-sky-500 hover:bg-sky-600 font-semibold text-gray-200 hover:text-gray-100 transition-colors duratin-75 ease-out"
        >
          <span>Add New</span>
          <Plus className="size-5" />
        </button>
      </div>
    </>
  );
}
