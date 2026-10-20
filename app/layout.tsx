import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Save Nusantara — Work From Your Heart",
  description:
    "An independent, student-led non-profit movement delivering rapid, direct-to-victim emergency relief across Indonesia. Work from your heart.",
  icons: {
    icon: "/assets/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600&family=Special+Elite&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
