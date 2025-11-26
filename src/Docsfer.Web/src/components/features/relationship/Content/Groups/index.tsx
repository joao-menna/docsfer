import type { UserRelationship } from "@/types/relationship";

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
    <div className="w-full h-full flex flex-col gap-4">
      {groups.map((group) => (
        <div key={group.id} className="rounded-lg border border-gray-700 p-4">
          <div className="text-lg font-semibold text-gray-100">
            {group.name}
          </div>
          <ul className="mt-2 flex flex-col gap-2 text-gray-300">
            {group.users.length === 0 && (
              <li className="text-sm text-gray-500">
                No users in this group yet.
              </li>
            )}
            <div className="font-medium font-gabarito">
              {`${group.users.length} Users in group:`}
            </div>
            {group.users.map((user) => (
              <li key={user.id} className="flex">
                {user.email && (
                  <span className="text-sm text-gray-500">{user.email}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
