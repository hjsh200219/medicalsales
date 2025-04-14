import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

const nanumSquare = {
  variable: "--font-nanum-square",
};

export const metadata: Metadata = {
  title: "Assist Sales",
  description: "Assist Sales application",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Assist Sales",
  },
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="apple-touch-icon" href="/icons/logo192.png" />
        <meta name="application-name" content="Assist Sales" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MedSales" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#3b82f6" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@2.0/nanumsquare.css"
        />
      </head>
      <body
        className={`${nanumSquare.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
