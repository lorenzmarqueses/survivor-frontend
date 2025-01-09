import AppNavigation from "@/components/app-navigation";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppNavigation />
      <div className="max-w-[1200px] mx-auto pt-24">{children}</div>
    </>
  );
}
