import { FriendsContent as Content } from "@/components/features/relationship/Content/Friends";
import FriendsHeader from "@/components/features/relationship/Content/Friends/header";
import { useState } from "react";
import type { FriendsView } from "@/types/friendsView";

export default function Friends() {
  const [activeView, setActiveView] = useState<FriendsView>("all");
  return (
    <>
      <FriendsHeader activeView={activeView} onViewChange={setActiveView} />
      <Content activeView={activeView} />
    </>
  );
}
