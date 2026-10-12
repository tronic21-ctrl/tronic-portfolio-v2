import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Riko Tronic",
  verification: {
    google: "uy8E8rrZMYLlMd3kgT1ZGvlRkaR2PJOUUSnCWSnnjK4",
  },
  description: "Riko Tronic is a Web3 developer from Indonesia building DeFi analytics and on-chain tooling. Featured project: BanSOSChain, a public audit trail for social aid disbursement.",
  openGraph: {
    title: "Riko Tronic",
    description: "Riko Tronic is a Web3 developer from Indonesia building DeFi analytics and on-chain tooling. Featured project: BanSOSChain, a public audit trail for social aid disbursement.",
    type: "website",
    url: "https://rikotronic.vercel.app",
    images: [
      {
        url: "https://rikotronic.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Riko Tronic - Web3 Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riko Tronic",
    description: "Riko Tronic is a Web3 developer from Indonesia building DeFi analytics and on-chain tooling. Featured project: BanSOSChain, a public audit trail for social aid disbursement.",
    images: ["https://rikotronic.vercel.app/og-image.png"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Riko Tronic",
              alternateName: "Riko Toatubun",
              jobTitle: "Web3 Developer",
              url: "https://rikotronic.vercel.app",
              sameAs: [
                "https://github.com/tronic21-ctrl",
                "https://x.com/rikotronic",
              ],
              description: "Web3 developer specializing in DeFi analytics and on-chain tooling.",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
