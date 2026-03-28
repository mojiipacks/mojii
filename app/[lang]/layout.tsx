import { LOCALES, resolveLocale } from "@/lib/locales";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = resolveLocale(params.lang);

  return (
    <>
      <Navbar lang={lang} />
      <main>{children}</main>
      <Footer lang={lang} />
    </>
  );
}
