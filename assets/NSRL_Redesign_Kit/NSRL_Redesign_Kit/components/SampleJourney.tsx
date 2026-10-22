"use client";
import { useState } from "react";

// Copy SVG icons from assets/ to your public/nsrl-redesign/icons/ folder.
// A relationship selector, not a chronological study workflow.
const divisions = [
  {
    "name": "toxicology",
    "title": "Toxicology",
    "description": "Safety assessment supported by the shared quality system."
  },
  {
    "name": "ecotoxicology",
    "title": "Ecotoxicology",
    "description": "Environmental research across aquatic and terrestrial themes."
  },
  {
    "name": "chemistry",
    "title": "Chemistry",
    "description": "Identity, purity and stability work linked to the test-item record."
  },
  {
    "name": "microbiology",
    "title": "Microbiology",
    "description": "Microbiological research with traceable samples and methods."
  },
  {
    "name": "entomology",
    "title": "Entomology",
    "description": "Insect-related study capabilities linked to the same archive."
  },
  {
    "name": "vivarium",
    "title": "Vivarium",
    "description": "Animal housing and care within the programme\u2019s defined scope."
  },
  {
    "name": "custom-studies",
    "title": "Custom studies",
    "description": "A study-specific selection of relevant capabilities."
  }
] as const;
export default function SampleJourney() {
  const [selected, setSelected] = useState(0);
  const current = divisions[selected];
  return <section aria-label="Scientific division relationships" className="nsrl-relationships">
    <div role="group" aria-label="Choose a division" className="nsrl-choices">
      {divisions.map((d, i) => <button key={d.name} type="button" aria-pressed={selected === i} onClick={() => setSelected(i)}>
        <img src={`/nsrl-redesign/icons/icon-${d.name}.svg`} alt="" width={32} height={32} />{d.title}
      </button>)}
    </div>
    <div className="nsrl-relationship-detail" aria-live="polite" aria-atomic="true">
      <p className="nsrl-eyebrow">ONE SHARED QUALITY SYSTEM</p><h3>{current.title}</h3><p>{current.description}</p>
      <small>Conceptual relationships. Study scope and division involvement vary.</small>
    </div>
    <style>{`
      .nsrl-relationships{display:grid;grid-template-columns:1fr 1fr;gap:32px;color:#10263b}
      .nsrl-choices{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .nsrl-choices button{font:inherit;cursor:pointer;display:flex;align-items:center;gap:12px;text-align:left;padding:16px;border:1px solid #d8e2de;border-radius:8px;background:#fff;transition:background .18s,border-color .18s}
      .nsrl-choices button[aria-pressed=true]{background:#e5eee8;border-color:#187a72}
      .nsrl-choices button:focus-visible{outline:3px solid #187a72;outline-offset:3px}
      .nsrl-relationship-detail{padding:32px;background:#f2f5f0;border-radius:16px}
      .nsrl-eyebrow{font-size:12px;letter-spacing:.08em;color:#187a72}
      @media(max-width:700px){.nsrl-relationships{grid-template-columns:1fr}}
      @media(prefers-reduced-motion:reduce){.nsrl-choices button{transition:none}}
    `}</style>
  </section>;
}
