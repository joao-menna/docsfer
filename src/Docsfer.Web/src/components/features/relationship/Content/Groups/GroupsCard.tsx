import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { Plus, Users } from "lucide-react";

export interface GroupCardProps extends VariantProps<typeof groupCardStyles> {
  groupName?: string;
  members?: number;
  onClick?: () => void;
}

const groupCardStyles = cva(
  "flex-center flex-col h-44 w-40 gap-4 rounded-2xl font-gabarito",
  {
    variants: {
      variant: {
        create: "bg-gray-700 text-gray-500",
        group: "bg-gray-800 cursor-pointer text-gray-200 ",
      },
    },
    defaultVariants: {
      variant: "group",
    },
  }
);

export function GroupCard({
  variant,
  groupName,
  members,
  onClick,
}: GroupCardProps) {
  return (
    <div className={groupCardStyles({ variant })} onClick={onClick}>
      {/* ICON WRAPPER */}
      <div
        className={clsx(
          `flex-center p-3 rounded-full`,
          variant === "create"
            ? "bg-[#242E43] cursor-pointer text-gray-400"
            : "bg-gray-900"
        )}
      >
        {variant === "create" ? <Plus /> : <Users />}
      </div>

      {/* TEXT */}
      <div className="flex-center flex-col">
        {variant === "create" ? (
          <>
            <span>Create a group</span>
          </>
        ) : (
          <>
            <span>{groupName}</span>
            <span className="text-gray-600 text-sm">{members} members</span>
          </>
        )}
      </div>
    </div>
  );
}
