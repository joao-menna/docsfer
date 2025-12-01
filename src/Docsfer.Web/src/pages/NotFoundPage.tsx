import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate("/");
  };
  return (
    <div className="w-dvw h-dvh relative bg-zinc-950 gap-4 flex flex-col justify-center items-center">
      <div className=" flex justify-center fixed top-2/5 items-center font-gabarito tracking-widest text-2xl text-zinc-400">
        <div className="border-r-2 border-zinc-400 px-4 py-2">400</div>
        <div className="px-4 py-2">Bad Request.</div>
      </div>
      <button type="button" onClick={handleRoute} className="group">
        <span className="flex items-end text-zinc-500 hover:text-zinc-600 shadow-md shadow-white/20 px-2 py-1 rounded-xl transition-all duration-300  hover:shadow-white/30 ease-out group-focus:shadow-none group-focus:pt-4 group-focus:text-white">
          Back to login.
        </span>
      </button>
    </div>
  );
}
