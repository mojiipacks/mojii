// TODO: replace with DB (Vercel KV, Supabase, etc.) for production
const store = new Map<string, string>();

function key(email: string, tierId: string) {
  return `${email}|${tierId}`;
}

export function saveInvoiceId(email: string, tierId: string, invoiceId: string) {
  store.set(key(email, tierId), invoiceId);
}

export function getInvoiceId(email: string, tierId: string): string | undefined {
  return store.get(key(email, tierId));
}
