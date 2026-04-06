# MOJII

Premium sample packs for producers. Next.js 14 + Tailwind CSS + Monobank Acquiring + Resend.

## Stack

- **Next.js 14** (App Router) — pages, API routes, SSG, i18n (en/uk)
- **Tailwind CSS** — styling
- **Monobank Acquiring** — payments (~1.5-2% commission)
- **Resend** — transactional email delivery
- **Vercel** — hosting
- **Google Drive** — file storage

## Environment variables

| Variable               | Description                                                         | Example               |
| ---------------------- | ------------------------------------------------------------------- | --------------------- |
| `RESEND_API_KEY`       | [Resend](https://resend.com) API key                                | `re_xxxxx`            |
| `RESEND_FROM_NAME`     | Sender display name                                                 | `MOJII`               |
| `RESEND_FROM_EMAIL`    | Sender email (must be verified domain or resend.dev)                | `noreply@mojii.store` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (used for redirects and webhook URLs)               | `https://mojii.sotre` |
| `MONOBANK_TOKEN`       | Monobank API token ([docs](https://monobank.ua/api-docs/acquiring)) | `uXxx...`             |

## Local setup

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Open http://localhost:3000

### Getting tokens

**Resend:** sign up at [resend.com](https://resend.com) -> API Keys -> Create. For testing, use `onboarding@resend.dev` as `RESEND_FROM_EMAIL` (sends only to account owner email).

**Monobank:** go to [api.monobank.ua](https://api.monobank.ua) -> activate a new token. This personal token works as a test token for acquiring API — no real money is charged, any Luhn-valid card number works.

### Testing payment flow

Monobank webhooks need a public URL. Use a tunnel:

```bash
npx localtunnel --port 3000
```

Then update `.env`:

```
NEXT_PUBLIC_SITE_URL=https://your-tunnel-url.loca.lt
```

Restart dev server. Now:

1. Go to a pack page, click buy, enter email
2. On Monobank test page: use any card number (e.g. `4111 1111 1111 1111`), any expiry, any CVV
3. Webhook will hit your tunnel -> email sent -> redirect to success page

Localtunnel URLs change on restart. Update `.env` and restart dev server each time.

## Development

| Command            | Description                     |
| ------------------ | ------------------------------- |
| `task dev`         | Start dev server                |
| `task test`        | Run unit tests (vitest)         |
| `task test:watch`  | Run tests in watch mode         |
| `task build`       | Production build                |
| `task lint`        | Format code (prettier)          |
| `task type-check`  | TypeScript check                |
| `task clean-start` | Nuke node_modules and reinstall |

## Git hooks (lefthook)

- **pre-commit**: prettier + type-check
- **commit-msg**: [conventional commits](https://www.conventionalcommits.org/) via commitlint
- **pre-push**: tests + build

## CI

GitHub Actions runs on push/PR to `main`: type-check, test, build.

## Vercel deployment

Repo is connected to Vercel — push to `main` triggers a build.

Set these env variables in Vercel dashboard (Settings -> Environment Variables):

| Variable               | Value                     |
| ---------------------- | ------------------------- |
| `RESEND_API_KEY`       | Production Resend API key |
| `RESEND_FROM_NAME`     | `MOJII`                   |
| `RESEND_FROM_EMAIL`    | `noreply@mojii.store`     |
| `NEXT_PUBLIC_SITE_URL` | `https://mojii.store`     |
| `MONOBANK_TOKEN`       | Merchant acquiring token  |

Before going live:

- Verify `mojii.store` domain in Resend (Settings -> Domains -> add DNS records)
- Get a real merchant token from Monobank (app -> Acquiring section)
- Replace placeholder download URLs in `app/api/webhook/route.ts`

## Adding a new locale

Edit `lib/locales.ts` — add to `LOCALES`, `LOCALE_LABELS`. Add translations to `lib/i18n.ts`. Everything else picks it up automatically.

## Adding more packs

Add a new object to the `packs` array in `lib/packs.ts`. Pages are auto-generated.

## Commission summary

| Service                | Cost               |
| ---------------------- | ------------------ |
| Vercel hosting         | Free               |
| Resend emails          | Free (3,000/month) |
| Google Drive           | Free               |
| Monobank commission    | ~1.5-2% per sale   |
| **Total per $25 sale** | **~$0.40**         |
