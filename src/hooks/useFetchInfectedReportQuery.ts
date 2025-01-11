import { apiClient } from "@/lib/api-client";
import { FetchInfectedReportResponse } from "@/types/report";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const useFetchInfectedReportQuery = () => {
  return useQuery({
    queryKey: ["report-infected"],
    queryFn: async () => {
      const response = await apiClient.get<FetchInfectedReportResponse>(`/reports/infected`);

      return response; // Adjust this based on how the API responds
    },
    placeholderData: keepPreviousData,
  });
};

export default useFetchInfectedReportQuery;
