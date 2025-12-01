import clsx from "clsx";

interface headerbtnProps {
    isActive?: boolean;
    onClick?: () => void;
}

export default function AddFriendBtn({ isActive, onClick }: headerbtnProps) {
    return (
        <button
            type="button"
            className={clsx(
                `flex justify-center items-center px-4 py-1 rounded-lg font-gabarito gap-2 transition-all duration-200 ease-out`,
                isActive
                    ? "bg-sky-900 text-sky-400"
                    : "bg-sky-400 text-gray-800 hover:bg-sky-500"
            )}
            onClick={onClick}
        >
            Add friend
        </button>
    );
}
