import clsx from "clsx";

interface headerbtnProps {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function headerBtn({ text, isActive, onClick }: headerbtnProps) {
  return (
    <button
      type="button"
      className={clsx(
        `rounded-lg px-4 py-2 text-nowrap font-semibold transition-colors duration-75 ease-out`,
        isActive
          ? "bg-gray-800/80 text-gray-200"
          : "text-gray-400 hover:bg-gray-800/40 hover:text-gray-200"
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
