import clsx from "clsx";
import {
  PersonStanding,
  FileInput,
  ComponentIcon,
  GalleryHorizontalEnd,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface btnProps {
  text: "Friends" | "Files" | "Groups" | "All Files";
  to: "" | "files" | "groups" | "allFiles";
}

// TODO: implement routing

export function RelationBtn({ text, to }: btnProps) {
  return (
    <NavLink
      to={`/@me/${to}`}
      className={({ isActive }) =>
        clsx(
          `flex w-full items-center justify-start gap-4 p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-gray-800/40 transition-colors duratin-75 ease-out font-gabarito font-semibold`,
          {
            "bg-gray-800 !text-gray-200": isActive,
          }
        )
      }
    >
      <div>
        {text == "Friends" && <PersonStanding />}
        {text == "Files" && <FileInput />}
        {text == "Groups" && <ComponentIcon />}
        {text == "All Files" && <GalleryHorizontalEnd />}
      </div>
      <span>{text}</span>
    </NavLink>
  );
}
