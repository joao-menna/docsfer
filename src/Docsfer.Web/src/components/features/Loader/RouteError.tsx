import { NavLink } from "react-router";

export const RouteError = () => {
  return (
    <div className="p-6 bg-zinc-950 h-dvh w-dvw flex flex-col justify-center items-center gap-4">
      <h2 className="text-4xl tracking-wider font-gabarito font-semibold text-red-400">
        Algo deu errado
      </h2>
      <span className="text-zinc-400 font-gabarito">
        <span>Recarregue a página (F5) ou</span>
        <NavLink
          to={"/dashboard"}
          className={`pl-2 text-zinc-300 hover:underline hover:text-zinc-100 transition-all duration-150`}
        >
          volte ao início.
        </NavLink>
      </span>
    </div>
  );
};
