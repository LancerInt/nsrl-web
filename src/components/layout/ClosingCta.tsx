import { contact } from "@/content/site";
import { ActionLink } from "@/components/ui/ActionLink";

/**
 * The one closing ask, on every page.
 *
 * It used to be the top band of the footer, which meant that on the homepage
 * the navy facility showcase, the navy ask and the navy footer ran together
 * into one unbroken dark block most of a screen tall — three sections that
 * read as one. Lifting it out of the footer onto paper puts a light band
 * between them and gives each a boundary of its own.
 *
 * Light also suits what it is. The dark bands on this site are atmosphere;
 * this one is a form of address, and a request for a proposal reads better
 * in the same register as the rest of the page's working text.
 *
 * It sits outside `<main>` beside the footer, because it belongs to the site
 * rather than to any page — which is also why no page adds a second one.
 */
export function ClosingCta() {
  return (
    <section
      data-theme="light"
      aria-labelledby="closing-cta"
      className="border-t border-[var(--rule)] bg-canvas-sunken"
    >
      <div className="shell py-[clamp(3rem,5vw,4.5rem)]">
        <div className="grid items-center gap-x-12 gap-y-7 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <p className="label-mono text-meniscus-600">Start a programme</p>
            <h2
              id="closing-cta"
              className="mt-3 max-w-[18ch] font-display text-d3 text-ink-950"
            >
              Plan your next regulatory study.
            </h2>
            <p className="mt-4 max-w-[52ch] text-lead text-neutral-700">
              We will identify the endpoints, guidelines and specialist divisions your project
              requires — and advise you clearly on which studies are necessary.
            </p>
          </div>

          <div className="flex flex-col items-start gap-5 lg:items-end">
            <div className="flex flex-wrap gap-3">
              <ActionLink href="/contact" variant="solid">
                Request a proposal
              </ActionLink>
              <ActionLink href="/products" variant="outline">
                Study packages
              </ActionLink>
            </div>
            <a
              href={`tel:${contact.phoneHref}`}
              className="inline-flex min-h-9 items-center font-display text-h2 text-ink-950 transition-colors duration-200 hover:text-meniscus-600"
            >
              {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
