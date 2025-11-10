import { PersonStanding } from "lucide-react";
import HeaderBtn from "./header_btn";
import AddFriendBtn from "@components/features/relationship/Content/Friends/header_addFriends.tsx";
import type { FriendsView } from "@/types/friendsView";

type FriendsHeaderProps = {
  activeView: FriendsView;
  onViewChange: (view: FriendsView) => void;
};

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
        <AddFriendBtn
          isActive={activeView === "NewFriend"}
          onClick={() => onViewChange("NewFriend")}
        />
      </div>
    </div>
  );
}
