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
  email?: string;
}

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

export const NewCardTemplate = ({
  username,
  date,
  action = "downloaded",
  item = `test.pdf`,
  fileSize,
  receiver,
  email,
}: CardInfoProps) => {
  const formattedDate = formatDate(date);
  const fileColor = useFileColor(item);
  return (
    <div className="flex flex-col gap-8 w-96 px-1.5 pt-1.5 pb-3 mb-4 rounded-2xl border border-zinc-500">
      {/*Top content */}
      <div className=" w-full flex flex-col gap-1">
        {/*Top */}
        <div className=" flex flex-col w-full">
          {/*container */}
          <div className=" flex bg-sky-500/20 gap-3.5 h-fit px-3.5 py-2 rounded-[10px]">
            <img
              src="https://images.generated.photos/41gBeK4xEbwmwAxnyuGx4ODquk5jRJ_EOZPrD2Tp1Fo/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NzQ0NzMwLmpwZw.jpg"
              alt="logo"
              className="object-cover size-10 rounded-full"
            />
            {/*TextTop */}
            <div className=" flex flex-col gap-2 w-full">
              <div className=" flex justify-between w-full">
                <span
                  className=" max-w-40 w-full truncate text-amber-50 font-raleway font-semibold text-[20px] text-nowrap"
                  title={username}
                >
                  {username}
                </span>
                <div className="inline-flex items-center justify-center">
                  <span className="justify-start truncate inline-flex px-2 py-1 gap-2 rounded-[4px] bg-white/20 text-sky-500 ">
                    Administrativo
                  </span>
                </div>
              </div>
              {/*email*/}
              <div className="flex flex-col">
                <span className=" flex flex-col w-full font-gabarito text-[16px] text-zinc-500">
                  {email}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/*activity */}
        <div className=" flex gap-1 px-5 font-gabarito text-zinc-300">
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
          {receiver && (
            <>
              <span>para</span>
              <span className="underline">{receiver}</span>
            </>
          )}
        </div>
      </div>
      {/*baixo */}
      <div className="flex flex-col">
        <div className="flex w-full justify-between px-5 font-gabarito text-[1rem]">
          <span className=" text-zinc-500">Realizado</span>
          <span className=" text-zinc-200">{formattedDate}</span>
        </div>
        <div className="flex w-full justify-between px-5 font-gabarito text-[1rem]">
          <span className=" text-zinc-500">Tamanho</span>
          <span className=" text-zinc-200">{formatFileSize(fileSize)}</span>
        </div>
      </div>
    </div>
  );
};
