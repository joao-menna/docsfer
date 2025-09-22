import { X } from "lucide-react";
import { useAvatar } from "@/hooks/useUserPfp";

function UserAccessRow({ name }: Readonly<{ name: string }>) {
  const { src } = useAvatar({ seed: name });

  return (
    <div className="flex gap-8 w-full items-center">
      <img
        className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover"
        src={src}
        alt={`${name}'s avatar`}
        loading="lazy"
      />
      <div className="flex justify-between w-full text-zinc-500 items-center px-3 py-1 border-2 border-zinc-500 rounded-lg">
        <span className="font-gabarito pl-2">{name}</span>
        <div className="transition-all duration-200 ease-out cursor-pointer hover:bg-zinc-950 rounded-full p-1 hover:text-red-700">
          <X />
        </div>
      </div>
    </div>
  );
}
export default UserAccessRow;
