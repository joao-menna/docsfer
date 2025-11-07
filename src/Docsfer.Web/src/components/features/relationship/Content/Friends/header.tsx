import { PersonStanding, Plus } from "lucide-react";
import HeaderBtn from "./header_btn";
import type { FriendsView } from "@/types/friendsView";

type FriendsHeaderProps = {
  activeView: FriendsView;
  onViewChange: (view: FriendsView) => void;
};

// TODO: implement routing/filtering (probably routering) for this header

export default function friendsHeader({
  activeView,
  onViewChange,
}: FriendsHeaderProps) {
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
          <HeaderBtn
            text="Relationships"
            isActive={activeView === "relationships"}
            onClick={() => onViewChange("relationships")}
          />
        </div>
        <div className="w-1/4 lg:w-auto">
          <HeaderBtn
            text="All Friends"
            isActive={activeView === "all"}
            onClick={() => onViewChange("all")}
          />
        </div>
        <div className="w-1/4 lg:w-auto">
          <HeaderBtn
            text="Recent Interactions"
            isActive={activeView === "recent"}
            onClick={() => onViewChange("recent")}
          />
        </div>
        <button
          type="button"
          className="flex justify-center items-center px-4 py-2 rounded-lg bg-sky-400 font-gabarito text-gray-800  gap-2 transition-all duration-100 ease-out hover:bg-sky-500"
        >
          Add friend
          <Plus className="size-5" />
        </button>
      </div>
    </div>
  );
}
