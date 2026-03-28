import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://mojii.com");
vi.stubEnv("MONOBANK_TOKEN", "test-token");

vi.spyOn(console, "log").mockImplementation(() => {});
vi.spyOn(console, "error").mockImplementation(() => {});

function makeRequest(body: Record<string, unknown>) {
  return new Request("http://localhost/api/create-invoice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

const validBody = {
  tierId: "guitar-basic",
  packTitle: "GUITAR PACK",
  tierName: "BASIC",
  price: 15,
  email: "buyer@example.com",
  lang: "en",
};

describe("POST /api/create-invoice", () => {
  let POST: (req: Request) => Promise<Response>;

  beforeEach(async () => {
    vi.clearAllMocks();
    const mod = await import("./route");
    POST = mod.POST as unknown as (req: Request) => Promise<Response>;
  });

  it("returns 400 when tierId is missing", async () => {
    const res = await POST(makeRequest({ price: 15, email: "test@test.com" }));

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Missing fields");
  });

  it("returns 400 when price is missing", async () => {
    const res = await POST(makeRequest({ tierId: "guitar-basic", email: "test@test.com" }));

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Missing fields");
  });

  it("returns 400 when email is missing", async () => {
    const res = await POST(makeRequest({ tierId: "guitar-basic", price: 15 }));

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Missing fields");
  });

  it("calls monobank API with correct body", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ pageUrl: "https://pay.mono.ua/xxx", invoiceId: "inv123" }),
    });

    await POST(makeRequest(validBody));

    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, opts] = mockFetch.mock.calls[0];

    expect(url).toBe("https://api.monobank.ua/api/merchant/invoice/create");
    expect(opts.method).toBe("POST");
    expect(opts.headers["X-Token"]).toBe("test-token");

    const sentBody = JSON.parse(opts.body);
    expect(sentBody.amount).toBe(1500);
    expect(sentBody.ccy).toBe(840);
    expect(sentBody.merchantPaymInfo.reference).toMatch(/^guitar-basic\|buyer@example\.com\|\d+$/);
    expect(sentBody.merchantPaymInfo.destination).toBe("MOJII GUITAR PACK — BASIC");
    expect(sentBody.redirectUrl).toContain("https://mojii.com/success");
    expect(sentBody.redirectUrl).toContain("email=buyer%40example.com");
    expect(sentBody.webhookUrl).toBe("https://mojii.com/api/webhook");
  });

  it("returns pageUrl and invoiceId on success", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ pageUrl: "https://pay.mono.ua/xxx", invoiceId: "inv123" }),
    });

    const res = await POST(makeRequest(validBody));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.pageUrl).toBe("https://pay.mono.ua/xxx");
    expect(data.invoiceId).toBe("inv123");
  });

  it("returns 500 when monobank returns error", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: () => Promise.resolve("Unauthorized"),
    });

    const res = await POST(makeRequest(validBody));

    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe("Payment provider error");
  });

  it("converts price to kopecks correctly", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ pageUrl: "https://pay.mono.ua/xxx", invoiceId: "inv123" }),
    });

    await POST(makeRequest({ ...validBody, price: 25.99 }));

    const sentBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(sentBody.amount).toBe(2599);
  });

  it("defaults lang to en", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ pageUrl: "https://pay.mono.ua/xxx", invoiceId: "inv123" }),
    });

    const { lang: _, ...bodyWithoutLang } = validBody;
    await POST(makeRequest(bodyWithoutLang));

    const sentBody = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(sentBody.redirectUrl).toContain("lang=en");
  });
});
