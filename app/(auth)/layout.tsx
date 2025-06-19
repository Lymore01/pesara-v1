import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | pesara",
  description: "Pesara Authentication",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="grid place-content-center min-h-screen">{children}</div>;
}
