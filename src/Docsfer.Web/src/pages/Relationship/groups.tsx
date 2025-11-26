import FriendsHeader from "@/components/features/relationship/Content/Friends/header";
import type { FriendsView } from "@/types/friendsView";
import { useState } from "react";
import { useLoaderData } from "react-router";
import { Content } from "@/components/features/relationship/Content/Groups";
import type { GroupWithUsers } from "@/components/features/relationship/Content/Groups";

// TODO: trocar friendsHeader por novo component (groupsHeader)
export default function Group() {
  const { groups } = useLoaderData() as { groups: GroupWithUsers[] };

  const [activeView, setActiveView] = useState<FriendsView>("all");
  return (
    <>
      <FriendsHeader activeView={activeView} onViewChange={setActiveView} />

      <Content groups={groups} />
    </>
  );
}
