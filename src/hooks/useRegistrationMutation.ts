// src/hooks/useRegistrationMutation.ts
import { apiClient } from "@/lib/api-client";
import { RegistrationFormInputs, RegistrationResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useRegistrationMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: RegistrationFormInputs) => {
      return apiClient.post<RegistrationResponse>("/auth/register", data); // Replace with your API endpoint
    },
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      document.cookie = `token=${data.access_token}; path=/;`;
      router.push("/report");
      // Handle successful registration (e.g., redirect to login or dashboard)
    },
    onError: (error: any) => {
      console.error("Registration failed:", error.message || "Unknown error");
      // Handle error (e.g., show error message)
    },
  });
};

export default useRegistrationMutation;
