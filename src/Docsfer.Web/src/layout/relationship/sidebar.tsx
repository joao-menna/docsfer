import { SidebarBottom } from "@/components/features/relationship/Sidebar/SidebarBottom";
import { Sidebarheader } from "@/components/features/relationship/Sidebar/SidebarHeader";
import { SidebarTop } from "@/components/features/relationship/Sidebar/SidebarPages";
import type { UserInfo } from "@/services/auth/authService";
import { api } from "@/services/httpClient";
import { relationshipService } from "@/services/relationship/newRelationship";
import { useQueries, useQuery } from "@tanstack/react-query";



export default function Sidebar({ userId }: UserInfo) {
  const { data: relationships = [] } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const response = await relationshipService.getRelationship();
      return response.users;
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const relationshipIds = relationships.map((item) => item.relationshipId);

  const fileQuery = useQueries({
    queries: relationshipIds.map((relationshipId) => ({
      queryKey: ["files", relationshipId],
      queryFn: async () => {
        const response = await api.get(
          `/blob?relationshipId=${relationshipId}`
        );
        return {
          relationshipId,
          files: response.data.files || response.data,
        };
      },
      enabled: !!relationshipId,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const relationshipUserMap = Object.fromEntries(
    relationships.map((item) => [item.relationshipId, item.user.userName])
  );

  const allFiles = fileQuery
    .filter((query) => query.data)
    .flatMap((query) => {
      const { relationshipId, files } = query.data!;
      const relatedUserName = relationshipUserMap[relationshipId];

      return files.map((file: { relationshipId: string, userName: string}) => ({
        ...file,
        relatedUserName,
      }));
    });

  console.log(`All files:`, allFiles);

  return (
    <div className="flex flex-col">
      <Sidebarheader />
      <div className="flex flex-col height-atme-content justify-start lg:w-96 gap-2 px-3 border-r border-gray-800  overflow-y-auto truncate">
        <SidebarTop />
        <SidebarBottom userId={userId} files={allFiles} />
      </div>
    </div>
  );
}
