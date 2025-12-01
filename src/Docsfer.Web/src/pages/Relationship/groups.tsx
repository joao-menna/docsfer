import GroupsHeader from "@/components/features/relationship/Content/Groups/GroupsHeader";
import { useLoaderData } from "react-router";
import { Content } from "@/components/features/relationship/Content/Groups";
import type { GroupWithUsers } from "@/components/features/relationship/Content/Groups";

// TODO: trocar friendsHeader por novo component (groupsHeader)
export default function Group() {
  const { groups } = useLoaderData() as { groups: GroupWithUsers[] };
  return (
    <>
      <GroupsHeader />

      <Content groups={groups} />
    </>
  );
}
