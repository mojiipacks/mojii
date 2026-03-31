import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockSend } = vi.hoisted(() => ({
  mockSend: vi.fn().mockResolvedValue({ id: "test-email-id" }),
}));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mockSend };
  },
}));

vi.mock("node:crypto", () => ({
  default: {
    createVerify: () => ({
      write: vi.fn(),
      end: vi.fn(),
      verify: vi.fn().mockReturnValue(false),
    }),
  },
}));

function makeRequest(body: Record<string, unknown>, headers?: Record<string, string>) {
  return new Request("http://localhost/api/webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

vi.spyOn(console, "log").mockImplementation(() => {});
vi.spyOn(console, "error").mockImplementation(() => {});

describe("POST /api/webhook", () => {
  let POST: (req: Request) => Promise<Response>;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    vi.unstubAllEnvs();
    const mod = await import("./route");
    POST = mod.POST as unknown as (req: Request) => Promise<Response>;
  });

  it("ignores non-success statuses", async () => {
    const res = await POST(
      makeRequest({ status: "created", reference: "guitar-basic|test@test.com|123" }),
    );
    const data = await res.json();

    expect(data).toEqual({ ok: true });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("ignores processing status", async () => {
    const res = await POST(
      makeRequest({ status: "processing", reference: "guitar-basic|test@test.com|123" }),
    );
    const data = await res.json();

    expect(data).toEqual({ ok: true });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("sends email on success with valid reference", async () => {
    const res = await POST(
      makeRequest({
        status: "success",
        reference: "guitar-basic|buyer@example.com|1234567890",
      }),
    );
    const data = await res.json();

    expect(data).toEqual({ ok: true });
    expect(mockSend).toHaveBeenCalledOnce();

    const sendArgs = mockSend.mock.calls[0][0];
    expect(sendArgs.to).toBe("buyer@example.com");
    expect(sendArgs.subject).toContain("MOJII");
    expect(sendArgs.html).toContain("GUITAR PACK — BASIC");
    expect(sendArgs.html).toContain("https://drive.google.com/your-basic-link");
  });

  it("handles all three tiers", async () => {
    const tiers = ["guitar-cutted", "guitar-basic", "guitar-extended"];

    for (const tierId of tiers) {
      vi.clearAllMocks();
      const res = await POST(
        makeRequest({
          status: "success",
          reference: `${tierId}|test@test.com|123`,
        }),
      );
      const data = await res.json();

      expect(data).toEqual({ ok: true });
      expect(mockSend).toHaveBeenCalledOnce();
    }
  });

  it("rejects invalid reference format (no pipe separator)", async () => {
    const res = await POST(
      makeRequest({
        status: "success",
        reference: "guitar-basic-test@test.com-123",
      }),
    );
    const data = await res.json();

    expect(data).toEqual({ ok: true });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects missing reference", async () => {
    const res = await POST(makeRequest({ status: "success" }));
    const data = await res.json();

    expect(data).toEqual({ ok: true });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects unknown tier ID", async () => {
    const res = await POST(
      makeRequest({
        status: "success",
        reference: "drums-pack|test@test.com|123",
      }),
    );
    const data = await res.json();

    expect(data).toEqual({ ok: true });
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("rejects invalid email in reference", async () => {
    const res = await POST(
      makeRequest({
        status: "success",
        reference: "guitar-basic|not-an-email|123",
      }),
    );

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("Invalid email");
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("returns 500 when resend throws", async () => {
    mockSend.mockRejectedValueOnce(new Error("Resend API down"));

    const res = await POST(
      makeRequest({
        status: "success",
        reference: "guitar-basic|test@test.com|123",
      }),
    );

    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data).toEqual({ error: "Internal error" });
  });

  it("rejects missing x-sign in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.resetModules();
    const mod = await import("./route");
    const prodPOST = mod.POST as unknown as (req: Request) => Promise<Response>;

    const res = await prodPOST(
      makeRequest({ status: "success", reference: "guitar-basic|test@test.com|123" }),
    );

    expect(res.status).toBe(401);
    expect(mockSend).not.toHaveBeenCalled();
  });
});
