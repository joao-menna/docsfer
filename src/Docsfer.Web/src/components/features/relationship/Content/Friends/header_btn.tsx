interface headerbtnProps {
  text: string;
  route?: string;
}

export default function headerBtn({ text }: headerbtnProps) {
  return (
    <button
      type="button"
      className="rounded-lg px-4 py-2 hover:bg-gray-800/40 text-nowrap font-semibold text-gray-400 hover:text-gray-200  transition-colors duratin-75 ease-out"
    >
      {text}
    </button>
  );
}
