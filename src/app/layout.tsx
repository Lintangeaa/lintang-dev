import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
