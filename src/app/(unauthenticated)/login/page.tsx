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

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // React Query mutation using the apiClient
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormInputs) => {
      return apiClient.post<LoginResponse>("/auth/login", data); // Replace with your API endpoint
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      document.cookie = `token=${data.access_token}; path=/;`;
      router.push("/report");
      // Handle successful login (e.g., redirect to another page)
    },
    onError: (error: any) => {
      console.error("Login failed:", error.message || "Unknown error");
      // Handle error (e.g., show error message)
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your email below to login to your account</CardDescription>
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
                      {...register("password", { required: "Password is required" })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                  </div>
                  <Button type="submit" className="w-full" disabled={loginMutation.status === "pending"}>
                    {loginMutation.status === "pending" ? "Logging in..." : "Login"}
                  </Button>
                  {loginMutation.isError && (
                    <p className="text-red-500 text-sm mt-2">
                      {loginMutation.error instanceof Error ? loginMutation.error.message : "An error occurred"}
                    </p>
                  )}
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="/register" className="underline underline-offset-4">
                    Sign up
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

export default LoginPage;
