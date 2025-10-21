import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/providers/QueryProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lintang Dandung Prakoso | Backend Developer & AI Engineer",
  description: "Portfolio of Lintang Dandung Prakoso - Backend Developer and AI Engineer focused on creating efficient and innovative technology solutions.",
  keywords: "backend developer, AI engineer, software developer, Indonesia, Python, JavaScript, Docker",
  authors: [{ name: "Lintang Dandung Prakoso" }],
  openGraph: {
    title: "Lintang Dandung Prakoso | Backend Developer & AI Engineer",
    description: "Building innovative technology solutions with expertise in Backend Development and Artificial Intelligence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <QueryProvider>
            {children}
        </QueryProvider>
      </body>
    </html>
  );
}
