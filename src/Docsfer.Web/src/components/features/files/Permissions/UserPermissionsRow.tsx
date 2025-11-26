import { useAvatar } from "@/hooks/useUserPfp";

function UserAccessRow({ name }: Readonly<{ name: string }>) {
  const safeName = name || "Usuário";
  const { src } = useAvatar({ seed: safeName });

  return (
    <div className="flex gap-8 w-full h-fit items-center">
      <img
        className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover"
        src={src}
        alt={`${safeName}'s avatar`}
        loading="lazy"
      />
      <div className="flex h-12 justify-between w-full text-zinc-500 items-center px-3 py-1 border-2 border-zinc-500 rounded-lg">
        <span className="font-gabarito pl-2">{safeName}</span>
      </div>
    </div>
  );
}
export default UserAccessRow;
