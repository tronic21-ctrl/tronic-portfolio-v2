import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Riko Tronic | Web3 Developer",
  description: "Economics graduate turned Web3 developer from Maluku, Indonesia. Building DeFi analytics and on-chain tooling.",
  openGraph: {
    title: "Riko Tronic | Web3 Developer",
    description: "Building DeFi analytics and on-chain tooling from Maluku, Indonesia.",
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
      <body>
        {children}
      </body>
    </html>
  );
}
