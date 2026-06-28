"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, type Lang, type TranslationKey } from "./i18n";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
  isAr: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => translations.en[key],
  isAr: false,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const id = setTimeout(() => {
      const saved = localStorage.getItem("arabesque_lang") as Lang | null;
      if (saved === "ar" || saved === "en") setLangState(saved);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("arabesque_lang", l);
    // Set dir on document
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = l === "ar" ? "ar" : "en";
  };

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: TranslationKey): string => translations[lang][key] ?? translations.en[key];

  return (
    <LangContext.Provider value={{ lang, setLang, t, isAr: lang === "ar" }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
