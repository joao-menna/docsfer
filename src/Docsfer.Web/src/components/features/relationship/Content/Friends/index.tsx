import { FriendsRow } from "./rows";
import { useLoaderData, useNavigate } from "react-router";
import CardComponent from "@components/features/files/CardView_Card";
import type { File } from "@/types/search";
import type { UserInfo } from "@/services/auth/authService";
import type { FriendsView } from "@/types/friendsView";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import clsx from "clsx";
import { relationshipService } from "@/services/relationship/newRelationship";
import { useToast } from "@/utils/toast/useToastContext";
import { type ToastSeverity } from "@/types/toast";
import type { UserRelationship } from "@/types/relationship";

type FriendsContentProps = {
  activeView: FriendsView;
};

type LoaderData = {
  files: File[];
  user: UserInfo;
};

type AddFriendForm = {
  partyOne: string;
  partyTwo: string;
};

export function FriendsContent({ activeView }: FriendsContentProps) {
  const { files, user } = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [users, setUsers] = useState<UserRelationship[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<AddFriendForm>({
    partyOne: user.userId,
    partyTwo: "",
  });

  const isFormValid = formData.partyTwo.trim() !== "";

  const showToast = (title: string, detail: string, type: ToastSeverity) => {
    addToast({
      severity: type,
      summary: title,
      detail,
    });
  };

  const handleAddFriend = async (e: FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      showToast("Mandatory Field", "Please add your friends ID! :(", "error");
      return;
    }

    try {
      console.log(formData);
      await relationshipService.addFriend({
        partyOne: formData.partyOne,
        partyTwo: formData.partyTwo,
      });
      showToast("Success", "Friend added successfully!", "success");
      setFormData({ ...formData, partyTwo: "" });
    } catch (error) {
      showToast(
        "Error",
        `Sorry, we couldn't find your friend. Maybe try again later?`,
        "error"
      );
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const { users: fetchedUsers } =
          await relationshipService.getRelationship();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, partyTwo: event.target.value });
  };

  const handleFileClick = (file: File) => {
    navigate(`/files/${file.id}`);
  };

  const recentFiles = files
    .sort(
      (a, b) =>
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    )
    .slice(0, 4);

  const renderAddFriendView = () => (
    <div className="px-6 w-full flex flex-col gap-6">
      <div className="font-gabarito">
        <h1 className="text-2xl text-gray-200">Add a friend</h1>
        <span className="text-gray-400">
          You can add friends by inviting them by their docsfer ID.
        </span>
      </div>
      <form
        className="flex justify-between items-center h-16 w-full rounded-lg box-border bg-gray-800 focus-within:outline-2 focus-within:outline-sky-600 px-3 py-3"
        onSubmit={handleAddFriend}
      >
        <input
          className="box-border relative w-full font-gabarito text-gray-200 placeholder:text-gray-500 outline-none"
          placeholder="You can add friends by inviting them by their docsfer ID."
          onInput={handleInput}
          value={formData.partyTwo}
          onChange={(e) =>
            setFormData({ ...formData, partyTwo: e.target.value })
          }
        />
        <button
          type="submit"
          className={clsx(
            `h-full px-4 transition-all duration-150 ease-out font-gabarito rounded-lg text-nowrap box-border`,
            isFormValid ? "bg-sky-400 text-gray-900" : "bg-sky-900 text-sky-400"
          )}
          disabled={!isFormValid}
        >
          Add Friend
        </button>
      </form>
    </div>
  );

  const renderAllFriends = () => (
    <>
      <div className="flex gap-2 font-gabarito font-semibold text-gray-200 px-2 pb-4">
        <h3 className="">Everyone</h3>
        <h3 className="">-</h3>
        <h3 className="">{users.length}</h3>
      </div>
      <div className="flex flex-col px-2 w-full">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"></div>
          </div>
        ) : users.length === 0 ? (
          <span className="text-gray-400 text-center py-8">
            No friends yet!
          </span>
        ) : (
          users.map((user) => (
            <FriendsRow
              key={user.id}
              userName={user.username}
              email={user.email}
            />
          ))
        )}
      </div>
    </>
  );

  const renderRelationships = () => <div>Relationships</div>;
  const renderRecentFriends = () => <div>RecentFriends</div>;

  const renderContent = () => {
    switch (activeView) {
      case "relationships":
        return renderRelationships();
      case "recent":
        return renderRecentFriends();
      case "NewFriend":
        return renderAddFriendView();
      case "all":
      default:
        return renderAllFriends();
    }
  };

  return (
    <div className="flex w-full flex-row justify-between height-atme-content px-2 overflow-hidden">
      {/* left-part */}
      <section className="flex flex-col items-start flex-1 min-w-0 h-full overflow-y-auto lg:min-w-xl xl:min-w-3xl md:min-w-sm py-4 scrollbar-gutter-stable">
        {renderContent()}
      </section>
      {/* right-part */}
      <section className="flex flex-col gap-10 xl:min-w-sm border-l height-atme-content px-7 border-gray-800 py-4">
        <h2 className="font-gabarito text-xl text-gray-200 w-full">
          Sent Recently
        </h2>
        <div className="flex flex-col gap-8 w-full">
          {recentFiles.map((file) => (
            <CardComponent
              key={file.id}
              file={file}
              onFileClick={handleFileClick}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
