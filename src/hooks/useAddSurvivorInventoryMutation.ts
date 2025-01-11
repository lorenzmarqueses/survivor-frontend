import { apiClient } from "@/lib/api-client";
import { RequestItemInputs } from "@/types/inventory";
import { AddSurvivorResponse } from "@/types/survivor";
import { useMutation } from "@tanstack/react-query";

const useAddSurvivorInventoryMutation = () => {
  return useMutation({
    mutationFn: async (data: RequestItemInputs) => {
      return apiClient.post<AddSurvivorResponse>("/inventory/set", data);
    },
    onSuccess: (data) => {
      console.log("Survivor added successfully:", data);
    },
    onError: (error: any) => {
      console.error("Failed to add survivor:", error.message || "Unknown error");
    },
  });
};

export default useAddSurvivorInventoryMutation;
