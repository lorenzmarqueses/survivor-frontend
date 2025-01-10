"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";

interface RegistrationFormInputs {
  email: string;
  password: string;
}

interface RegistrationResponse {
  access_token: string;
}

const RegistrationPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInputs>();

  // React Query mutation using the apiClient
  const registrationMutation = useMutation({
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

  const onSubmit: SubmitHandler<RegistrationFormInputs> = (data) => {
    registrationMutation.mutate(data);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
              <CardDescription>Create your account by entering your details below</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={registrationMutation.status === "pending"}>
                    {registrationMutation.status === "pending" ? "Registering..." : "Register"}
                  </Button>
                  {registrationMutation.isError && (
                    <p className="text-red-500 text-sm mt-2">
                      {registrationMutation.error instanceof Error
                        ? registrationMutation.error.message
                        : "An error occurred"}
                    </p>
                  )}
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <a href="/login" className="underline underline-offset-4">
                    Login
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
