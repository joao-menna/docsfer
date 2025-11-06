import { useReducer } from "react";
import {
  House,
  Users,
  Folders,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { NavLink } from "react-router";
import clsx from "clsx";
import { asideReducer } from "@/utils/relationship/useAsideReducer";

export const PageAside = () => {
  const [state, dispatch] = useReducer(asideReducer, {
    isExpanded: false,
    isPinned: false,
    isKeepMinimized: false,
  });

  const menuItems = [
    { to: "/dashboard", icon: House, label: "Home", exact: true },
    { to: "/@me/", icon: Users, label: "Relationships" },
    { to: "/files", icon: Folders, label: "Shared Files" },
  ];

  const isOpen = state.isExpanded || state.isPinned;

  const sidebarWidth = state.isExpanded || state.isPinned ? "w-64" : "w-14";

  // TODO: IMPLEMENT LIGHT MODE FOR THE LOVE OF GOD
  return (
    <div className="fixed flex h-[calc(100dvh-48px)] z-40 bg-gray-200 dark:bg-gray-900">
      <aside
        className={clsx(
          "transition-all duration-200 ease-in-out flex flex-col relative border-r border-gray-700",
          sidebarWidth
        )}
        onMouseEnter={() => dispatch({ type: "ENTER" })}
        onMouseLeave={() => dispatch({ type: "LEAVE" })}
      >
        <nav className={`flex-1 p-2`}>
          <ul className="flex flex-col gap-2">
            {menuItems.map(({ to, icon: Icon, label, exact }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={!!exact}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center w-full py-1.5 px-2.5 gap-3 font-gabarito rounded-lg dark:hover:bg-gray-800 dark:text-gray-400 ",
                      {
                        "dark:bg-gray-800 dark:!text-gray-200": isActive,
                      }
                    )
                  }
                >
                  <Icon className="size-5 flex-shrink-0 " />
                  <span
                    className={clsx(
                      "p-0 m-0 transition-all duration-300 whitespace-nowrap",
                      {
                        "opacity-100 visible": isOpen,
                        "opacity-0 invisible": !isOpen,
                      }
                    )}
                  >
                    {label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col items-center justify-center w-14 dark:text-gray-400 pb-4 gap-1">
          <button
            className={clsx("p-2 dark:hover:bg-gray-800 rounded-lg", {
              "dark:text-gray-200 dark:bg-gray-800": state.isKeepMinimized,
            })}
            onClick={() => dispatch({ type: "KEEP_MINIMIZED" })}
          >
            <PanelLeftClose />
          </button>
          <button
            className={clsx("p-2 dark:hover:bg-gray-800 rounded-lg", {
              "dark:text-gray-200 dark:bg-gray-800": state.isPinned,
            })}
            onClick={() => dispatch({ type: "KEEP_PINNED" })}
          >
            <PanelLeftOpen />
          </button>
        </div>
      </aside>
    </div>
  );
};
