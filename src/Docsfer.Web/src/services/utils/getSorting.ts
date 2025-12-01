import type { File } from "@/types/search";

export type SortDirection = "asc" | "desc";
export type SortField = "fileName" | "uploader";

export class FileSortingUtil {
  static sortFiles(
    files: File[],
    field: SortField,
    direction: SortDirection = "asc"
  ): File[] {
    const sortedFiles = [...files];
    sortedFiles.sort((a, b) => {
      let compareResult = 0;
      switch (field) {
        case "fileName":
          compareResult = this.compareStrings(a.fileName, b.fileName);
          break;
        case "uploader":
          compareResult = this.compareStrings(a.uploader, b.uploader);
          break;
        default:
          return 0;
      }

      return direction === "asc" ? compareResult : -compareResult;
    });
    return sortedFiles;
  }

  private static compareStrings(a?: string, b?: string): number {
    const aValue = a?.toLowerCase() ?? "";
    const bValue = b?.toLowerCase() ?? "";
    return aValue.localeCompare(bValue);
  }

  static createSortingFunction(
    field: SortField,
    direction: SortDirection = "asc"
  ): (a: File, b: File) => number {
    return (a: File, b: File) => {
      let compareResult = 0;

      switch (field) {
        case "fileName":
          compareResult = this.compareStrings(a.fileName, b.fileName);
          break;
        case "uploader":
          compareResult = this.compareStrings(a.uploader, b.uploader);
          break;
        default:
          return 0;
      }

      return direction === "asc" ? compareResult : -compareResult;
    };
  }
}
