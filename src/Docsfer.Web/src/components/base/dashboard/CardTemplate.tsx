import { useFileColor } from "@hooks/useFileColor";
import { formatFileSize, formatDateToBR } from "@/hooks/useMockData";
import clsx from "clsx";

interface CardInfoProps {
  username: string;
  date: string;
  action: string;
  item: string;
  fileSize: number;
  receiver?: string;
}

const getUserInitials = (username: string): string => {
  return username
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 1);
};

const formatDate = (dateString: string): string => {
  try {
    if (dateString.includes("/")) {
      return dateString;
    }

    const date = new Date(dateString);
    return formatDateToBR(date, true);
  } catch {
    return dateString;
  }
};

export const CardTemplate = ({
  username,
  date,
  action,
  item,
  fileSize,
  receiver,
}: CardInfoProps) => {
  const initials = getUserInitials(username);
  const formattedDate = formatDate(date);
  const fileColor = useFileColor(item);

  return (
    <div className="flex flex-col w-fit justify-between gap-3 p-3 m-5 transition-all duration-300 ease-out rounded-lg border-2 border-dashed dark:border-sky-800 dark:bg-zinc-800 hover:scale-105">
      <div className="flex flex-col w-full">
        <div className="flex justify-between font-quicksand min-w-64 gap-3">
          <span className="text-zinc-200 text-lg font-semibold text-nowrap truncate">
            {username}
          </span>
          <span className="inline-flex justify-center items-center size-8! rounded-full uppercase font-semibold bg-sky-500 text-zinc-900">
            {initials}
          </span>
        </div>
        {/* DATA DE ENVIO */}
        <span className="font-gabarito text-sm text-zinc-400">
          {formattedDate} • {formatFileSize(fileSize)}
        </span>
      </div>
      <div className="inline-flex flex-wrap gap-1 font-gabarito dark:text-zinc-400">
        {/* Ação */}
        <span className="inline-flex gap-1">
          {action.toLowerCase()}
          <span
            className={clsx(
              "cursor-pointer underline truncate max-w-52",
              fileColor
            )}
            title={item}
          >
            {item}
          </span>
        </span>
        {/* Alvo */}
        {receiver && (
          <span className="inline-flex gap-1">
            com{" "}
            <span className="dark:text-zinc-200 underline cursor-pointer">
              {receiver}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};
