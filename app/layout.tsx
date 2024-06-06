import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./fonts";
import { CSPostHogProvider } from "./_analytics/provider";

export const metadata: Metadata = {
  title: "you can't have it all :(",
  description: "tell us what you want and we'll tell you what you can have.",
  openGraph: {
    title: "you can't have it all :(",
    description: "tell us what you want and we'll tell you what you can have.",
    siteName: "canthaveitall.com",
    images: "https://utfs.io/f/de437344-99fb-48b0-b172-1e73c92098b4-z9p43u.jpg",
  },
  twitter: {
    site: "www.canthaveitall.com",
    creator: "@dc1b3l",
    description: "tell us what you want and we'll tell you what you can have.",
    title: "you can't have it all :(",
    images: "https://utfs.io/f/de437344-99fb-48b0-b172-1e73c92098b4-z9p43u.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CSPostHogProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </CSPostHogProvider>
  );
}
