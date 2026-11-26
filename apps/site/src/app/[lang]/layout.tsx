import { notFound } from "next/navigation";
import { hasLocale, loadDictionary, Locales } from "./dictionaries";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export async function generateStaticParams() {
  return Locales.map((lang) => ({ lang }));
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laurent Gagné",
  description:
    "Sviluppatore full stack. Epserienze fluide tra dati e interfacce. Leggi l'ultimo numero!",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const lang = await (await params).lang;
  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
