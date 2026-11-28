import { notFound } from "next/navigation";
import { hasLocale, loadDictionary } from "./dictionaries";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }
  const dict = await loadDictionary(lang);
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    alternates: { languages: { en: "/en", it: "/it" } },
  };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await loadDictionary(lang);

  return (
    <main className="min-h-screen grid place-items-center p-8">
      <div className="max-w-xl">
        <p className="text-sm font-bold uppercase">
          {dict.cover.firstIssue} - {dict.cover.comingSoon}
        </p>
        <h1 className="text-6xl font-black">
          {dict.cover.firstName} {dict.cover.lastName}
        </h1>
        <p className="mt-4 text-lg">{dict.metadata.description}</p>
        <Link
          href={lang === "en" ? "/it" : "/en"}
          hrefLang={lang === "en" ? "it" : "en"}
          className="mt-8 inline-block text-lg font-bold"
        >
          {lang === "en" ? "Italiano" : "English"}
        </Link>
      </div>
    </main>
  );
}
