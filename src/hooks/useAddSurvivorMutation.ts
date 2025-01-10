import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { AddSurvivorInputs, AddSurvivorResponse } from "@/types/survivor";

const useAddSurvivorMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: AddSurvivorInputs) => {
      return apiClient.post<AddSurvivorResponse>("/survivors", data);
    },
    onSuccess: (data) => {
      console.log("Survivor added successfully:", data);
      router.push("/survivors"); // Redirect to a relevant page
    },
    onError: (error: any) => {
      console.error("Failed to add survivor:", error.message || "Unknown error");
    },
  });
};

export default useAddSurvivorMutation;
