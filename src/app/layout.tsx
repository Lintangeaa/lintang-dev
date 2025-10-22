import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { AuthProvider } from "@/lib/contexts/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lintang Dandung Prakoso | Backend Developer, AI Engineer & Chatbot Developer",
  description: "Portfolio of Lintang Dandung Prakoso - Backend Developer, AI Engineer & Chatbot Developer focused on creating efficient and innovative technology solutions.",
  keywords: "backend developer, AI engineer, chatbot developer, software developer, Indonesia, Python, JavaScript, Docker",
  authors: [{ name: "Lintang Dandung Prakoso" }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/soulcode-logo.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lintang Dandung Prakoso | Backend Developer, AI Engineer & Chatbot Developer',
    description: 'Building innovative technology solutions with expertise in Backend Development, Artificial Intelligence, and Chatbot Development.',
    images: ['/images/soulcode-logo.png'],
  },
  openGraph: {
    title: "Lintang Dandung Prakoso | Backend Developer, AI Engineer & Chatbot Developer",
    description: "Building innovative technology solutions with expertise in Backend Development, Artificial Intelligence, and Chatbot Development.",
    type: "website",
    images: [
      {
        url: '/images/soulcode-logo.png',
        width: 1200,
        height: 630,
        alt: 'Lintang Dandung Prakoso - Backend Developer, AI Engineer & Chatbot Developer',
      },
    ],
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
        <AuthProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
