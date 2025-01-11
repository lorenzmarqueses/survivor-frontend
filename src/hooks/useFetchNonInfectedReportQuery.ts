import { apiClient } from "@/lib/api-client";
import { FetchNonInfectedReportResponse } from "@/types/report";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useFetchNonInfectedReportQuery = () => {
  return useQuery({
    queryKey: ["report-non-infected"],
    queryFn: async () => {
      const response = await apiClient.get<FetchNonInfectedReportResponse>(`/reports/non-infected`);

      return response; // Adjust this based on how the API responds
    },
    placeholderData: keepPreviousData,
  });
};

export default useFetchNonInfectedReportQuery;
