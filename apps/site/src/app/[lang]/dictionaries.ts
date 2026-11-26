import "server-only";

const dictionaries = {
  it: () => import("./dictionaries/it.json"),
  en: () => import("./dictionaries/en.json"),
};

export type Locale = keyof typeof dictionaries;
export const Locales: Locale[] = Object.keys(dictionaries) as Locale[];
export const hasLocale = (lang: string): lang is Locale =>
  Locales.includes(lang as Locale);
export const loadDictionary = async (l: Locale) =>
  (await dictionaries[l]()).default;
