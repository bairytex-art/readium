import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Readium — Write what you experience",
  description: "A clean, professional platform to read experiences from people across the world or write blogs to share your own. Fast, easy, and genuine.",
  keywords: ["Readium", "blog", "writing", "reading", "experience", "stories", "publishing"],
  authors: [{ name: "Readium" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Readium — Write what you experience",
    description: "A clean, professional platform for reading and writing genuine stories.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Readium — Write what you experience",
    description: "A clean, professional platform for reading and writing genuine stories.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
