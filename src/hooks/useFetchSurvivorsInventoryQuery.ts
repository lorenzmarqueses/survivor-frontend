import { apiClient } from "@/lib/api-client";
import { FetchSurvivorsInventoryResponse } from "@/types/inventory";
import { FetchSurvivorsResponse } from "@/types/survivor";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useFetchSurvivorsInventoryQuery = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["survivors-inventory", page, limit], // Include page and limit in query key for cache invalidation
    queryFn: async () => {
      const response = await apiClient.get<FetchSurvivorsInventoryResponse>(
        `/inventory/survivors?page=${page}&limit=${limit}`
      );

      return response; // Adjust this based on how the API responds
    },
    placeholderData: keepPreviousData,
  });
};

export default useFetchSurvivorsInventoryQuery;
