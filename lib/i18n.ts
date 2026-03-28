export type { Locale } from "./locales";

export const translations = {
  en: {
    nav: {
      packs: "Packs",
      about: "About",
      shop: "Shop",
    },
    hero: {
      label: "Premium Sample Packs",
      subtitle: "Hand-crafted samples for producers who refuse to sound like everyone else.",
      cta: "Browse Packs",
      ctaSecondary: "Learn More",
      scroll: "Scroll",
    },
    packs: {
      sectionLabel: "Sample Packs",
      sectionTitle: "ALL PACKS",
      from: "From",
      view: "View →",
    },
    about: {
      label: "About MOJII",
      title1: "SOUNDS BUILT",
      title2: "FOR REAL",
      title3: "PRODUCERS",
      p1: "We craft samples driven by emotions — covered in MOJIIs. Every pack is recorded with intention, shaped by feeling, and built to move people.",
      p2: "No filler. No presets. Just raw WAV material ready to drop straight into your DAW.",
      stats: {
        packs: "Packs Released",
        samples: "Total Samples",
        license: "License",
      },
    },
    pack: {
      back: "← All Packs",
      preview: "Preview",
      chooseTier: "Choose Your Tier",
      disclaimer: "All prices in USD. Download link sent instantly to your email after payment.",
      mostPopular: "Most Popular",
      buyBtn: "Buy",
      emailLabel: "Your email — download link will be sent here",
      emailPlaceholder: "producer@gmail.com",
      proceedBtn: "Proceed to Payment →",
      creatingInvoice: "Creating invoice...",
      securePayment: "Secure payment via Monobank",
      emailError: "Please enter a valid email",
    },
    footer: {
      tagline:
        "All samples are 100% royalty-free. Use in commercial projects without additional fees.",
      license: "License",
      privacy: "Privacy Policy",
      support: "Support",
    },
    success: {
      title1: "PAYMENT",
      title2: "SUCCESSFUL",
      subtitle: "Your download link is on its way.",
      emailNote: "Check your inbox at",
      spamNote:
        "Didn't receive the email? Check your spam folder or reply to our email for support.",
      backBtn: "Back to MOJII",
    },
    successLoading: {
      title1: "CHECKING",
      title2: "PAYMENT",
      subtitle: "Please wait while we verify your payment...",
    },
    successFailed: {
      title1: "PAYMENT",
      title2: "FAILED",
      subtitle: "Something went wrong with your payment. Please try again.",
      backBtn: "Back to MOJII",
    },
  },

  uk: {
    nav: {
      packs: "Паки",
      about: "Про нас",
      shop: "Магазин",
    },
    hero: {
      label: "Преміум семпл-паки",
      subtitle: "Ручна робота для продюсерів, які відмовляються звучати як усі.",
      cta: "Переглянути паки",
      ctaSecondary: "Дізнатися більше",
      scroll: "Гортай",
    },
    packs: {
      sectionLabel: "Семпл-паки",
      sectionTitle: "ВСІ ПАКИ",
      from: "Від",
      view: "Детальніше →",
    },
    about: {
      label: "Про MOJII",
      title1: "ЗВУКИ СТВОРЕНІ",
      title2: "ДЛЯ СПРАВЖНІХ",
      title3: "ПРОДЮСЕРІВ",
      p1: "Ми створюємо семпли, натхненні емоціями — вкриті моджіями. Кожен пак записаний з наміром, сформований почуттям і побудований, щоб рухати людей.",
      p2: "Без наповнювачів. Без пресетів. Тільки сирий WAV матеріал, готовий до вашого DAW.",
      stats: {
        packs: "Паків випущено",
        samples: "Семплів всього",
        license: "Ліцензія",
      },
    },
    pack: {
      back: "← Всі паки",
      preview: "Превью",
      chooseTier: "Обери свій тір",
      disclaimer:
        "Всі ціни в USD. Посилання на завантаження надходить на email одразу після оплати.",
      mostPopular: "Найпопулярніше",
      buyBtn: "Купити",
      emailLabel: "Ваш email — посилання на завантаження буде надіслано сюди",
      emailPlaceholder: "producer@gmail.com",
      proceedBtn: "Перейти до оплати →",
      creatingInvoice: "Створення інвойсу...",
      securePayment: "Безпечна оплата через Monobank",
      emailError: "Введіть дійсний email",
    },
    footer: {
      tagline:
        "Всі семпли на 100% royalty-free. Використовуй у комерційних проєктах без додаткових виплат.",
      license: "Ліцензія",
      privacy: "Політика конфіденційності",
      support: "Підтримка",
    },
    success: {
      title1: "ОПЛАТА",
      title2: "УСПІШНА",
      subtitle: "Посилання на завантаження вже в дорозі.",
      emailNote: "Перевір пошту на адресі",
      spamNote: "Не отримав листа? Перевір спам або напиши нам.",
      backBtn: "Повернутись на MOJII",
    },
    successLoading: {
      title1: "ПЕРЕВІРЯЄМО",
      title2: "ОПЛАТУ",
      subtitle: "Зачекайте, поки ми перевіримо вашу оплату...",
    },
    successFailed: {
      title1: "ОПЛАТА",
      title2: "НЕ ПРОЙШЛА",
      subtitle: "Щось пішло не так з оплатою. Спробуйте ще раз.",
      backBtn: "Повернутись на MOJII",
    },
  },
} as const;

export type Translations = (typeof translations)["en"];
