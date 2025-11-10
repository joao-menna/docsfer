import type { File } from "@/types/search";

export type SortDirection = "asc" | "desc";
export type SortField = "name" | "uploader";

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
        case "name":
          compareResult = this.compareStrings(a.name, b.name);
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

  private static compareStrings(a: string, b: string): number {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }

  static createSortingFunction(
    field: SortField,
    direction: SortDirection = "asc"
  ): (a: File, b: File) => number {
    return (a: File, b: File) => {
      let compareResult = 0;

      switch (field) {
        case "name":
          compareResult = this.compareStrings(a.name, b.name);
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
