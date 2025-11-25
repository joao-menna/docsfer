import FriendsHeader from "@/components/features/relationship/Content/Friends/header";
import type { FriendsView } from "@/types/friendsView";
import { useState } from "react";

// TODO: trocar friendsHeader por novo component (groupsHeader)
export default function Group() {
  const [activeView, setActiveView] = useState<FriendsView>("all");
  return (
    <>
      <FriendsHeader activeView={activeView} onViewChange={setActiveView} />
    </>
  );
}
