import { useMemo } from "react";

export function useFileColor(filename: string) {
  return useMemo(() => {
    const ext = filename.split(".").pop()?.toLowerCase();

    switch (ext) {
      case "pdf":
        return "text-red-400";
      case "doc":
      case "docx":
        return "text-blue-400";
      case "xls":
      case "xlsx":
        return "text-green-400";
      case "ppt":
      case "pptx":
        return "text-orange-400";
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return "text-purple-400";
      default:
        return "text-sky-400";
    }
  }, [filename]);
}
