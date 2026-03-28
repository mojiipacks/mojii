# MOJII — Setup Guide

## Stack

- **Next.js 14** — website + SEO + API routes
- **Vercel** — free hosting
- **Monobank Acquiring** — payments (~1.5-2% commission)
- **Resend** — automatic email delivery
- **Google Drive** — file storage (free)

---

## Step 1 — Install & run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Step 2 — Set up Monobank Acquiring

1. Open Monobank app → Business account (ФОП)
2. Go to **Еквайринг** section
3. Register merchant → get your **X-Token**
4. Copy token to `.env.local` as `MONOBANK_TOKEN`

---

## Step 3 — Set up Resend

1. Go to https://resend.com → sign up (free)
2. Add your domain (mojii.com) → verify DNS
3. Get API key → copy to `.env.local` as `RESEND_API_KEY`

---

## Step 4 — Set up Google Drive downloads

1. Upload each pack ZIP to Google Drive
2. Right-click → Share → "Anyone with the link"
3. Copy the link
4. Paste into `app/api/webhook/route.ts` in `DOWNLOAD_LINKS` object:

```ts
const DOWNLOAD_LINKS: Record<string, string> = {
  "guitar-cutted": "https://drive.google.com/your-cutted-link",
  "guitar-basic": "https://drive.google.com/your-basic-link",
  "guitar-extended": "https://drive.google.com/your-extended-link",
};
```

---

## Step 5 — Set up Vercel KV (for email <-> invoice mapping)

1. Go to https://vercel.com → your project → Storage → Create KV database
2. It auto-adds `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN` to your env
3. In `app/api/create-invoice/route.ts` — uncomment KV save code
4. In `app/api/webhook/route.ts` — uncomment KV read code

---

## Step 6 — Add SoundCloud previews

1. Upload your preview track to SoundCloud
2. Get the track URL (e.g. `https://soundcloud.com/mojii/guitar-pack-preview`)
3. Paste into `lib/packs.ts` in the `soundcloudUrl` field

---

## Step 7 — Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at https://vercel.com/new

Add environment variables in Vercel dashboard:

- `MONOBANK_TOKEN`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_SITE_URL=https://mojii.com`

---

## Step 8 — Add your domain

1. Buy domain (Namecheap ~$10/yr for .com)
2. Vercel → Project → Domains → Add `mojii.com`
3. Update DNS at Namecheap as Vercel instructs

---

## Adding more packs later

Edit `lib/packs.ts` — add a new object to the `packs` array. That's it. The page is auto-generated.

---

## Commission summary

| Service                | Cost              |
| ---------------------- | ----------------- |
| Vercel hosting         | Free              |
| Resend emails          | Free (3000/month) |
| Google Drive           | Free              |
| Monobank commission    | ~1.5–2% per sale  |
| **Total per $25 sale** | **~$0.40**        |
