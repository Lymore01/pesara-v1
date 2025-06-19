import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const lexendFont = localFont({
  src: [
    {
      path: "./fonts/Lexend/Lexend-Regular.ttf",
      weight: "400",
    },
    {
      path: "./fonts/Lexend/Lexend-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-lexend",
  preload: true,
});

const calFont = localFont({
  src: "./fonts/CalSans/CalSans-SemiBold.woff2",
  variable: "--font-cal",
  preload: true,
  display: "block",
  weight: "600",
});

export const metadata: Metadata = {
  title: "Pesara",
  description: "Effortless Payments for Modern Africa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lexendFont.variable} ${calFont.variable} font-sans antialiased`}
    >
      <body className="flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
