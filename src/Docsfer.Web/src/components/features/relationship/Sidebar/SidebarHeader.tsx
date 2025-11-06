import { Plus } from "lucide-react";

export function Sidebarheader() {
  return (
    <div className="h-16  border-b border-gray-800 w-full px-8 py-3 shrink-0">
      <button
        type="button"
        className="flex justify-center items-center gap-2 font-gabarito text-gray-200 w-full h-full bg-sky-600 rounded-lg"
      >
        Add new friends
        <Plus className="size-5" />
      </button>
    </div>
  );
}
