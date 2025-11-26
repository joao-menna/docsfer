import FriendsHeader from "@/components/features/relationship/Content/Friends/header";
import type { FriendsView } from "@/types/friendsView";
import { useState } from "react";
import { groupService } from "@/services/relationship/groups";

// TODO: trocar friendsHeader por novo component (groupsHeader)
export default function Group() {
  const [user, setUser] = useState("");
  const [groupId, setGroupId] = useState("");
  const [message, setMessage] = useState("");

  const addToGroup = async () => {
    try {
      const req = await groupService.insertUser(user, groupId);
      setMessage(req.message);
    } catch (error) {
      console.error(error);
      setMessage(`error: ${error}`);
    }
  };

  const [activeView, setActiveView] = useState<FriendsView>("all");
  return (
    <>
      <FriendsHeader activeView={activeView} onViewChange={setActiveView} />
      <div className="flex flex-col gap-8 w-[20dvw]">
        <label className="flex flex-col gap-1 text-gray-200 font-gabarito text-lg">
          user
          <input
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="text-gray-400 p-2 rounded-lg border border-sky-400"
          />
        </label>
        <label className="flex flex-col gap-1 text-gray-200 font-gabarito text-lg">
          group
          <input
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className="text-gray-400 p-2 rounded-lg border border-sky-400"
          />
        </label>

        <button
          type="submit"
          onClick={addToGroup}
          className="px-4 py-2 flex justify-center font-gabarito items-center bg-sky-400 text-gray-900 rounded-lg"
        >
          Link User
        </button>
        {groupId && (
          <span className="font-gabarito text-lg text-emerald-400">
            {message}
          </span>
        )}
      </div>
    </>
  );
}
