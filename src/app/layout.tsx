"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AlertMessage from "@/components/alert-message";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={`${inter.variable} antialiased`}>
          {/* Include AlertMessage component */}
          <AlertMessage />
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
