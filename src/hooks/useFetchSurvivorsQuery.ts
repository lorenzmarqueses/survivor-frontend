import { apiClient } from "@/lib/api-client";
import { FetchSurvivorsResponse } from "@/types/survivor";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useFetchSurvivorsQuery = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["survivors", page, limit], // Include page and limit in query key for cache invalidation
    queryFn: async () => {
      const response = await apiClient.get<FetchSurvivorsResponse>(`/survivors?page=${page}&limit=${limit}`);

      return response; // Adjust this based on how the API responds
    },
    placeholderData: keepPreviousData,
  });
};

export default useFetchSurvivorsQuery;
