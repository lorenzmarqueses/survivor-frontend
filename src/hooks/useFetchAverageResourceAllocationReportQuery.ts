import { apiClient } from "@/lib/api-client";
import { FetchAverageResourcesReportResponse } from "@/types/report";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useFetchAverageResourceAllocationReportQuery = () => {
  return useQuery({
    queryKey: ["report-average-resources-allocation"],
    queryFn: async () => {
      const response = await apiClient.get<FetchAverageResourcesReportResponse>(
        `/reports/average-resources-allocation`
      );

      return response; // Adjust this based on how the API responds
    },
    placeholderData: keepPreviousData,
  });
};

export default useFetchAverageResourceAllocationReportQuery;
