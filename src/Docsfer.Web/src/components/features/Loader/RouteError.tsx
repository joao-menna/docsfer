import { NavLink } from "react-router";

export const RouteError = () => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-red-500">Algo deu errado</h2>
      <p>
        Tente novamente ou
        <NavLink
          to={"/dashboard"}
          className="text-zinc-200 underline hover:text-zinc-400"
        >
          volte ao inicio.
        </NavLink>
      </p>
    </div>
  );
};
