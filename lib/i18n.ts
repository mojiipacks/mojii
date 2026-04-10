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
      creatingInvoice: "Processing...",
      securePayment: "Secure checkout",
      emailError: "Please enter a valid email",
    },
    footer: {
      tagline:
        "All samples are 100% royalty-free. Use in commercial projects without additional fees.",
      license: "License",
      terms: "Terms of Service",
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
  },
} as const;

export type Translations = (typeof translations)["en"];
