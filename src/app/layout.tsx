import type { Metadata } from "next";

import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "CIMA’S Ingenieros | Ingeniería y construcción en Perú",
    template: "%s | CIMA’S Ingenieros",
  },

  description:
    "CIMA’S & INGENIEROS E.I.R.L. desarrolla soluciones de ingeniería, construcción, supervisión y consultoría desde Huaraz, Áncash, Perú.",

  applicationName: "CIMA’S & INGENIEROS E.I.R.L.",

  authors: [
    {
      name: "CIMA’S & INGENIEROS E.I.R.L.",
    },
  ],

  creator: "CIMA’S & INGENIEROS E.I.R.L.",
  publisher: "CIMA’S & INGENIEROS E.I.R.L.",

  keywords: [
    "CIMAS Ingenieros",
    "CIMA'S Ingenieros",
    "ingeniería en Perú",
    "construcción en Perú",
    "empresa constructora",
    "ingeniería civil",
    "construcción Huaraz",
    "ingeniería Huaraz",
    "constructora Áncash",
    "supervisión de obras",
    "ejecución de obras",
    "consultoría de ingeniería",
    "proyectos de construcción",
  ],

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: "CIMA’S & INGENIEROS E.I.R.L.",
    title: "CIMA’S Ingenieros | Ingeniería y construcción en Perú",
    description:
      "Soluciones de ingeniería, construcción, supervisión y consultoría desde Huaraz, Áncash, Perú.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "CIMA’S & Ingenieros E.I.R.L.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CIMA’S Ingenieros | Ingeniería y construcción en Perú",
    description:
      "Soluciones de ingeniería, construcción, supervisión y consultoría en Perú.",
    images: ["/images/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/images/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
    other: [
      {
        rel: "manifest",
        url: "/images/site.webmanifest",
      },
    ],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },

  category: "construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}