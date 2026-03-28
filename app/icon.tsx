import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 32,
        height: 32,
        background: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
      }}
    >
      <span
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#39FF14",
          letterSpacing: 1,
          lineHeight: 1,
        }}
      >
        II
      </span>
    </div>,
    { ...size },
  );
}
