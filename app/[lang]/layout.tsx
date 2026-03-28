import { translations, type Locale } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "uk" }];
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = (params.lang as Locale) in translations ? (params.lang as Locale) : "en";

  return (
    <>
      <Navbar lang={lang} />
      <main>{children}</main>
      <Footer lang={lang} />
    </>
  );
}
