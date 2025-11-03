import { FriendsRow } from "./rows";
import CardComponent from "@components/features/files/CardView_Card";

export function FriendsContent() {
  return (
    <div className="w-full flex justify-between px-2">
      {/* left-part */}
      <div className="flex flex-col items-start w-full">
        <div className="flex gap-2 font-gabarito font-semibold p-2 text-gray-200">
          <h3 className="">Everyone</h3>
          <h3 className="">-</h3>
          <h3 className="">29</h3>
        </div>
        <div className="flex flex-col px-2 w-full">
          <FriendsRow />
          <FriendsRow />
          <FriendsRow />
        </div>
      </div>
      {/* right-part */}
      <div className="flex flex-col gap-10 xl:w-sm">
        <h2 className="font-gabarito text-xl text-gray-200">Sent Recently</h2>
        <div className="flex flex-col gap-8 w-full">
          {/* <CardComponent
            file={files[0]}
            onFileClick={() => console.log("alo")}
            isSelected={false}
          /> */}
        </div>
      </div>
    </div>
  );
}
