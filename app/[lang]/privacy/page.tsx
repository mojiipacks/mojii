import type { Metadata } from "next";
import Link from "next/link";

type Props = { params: { lang: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang === "uk" ? "uk" : "en";
  return {
    title:
      lang === "uk"
        ? "Політика конфіденційності | MOJII"
        : "Privacy Policy | MOJII",
    description:
      lang === "uk"
        ? "Політика конфіденційності MOJII — як ми збираємо та використовуємо ваші дані."
        : "MOJII privacy policy — how we collect and use your data.",
  };
}

const content = {
  en: {
    back: "← Back",
    label: "Legal",
    title: "PRIVACY POLICY",
    updated: `Last updated: ${new Date().getFullYear()}.`,
    sections: [
      {
        title: "1. Who We Are",
        text: "MOJII is an independent sample pack brand. Our website is mojii.com. You can contact us at goorkeet@gmail.com.",
      },
      {
        title: "2. What Data We Collect",
        intro:
          "We collect only the minimum data needed to process your purchase:",
        list: [
          "Email address — to deliver your download link after purchase",
          "Payment data — processed entirely by Monobank. We never store card details.",
          "Purchase reference — to confirm your transaction",
        ],
      },
      {
        title: "3. How We Use Your Data",
        list: [
          "To send you a download link via email (through Resend)",
          "To confirm and fulfil your purchase",
          "We do not sell, rent, or share your data with third parties for marketing",
        ],
      },
      {
        title: "4. Cookies",
        text: "This website does not use tracking cookies, advertising cookies, or analytics cookies. We use no third-party tracking scripts. The site is purely informational and transactional — no cookie consent banner is required.",
      },
      {
        title: "5. Third-Party Services",
        list: [
          "Monobank Acquiring — payment processing. Subject to Monobank's own privacy policy.",
          "Resend — transactional email delivery. Subject to Resend's own privacy policy.",
          "Vercel — website hosting. Subject to Vercel's privacy policy.",
          "Google Drive — file storage for downloads.",
        ],
      },
      {
        title: "6. Data Retention",
        text: "Your email address is stored only for the duration needed to deliver your download (typically 24 hours). We do not maintain a long-term customer database or mailing list.",
      },
      {
        title: "7. Your Rights",
        text: "You have the right to request deletion of any personal data we hold about you. Contact us at goorkeet@gmail.com and we will respond within 72 hours.",
      },
      {
        title: "8. Changes to This Policy",
        text: "We may update this policy from time to time. Any changes will be reflected on this page with an updated date.",
      },
    ],
  },
  uk: {
    back: "← Назад",
    label: "Правовий",
    title: "ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ",
    updated: `Останнє оновлення: ${new Date().getFullYear()}.`,
    sections: [
      {
        title: "1. Хто ми",
        text: "MOJII — незалежний бренд семпл-паків. Наш сайт: mojii.com. Звʼяжіться з нами: goorkeet@gmail.com.",
      },
      {
        title: "2. Які дані ми збираємо",
        intro:
          "Ми збираємо лише мінімум даних, необхідних для обробки вашої покупки:",
        list: [
          "Email-адреса — для надсилання посилання на завантаження після оплати",
          "Платіжні дані — повністю обробляються Monobank. Ми ніколи не зберігаємо дані картки.",
          "Референс транзакції — для підтвердження вашої оплати",
        ],
      },
      {
        title: "3. Як ми використовуємо ваші дані",
        list: [
          "Для надсилання посилання на завантаження через email (через Resend)",
          "Для підтвердження та виконання вашої покупки",
          "Ми не продаємо, не здаємо в оренду та не передаємо ваші дані третім особам для маркетингу",
        ],
      },
      {
        title: "4. Cookies",
        text: "Цей сайт не використовує відстежувальні, рекламні або аналітичні cookies. Ми не використовуємо сторонні трекінгові скрипти. Сайт суто інформаційний та транзакційний — банер для згоди на cookies не потрібен.",
      },
      {
        title: "5. Сторонні сервіси",
        list: [
          "Monobank Acquiring — обробка платежів. Підпорядковується власній політиці конфіденційності Monobank.",
          "Resend — надсилання транзакційних email. Підпорядковується власній політиці Resend.",
          "Vercel — хостинг сайту. Підпорядковується політиці конфіденційності Vercel.",
          "Google Drive — зберігання файлів для завантаження.",
        ],
      },
      {
        title: "6. Зберігання даних",
        text: "Ваша email-адреса зберігається лише на час, необхідний для доставки завантаження (зазвичай 24 години). Ми не ведемо довготривалу базу даних клієнтів і не розсилаємо розсилки.",
      },
      {
        title: "7. Ваші права",
        text: "Ви маєте право вимагати видалення будь-яких особистих даних, які ми зберігаємо. Напишіть нам на goorkeet@gmail.com і ми відповімо протягом 72 годин.",
      },
      {
        title: "8. Зміни до цієї політики",
        text: "Ми можемо час від часу оновлювати цю політику. Будь-які зміни будуть відображені на цій сторінці з оновленою датою.",
      },
    ],
  },
};

export default function PrivacyPage({ params }: Props) {
  const lang = params.lang === "uk" ? "uk" : "en";
  const c = content[lang];

  return (
    <div className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/${lang}`}
          className="text-gray-dim text-sm tracking-widest uppercase hover:text-green-electric transition-colors"
        >
          {c.back}
        </Link>
        <div className="mt-10 mb-12">
          <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-3">
            {c.label}
          </p>
          <h1
            className="text-6xl text-white"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            {c.title}
          </h1>
          <p className="text-gray-dim mt-3 text-sm">{c.updated}</p>
        </div>
        <div className="space-y-10 text-white/70 leading-relaxed">
          {c.sections.map((s) => (
            <section key={s.title}>
              <h2
                className="text-white text-xl uppercase tracking-widest mb-3"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                {s.title}
              </h2>
              {"intro" in s && s.intro && <p className="mb-3">{s.intro}</p>}
              {s.text && (
                <p>
                  {s.text.includes("goorkeet@gmail.com") ? (
                    <>
                      {s.text.split("goorkeet@gmail.com")[0]}
                      <a
                        href="mailto:goorkeet@gmail.com"
                        className="text-green-electric hover:opacity-70"
                      >
                        goorkeet@gmail.com
                      </a>
                      {s.text.split("goorkeet@gmail.com")[1]}
                    </>
                  ) : (
                    s.text
                  )}
                </p>
              )}
              {s.list && (
                <ul className="space-y-2">
                  {s.list.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-green-electric mt-1 shrink-0">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
