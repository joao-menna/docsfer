import { FriendsRow } from "./rows";

export function friendsContent() {
  return (
    <div className="w-full flex justify-between px-2">
      {/* left-part */}
      <div className="flex flex-col items-start w-full">
        <div className="flex gap-2 font-gabarito font-semibold p-2 text-gray-200">
          <h3 className="">Todos</h3>
          <h3 className="">-</h3>
          <h3 className="">29</h3>
        </div>
        <div className="flex flex-col px-2 w-full">
          <FriendsRow />
        </div>
      </div>
      {/* right-part */}
      <div className=""></div>
    </div>
  );
}
