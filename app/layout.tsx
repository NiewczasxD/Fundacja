import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fundacja IVEL - Wspieramy i pomagamy",
  description: "Fundacja IVEL działa na rzecz [Uzupełnij opis działalności]. Wspieramy lokalną społeczność poprzez [Uzupełnij działania].",
  keywords: "fundacja, pomoc, wsparcie, współpraca, partnerstwa",
  authors: [{ name: "Fundacja IVEL" }],
  openGraph: {
    title: "Fundacja IVEL - Wspieramy i pomagamy",
    description: "Fundacja IVEL działa na rzecz [Uzupełnij opis działalności].",
    type: "website",
    locale: "pl_PL",
    siteName: "Fundacja IVEL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fundacja IVEL - Wspieramy i pomagamy",
    description: "Fundacja IVEL działa na rzecz [Uzupełnij opis działalności].",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://fundacja-ivel.pl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <a href="#main-content" className="skip-link">
          Przejdź do treści głównej
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
