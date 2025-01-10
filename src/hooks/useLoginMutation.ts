// src/hooks/useLoginMutation.ts
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { LoginFormInputs, LoginResponse } from "@/types/auth";

const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginFormInputs) => {
      return apiClient.post<LoginResponse>("/auth/login", data);
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      document.cookie = `token=${data.access_token}; path=/;`;
      router.push("/report");
    },
    onError: (error: any) => {
      console.error("Login failed:", error.message || "Unknown error");
    },
  });
};

export default useLoginMutation;
