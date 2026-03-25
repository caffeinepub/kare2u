import { useQuery } from "@tanstack/react-query";
import type { Inquiry, Package } from "../backend";
import { useActor } from "./useActor";

export function useAllPackages() {
  const { actor, isFetching } = useActor();

  return useQuery<Package[]>({
    queryKey: ["packages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPackages();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAllInquiries() {
  const { actor, isFetching } = useActor();

  return useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}
