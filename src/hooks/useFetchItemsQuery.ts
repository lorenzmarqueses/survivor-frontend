import { apiClient } from "@/lib/api-client";
import { Item } from "@/types/item";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useFetchItemsQuery = () => {
  return useQuery({
    queryKey: ["items"], // Include page and limit in query key for cache invalidation
    queryFn: async () => {
      const response = await apiClient.get<Item[]>(`/items`);

      return response; // Adjust this based on how the API responds
    },
    placeholderData: keepPreviousData,
  });
};

export default useFetchItemsQuery;