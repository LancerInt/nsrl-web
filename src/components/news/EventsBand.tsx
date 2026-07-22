import { newsroomNote } from "@/content/news";
import { site } from "@/content/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealText } from "@/components/ui/RevealText";
import { ActionLink } from "@/components/ui/ActionLink";
import { Section, SectionBody } from "@/components/ui/Section";
import { OrbitalMark } from "@/components/visuals/OrbitalMark";

/**
 * Events. The archive above is written up after the fact; anything moving
 * faster than that is posted to LinkedIn, so the band exists to hand the
 * visitor off cleanly rather than to imply a calendar we do not publish.
 */
export function EventsBand() {
  return (
    <Section bleed id="events" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-[-8rem] hidden w-[38rem] opacity-[0.16] lg:block"
      >
        <OrbitalMark className="h-full w-full" />
      </div>

      <SectionBody className="shell relative">
        <div className="egrid items-end gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <Eyebrow index="02">
              Live updates
            </Eyebrow>

            <RevealText as="h2" className="mt-6 font-display text-d2 text-ink-950">
              {newsroomNote.title}
            </RevealText>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className="text-lead text-neutral-600">{newsroomNote.body}</p>

            <div className="mt-7">
              <ActionLink
                href={site.linkedin}
                external
                variant="solid"
                icon="diagonal"
 
              >
                {newsroomNote.cta}
              </ActionLink>
              <p className="label-mono mt-5 text-neutral-600">
                LinkedIn — opens in a new tab
              </p>
            </div>
          </div>
        </div>
      </SectionBody>
    </Section>
  );
}
