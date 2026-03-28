# MOJII

Premium sample packs for producers. Next.js 14 + Tailwind CSS + Monobank Acquiring + Resend.

## Stack

- **Next.js 14** (App Router) — pages, API routes, SSG, i18n (en/uk)
- **Tailwind CSS** — styling
- **Monobank Acquiring** — payments (~1.5-2% commission)
- **Resend** — transactional email delivery
- **Vercel** — hosting
- **Google Drive** — file storage

## Quick start

```bash
cp .env.example .env
pnpm install
pnpm dev
```

Open http://localhost:3000

## Environment variables

| Variable               | Description                                                                  |
| ---------------------- | ---------------------------------------------------------------------------- |
| `RESEND_API_KEY`       | [Resend](https://resend.com) API key for sending emails                      |
| `NEXT_PUBLIC_SITE_URL` | Site URL (e.g. `https://mojii.com` or tunnel URL for dev)                    |
| `MONOBANK_TOKEN`       | Monobank merchant API token ([docs](https://monobank.ua/api-docs/acquiring)) |

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

## Testing payments locally

1. Get a test token from [api.monobank.ua](https://api.monobank.ua)
2. Start a tunnel: `npx localtunnel --port 3000`
3. Set `NEXT_PUBLIC_SITE_URL` to the tunnel URL in `.env`
4. Restart dev server
5. Use any card number that passes Luhn check, any expiry/CVV

## Git hooks (lefthook)

- **pre-commit**: prettier + type-check
- **commit-msg**: [conventional commits](https://www.conventionalcommits.org/) via commitlint
- **pre-push**: tests + build

## CI

GitHub Actions runs on push/PR to `main`: type-check, test, build.

## Adding a new locale

Edit `lib/locales.ts` — add to `LOCALES`, `LOCALE_LABELS`. Add translations to `lib/i18n.ts`. Everything else picks it up automatically.

## Adding more packs

Add a new object to the `packs` array in `lib/packs.ts`. Pages are auto-generated.

## Deploy to Vercel

Connect the GitHub repo at [vercel.com/new](https://vercel.com/new). Set the three env variables in Vercel dashboard.

## Commission summary

| Service                | Cost               |
| ---------------------- | ------------------ |
| Vercel hosting         | Free               |
| Resend emails          | Free (3,000/month) |
| Google Drive           | Free               |
| Monobank commission    | ~1.5-2% per sale   |
| **Total per $25 sale** | **~$0.40**         |
