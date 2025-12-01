import type { FilesLoaderData, FileDetailLoaderData } from "@/types/files";
import { fileService } from "@/services/files/fileService";
import { relationshipService } from "@/services/relationship/newRelationship";
import { requireAuth } from "./useRequireAuth";
import type { LoaderFunctionArgs } from "react-router";
import { useQueries, useQuery } from "@tanstack/react-query";
import { formatFileFromBlob } from "@/types/files";

export const useFilesLoader = () => {
  const { data: user } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: requireAuth,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
  });

  const { data: relationships = [] } = useQuery({
    queryKey: ["relationships"],
    queryFn: async () => {
      const response = await relationshipService.getRelationship();
      return response.users || [];
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const fileQueries = useQueries({
    queries: relationships
      .filter((rel) => rel.user)
      .map((rel) => {
        const relationshipId = rel.relationshipId;
        const userName = rel.user.userName;

        return {
          queryKey: ["files", relationshipId],
          queryFn: async () => {
            const blobEntries = await fileService.list(relationshipId);
            return {
              relationshipId,
              files: blobEntries.map((entry) =>
                formatFileFromBlob(entry, userName, relationshipId)
              ),
            };
          },
          enabled: !!relationshipId && !!user,
          staleTime: 5 * 60 * 1000,
          gcTime: 10 * 60 * 1000,
        };
      }),
  });

  const allFiles = fileQueries
    .filter((query) => query.data)
    .flatMap((query) => query.data!.files);

  const isLoading = !user || fileQueries.some((query) => query.isLoading);
  const hasError = fileQueries.some((query) => query.isError);

  return {
    files: allFiles,
    user: user ?? null,
    isLoading,
    hasError,
  };
};

export const filesLoader = async (): Promise<FilesLoaderData> => {
  const user = await requireAuth();

  const { users: relationships = [] } =
    await relationshipService.getRelationship();

  const filesByRelationship = await Promise.all(
    relationships.map(async ({ relationshipId, user: relatedUser }) => {
      const blobEntries = await fileService.list(relationshipId);
      return blobEntries.map((entry) =>
        formatFileFromBlob(entry, relatedUser.userName, relationshipId)
      );
    })
  );

  const files = filesByRelationship.flat();
  return { files, user };
};

export const fileDetailLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<FileDetailLoaderData> => {
  await requireAuth();

  const { files, user } = await filesLoader();
  const fileId = params.id;
  const currentFile =
    files.find((f) => String(f.id) === String(fileId)) ?? null;
  return { files, currentFile, user };
};
