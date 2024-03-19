import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DesktopLayout } from "@/app/layouts";
import { SolanaWalletProvider, ReactQueryProvider } from "@/app/providers";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });

const openRunde = localFont({
  src: [
    {
      path: "./globals/fonts/OpenRunde-1.0.1/desktop/OpenRunde-Regular.otf",
      style: "regular",
    },
    {
      path: "./globals/fonts/OpenRunde-1.0.1/desktop/OpenRunde-Bold.otf",
      style: "bold",
    },
    {
      path: "./globals/fonts/OpenRunde-1.0.1/desktop/OpenRunde-Medium.otf",
      style: "medium",
    },
  ],
});

export const metadata: Metadata = {
  title: "Quack.fun",
  description: "The only solana native farcaster client",
  publisher: "Lenspost Labs",
  authors: [{ name: "Lenspost Labs", url: "https://lenspost.xyz" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Quack.fun",
    description: "The only solana native farcaster client",
    url: "https://quack.fun",
    siteName: "Quack.fun",
    images: ["/quack-logo.png"],
    locale: "en-US",
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
      <body className={openRunde.className}>
        {/* Even though, we wrap it with use client - We can use server components within the children passed too */}
        <SolanaWalletProvider>
          <ReactQueryProvider>
            <DesktopLayout>{children}</DesktopLayout>
          </ReactQueryProvider>
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
