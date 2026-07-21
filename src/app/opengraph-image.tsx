import { ImageResponse } from "next/og";

import { site } from "@/content/site";

/**
 * The root Open Graph card, drawn rather than photographed — same decision as
 * <SpecimenPlate> elsewhere on the site.
 *
 * ImageResponse renders through Satori, which supports only a subset of CSS:
 * flexbox but no grid, no custom properties, no Tailwind classes, and every
 * element needs an explicit `display`. Nothing is fetched at build time — the
 * orbital mark is two rotated rings built from borders, and the type falls back
 * to the renderer's bundled sans, so this can never fail on a network hiccup.
 */

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK_950 = "#050b16";
const INK_100 = "#cfe0f3";
const SIGNAL_400 = "#5bbf5f";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          backgroundColor: INK_950,
          color: "#ffffff",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Wash: keeps the right-hand rings from reading as a hard cut-out. */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(100deg, #050b16 30%, #0a1526 72%, #0e2e5c 100%)",
          }}
        />

        {/* The mark, reduced to its geometry and bled off the right edge. */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 55,
            right: -150,
            width: 520,
            height: 520,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              position: "absolute",
              width: 250,
              height: 500,
              borderRadius: "50%",
              border: "2px solid rgba(155,190,228,0.30)",
              transform: "rotate(-32deg)",
            }}
          />
          <div
            style={{
              display: "flex",
              position: "absolute",
              width: 250,
              height: 500,
              borderRadius: "50%",
              border: "2px solid rgba(91,191,95,0.42)",
              transform: "rotate(32deg)",
            }}
          />
          <div
            style={{
              display: "flex",
              position: "absolute",
              width: 22,
              height: 22,
              borderRadius: "50%",
              backgroundColor: SIGNAL_400,
            }}
          />
        </div>

        {/* Calibration label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 56,
              height: 2,
              backgroundColor: SIGNAL_400,
              marginRight: 20,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 21,
              letterSpacing: "0.2em",
              color: INK_100,
            }}
          >
            CONTRACT RESEARCH ORGANISATION
          </div>
        </div>

        {/* Wordmark and tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 190,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            {site.name}
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              height: 1,
              backgroundColor: "rgba(255,255,255,0.18)",
              marginTop: 44,
              marginBottom: 36,
            }}
          />

          <div
            style={{
              display: "flex",
              fontSize: 42,
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
              color: INK_100,
              /* Forces the break after "research," rather than after "start to". */
              maxWidth: 640,
            }}
          >
            {site.tagline}
          </div>
        </div>

        {/* Baseline strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            fontSize: 20,
            letterSpacing: "0.16em",
            color: "rgba(207,224,243,0.62)",
          }}
        >
          <div style={{ display: "flex" }}>SRIPERUMBUDUR · TAMIL NADU · INDIA</div>
          <div style={{ display: "flex" }}>NSRL.CO.IN</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
