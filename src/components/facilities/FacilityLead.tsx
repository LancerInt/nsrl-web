import { ConceptualLabel } from "@/components/visuals/ConceptualLabel";
import { facilityLead, images } from "@/content/imagery";
import { locations } from "@/content/site";
import { SpecimenPlate } from "@/components/visuals/SpecimenPlate";

const photo = images[facilityLead];

/**
 * The first thing the facilities page should do is show the place.
 *
 * A wide frame directly under the title block, held at 21:9 so it reads as a
 * establishing shot rather than a card, with the address set against it. The
 * specifications follow; this is the one moment on the page that is allowed
 * to be purely visual.
 */
export function FacilityLead() {
  const office = locations[0];

  return (
    <section aria-label="The site" className="bg-canvas pb-[var(--section-y-tight)]">
      <div className="shell">
        {/* 16:9, not a wider letterbox. The source is 3:2, so a 21:9 frame
            throws away a third of its height and the subject with it. */}
        <figure data-reveal className="relative img-frame aspect-[4/3] sm:aspect-[16/9]">
          <SpecimenPlate
            src={photo.src}
            alt={photo.alt}
            position={photo.position}
            sizes="(min-width: 1280px) 1184px, 100vw"
            priority
          />
          {/* A navy foot, so the caption sits on the artwork with the same
              contrast whatever the frame's own exposure is. */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-950/85 to-transparent"
          />
          <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <p className="label-mono text-meniscus-200">{office.role}</p>
            <p className="mt-1.5 font-display text-h2 text-white">
              {office.locality}, {office.region}
            </p>
            {/* The lead frame on the facilities page is the single most
                likely image on the site to be taken as documentation of the
                Salem site, because the heading above it names the site. */}
            <ConceptualLabel tone="deep" className="mt-2" />
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
