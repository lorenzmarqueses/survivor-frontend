import { apiClient } from "@/lib/api-client";
import { AddSurvivorInputs, AddSurvivorResponse } from "@/types/survivor";
import { useMutation } from "@tanstack/react-query";

const useAddSurvivorMutation = () => {
  return useMutation({
    mutationFn: async (data: AddSurvivorInputs) => {
      return apiClient.post<AddSurvivorResponse>("/survivors", data);
    },
    onSuccess: (data) => {
      console.log("Survivor added successfully:", data);
    },
    onError: (error: any) => {
      console.error("Failed to add survivor:", error.message || "Unknown error");
    },
  });
};

export default useAddSurvivorMutation;
