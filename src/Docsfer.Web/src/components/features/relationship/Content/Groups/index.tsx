import type { UserRelationship } from "@/types/relationship";
import { GroupCard } from "./GroupsCard";

export interface GroupWithUsers {
  id: string;
  name: string;
  users: UserRelationship[];
}

interface ContentProps {
  groups: GroupWithUsers[];
}

export function Content({ groups }: ContentProps) {
  return (
    <div className="px-6 w-full flex flex-col gap-6">
      {/* Cards row */}
      <div className="flex py-3 flex-wrap gap-4">
        {/* Create group card */}
        <GroupCard
          variant="create"
          onClick={() => console.log("open create group modal")}
        />

        {/* Existing groups as cards */}
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            variant="group"
            groupName={group.name}
            members={group.users.length}
            onClick={() => console.log("open group page for", group.id)}
          />
        ))}
      </div>
    </div>
  );
}
