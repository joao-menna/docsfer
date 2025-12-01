import { useLoaderData } from "react-router";
import type { FilesLoaderData, FileDetailLoaderData } from "@/types/files";

export const useFiles = () => {
  return useLoaderData() as FilesLoaderData;
};

export const useFileDetail = () => {
  return useLoaderData() as FileDetailLoaderData;
};
