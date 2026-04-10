# MOJII

Premium sample packs for producers. Next.js 14 + Tailwind CSS + Creem + Resend.

## Stack

- **Next.js 14** (App Router) — pages, API routes, SSG, i18n (en/uk)
- **Tailwind CSS** — styling
- **Creem** — payments (checkout + webhook)
- **Resend** — transactional email delivery
- **Vercel** — hosting
- **Google Drive** — file storage

## Environment variables

| Variable                        | Description                                                | Example                                      |
| ------------------------------- | ---------------------------------------------------------- | -------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Public site URL (used for success redirect)                | `https://mojii.store`                        |
| `RESEND_API_KEY`                | [Resend](https://resend.com) API key                       | `re_xxxxx`                                   |
| `RESEND_FROM_EMAIL`             | Sender email (must be verified domain or `resend.dev`)     | `noreply@mojii.store`                        |
| `RESEND_FROM_NAME`              | Sender display name                                        | `MOJII`                                      |
| `CREEM_API_KEY`                 | [Creem](https://creem.io) API key (test or live)           | `creem_test_xxxxx`                           |
| `CREEM_WEBHOOK_SECRET`          | Webhook signing secret for HMAC verification               | `whsec_xxxxx`                                |
| `CREEM_PRODUCT_GUITAR_BASIC`    | Creem product ID for the Guitar Basic pack                 | `prod_xxxxx`                                 |
| `CREEM_PRODUCT_GUITAR_CUTTED`   | Creem product ID for the Guitar Cutted pack                | `prod_xxxxx`                                 |
| `CREEM_PRODUCT_GUITAR_EXTENDED` | Creem product ID for the Guitar Extended pack              | `prod_xxxxx`                                 |
| `CREEM_PRODUCT_DRUMS_STARTER`   | Creem product ID for the Drums Starter pack                | `prod_xxxxx`                                 |
| `GUITAR_BASIC_LINK`             | Google Drive link delivered after Guitar Basic purchase    | `https://drive.google.com/drive/folders/...` |
| `GUITAR_CUTTED_LINK`            | Google Drive link delivered after Guitar Cutted purchase   | `https://drive.google.com/drive/folders/...` |
| `GUITAR_EXTENDED_LINK`          | Google Drive link delivered after Guitar Extended purchase | `https://drive.google.com/drive/folders/...` |
| `DRUMS_STARTER_LINK`            | Google Drive link delivered after Drums Starter purchase   | `https://drive.google.com/drive/folders/...` |

## Local setup

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Open http://localhost:3000

### Getting tokens

**Resend:** sign up at [resend.com](https://resend.com) -> API Keys -> Create. For testing, use `onboarding@resend.dev` as `RESEND_FROM_EMAIL` (sends only to account owner email).

**Creem:** sign up at [creem.io](https://creem.io), create products for each pack and copy their IDs into `CREEM_PRODUCT_*`. Grab a test API key from the dashboard and the webhook signing secret from the webhooks section.

### Testing payment flow

Creem webhooks need a public URL. Use a tunnel:

```bash
npx localtunnel --port 3000
```

Then update `.env`:

```
NEXT_PUBLIC_SITE_URL=https://your-tunnel-url.loca.lt
```

Register the tunnel URL + `/api/webhook` as the webhook endpoint in the Creem dashboard and restart dev server. Now:

1. Go to a pack page, click buy, enter email
2. Complete checkout on Creem's hosted page using test card details
3. Webhook hits your tunnel -> email sent -> redirect to success page

Localtunnel URLs change on restart. Update `.env`, the Creem webhook endpoint, and restart the dev server each time.

## Development

| Command            | Description                     |
| ------------------ | ------------------------------- |
| `task dev`         | Start dev server                |
| `task build`       | Production build                |
| `task lint`        | Format code (prettier)          |
| `task type-check`  | TypeScript check                |
| `task clean-start` | Nuke node_modules and reinstall |

## Git hooks (lefthook)

- **pre-commit**: prettier + type-check
- **commit-msg**: [conventional commits](https://www.conventionalcommits.org/) via commitlint

## CI

GitHub Actions runs on push/PR to `main`: type-check, build.

## Vercel deployment

Repo is connected to Vercel — push to `main` triggers a build.

Set these env variables in Vercel dashboard (Settings -> Environment Variables):

| Variable                        | Value                       |
| ------------------------------- | --------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | `https://mojii.store`       |
| `RESEND_API_KEY`                | Production Resend API key   |
| `RESEND_FROM_EMAIL`             | `noreply@mojii.store`       |
| `RESEND_FROM_NAME`              | `MOJII`                     |
| `CREEM_API_KEY`                 | Live Creem API key          |
| `CREEM_WEBHOOK_SECRET`          | Live webhook signing secret |
| `CREEM_PRODUCT_GUITAR_BASIC`    | Live product ID             |
| `CREEM_PRODUCT_GUITAR_CUTTED`   | Live product ID             |
| `CREEM_PRODUCT_GUITAR_EXTENDED` | Live product ID             |
| `CREEM_PRODUCT_DRUMS_STARTER`   | Live product ID             |
| `GUITAR_BASIC_LINK`             | Google Drive folder URL     |
| `GUITAR_CUTTED_LINK`            | Google Drive folder URL     |
| `GUITAR_EXTENDED_LINK`          | Google Drive folder URL     |
| `DRUMS_STARTER_LINK`            | Google Drive folder URL     |

Before going live:

- Verify `mojii.store` domain in Resend (Settings -> Domains -> add DNS records)
- Switch Creem to live mode, create live products, update `CREEM_*` env vars
- Register the production webhook endpoint in the Creem dashboard

## Adding a new locale

Edit `lib/locales.ts` — add to `LOCALES`, `LOCALE_LABELS`. Add translations to `lib/i18n.ts`. Everything else picks it up automatically.

## Adding more packs

Add a new object to the `packs` array in `lib/packs.ts`. Pages are auto-generated.

## Commission summary

| Service          | Cost                 |
| ---------------- | -------------------- |
| Vercel hosting   | Free                 |
| Resend emails    | Free (3,000/month)   |
| Google Drive     | Free                 |
| Creem commission | See creem.io pricing |
