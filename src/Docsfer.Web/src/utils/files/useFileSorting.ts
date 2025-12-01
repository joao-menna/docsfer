import {
  FileSortingUtil,
  type SortDirection,
  type SortField,
} from "@/services/utils/getSorting";
import { useState, useMemo } from "react";
import type { File } from "@/types/search";

export interface SortConfig {
  field: SortField | null;
  direction: SortDirection;
}

export const useFileSorting = (files: File[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: null,
    direction: "asc",
  });

  const sortedFiles = useMemo(() => {
    if (!sortConfig.field) {
      return files;
    }

    return FileSortingUtil.sortFiles(
      files,
      sortConfig.field,
      sortConfig.direction
    );
  }, [files, sortConfig]);

  const handleSort = (field: SortField) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.field === field) {
        return {
          field,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return {
        field,
        direction: "asc",
      };
    });
  };

  const clearSort = () => {
    setSortConfig({
      field: null,
      direction: "asc",
    });
  };

  return {
    sortedFiles,
    sortConfig,
    handleSort,
    clearSort,
  };
};
