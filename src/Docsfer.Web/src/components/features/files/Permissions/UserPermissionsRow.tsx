function UserAccessRow({ name }: Readonly<{ name: string }>) {
  const safeName = name || "Usuário";

  return (
    <div className="flex gap-8 w-full h-fit items-center">
      <div className="flex h-12 justify-between w-full text-zinc-500 items-center px-3 py-1 border-2 border-zinc-500 rounded-lg">
        <span className="font-gabarito pl-2">{safeName}</span>
      </div>
    </div>
  );
}
export default UserAccessRow;
