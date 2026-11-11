import Image from "next/image";
import { projects, type Project } from "@/content/projects";
import type { Dictionary } from "@/i18n/get-dictionary";
import { ArrowUpRightIcon } from "./icons";
import { SectionHeading } from "./section-heading";

const pad = (n: number) => String(n).padStart(2, "0");

/** Background shared by every project card. Change it here to recolor them all. */
const CARD_SURFACE = "border border-cream/10 bg-cream/[0.035]";

export function WorkSection({ dict }: { dict: Dictionary }) {
  const text = dict.work;
  // With an odd number of projects, fill the empty grid slot on wide screens.
  const showComingSoon = projects.length % 2 === 1;

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mx-auto w-full max-w-[1332px] scroll-mt-6 px-4 pt-24 sm:px-8 sm:pt-32"
    >
      <SectionHeading
        id="work-title"
        eyebrow={text.eyebrow}
        title={text.title}
        intro={text.intro}
      />

      <ul className="mt-12 grid gap-x-5 gap-y-12 md:mt-16 md:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.id}>
            <ProjectCard
              project={project}
              number={pad(index + 1)}
              text={text.items[project.id]}
              newTabLabel={text.newTab}
            />
          </li>
        ))}
        {showComingSoon && (
          <li className="hidden md:block">
            <div className="relative flex aspect-[4/3] items-center justify-center rounded-[28px] border border-dashed border-cream/15">
              <span className="absolute top-4 left-4 rounded-full border border-cream/15 px-3 py-1.5 font-mono text-xs font-bold text-cream/45">
                {pad(projects.length + 1)}
              </span>
              <p className="px-6 text-center font-mono text-sm uppercase tracking-[0.2em] text-cream/40">
                {text.comingSoon}
              </p>
            </div>
          </li>
        )}
      </ul>
    </section>
  );
}

type ProjectText = Dictionary["work"]["items"][Project["id"]];

function ProjectCard({
  project,
  number,
  text,
  newTabLabel,
}: {
  project: Project;
  number: string;
  text: ProjectText;
  newTabLabel: string;
}) {
  const linked = Boolean(project.href);
  const hoverZoom = linked ? "transition-transform duration-500 group-hover:scale-[1.03]" : "";

  const content = (
    <>
      {/* @container: covers adapt to the card's own width (narrow on phones and
          in the two-column grid below ~1024px), keeping clear of the number chip. */}
      <div className={`@container relative aspect-[4/3] overflow-hidden rounded-[28px] ${CARD_SURFACE}`}>
        {project.logos ? (
          // Logo wall: 5 columns, wide logos span two. Read out as one image.
          <div
            role="img"
            aria-label={text.alt}
            className="absolute inset-0 m-auto grid h-fit w-[86%] grid-cols-5 gap-2.5 @min-[480px]:w-[78%] @min-[480px]:gap-4"
          >
            {project.logos.map((logo) => (
              <Image
                key={logo.src}
                src={logo.src}
                alt=""
                width={logo.wide ? 200 : 100}
                height={100}
                sizes={logo.wide ? "240px" : "120px"}
                // Rounder than the source logos' own corners (up to ~24%), so the
                // background baked into their corners is always clipped away.
                className={`h-auto w-full ${logo.wide ? "col-span-2 rounded-[12%/24%]" : "rounded-[24%]"}`}
              />
            ))}
          </div>
        ) : project.screens ? (
          // App screens side by side. Read out as one image.
          <div
            role="img"
            aria-label={text.alt}
            className={`absolute inset-0 flex items-center justify-center gap-3 pt-6 @min-[480px]:gap-5 @min-[480px]:pt-0 ${hoverZoom}`}
          >
            {project.screens.map((screen) => (
              <Image
                key={screen.src}
                src={screen.src}
                alt=""
                width={screen.width}
                height={screen.height}
                sizes="(min-width: 1332px) 170px, (min-width: 768px) 14vw, 26vw"
                className="h-auto w-[24%] rounded-md shadow-xl shadow-black/40 ring-1 ring-white/10 @min-[480px]:w-[26%] @min-[480px]:rounded-lg"
              />
            ))}
          </div>
        ) : (
          // Website screenshot shown as a floating window.
          <div className="absolute inset-0 flex items-center justify-center px-6 pt-12 pb-5 @min-[480px]:p-8">
            <Image
              src={project.image}
              alt={text.alt}
              width={project.frame.width}
              height={project.frame.height}
              sizes="(min-width: 1332px) 560px, (min-width: 768px) 45vw, 90vw"
              className={`h-auto w-full rounded-lg shadow-2xl shadow-black/50 ring-1 ring-white/10 @min-[480px]:rounded-xl ${hoverZoom}`}
            />
          </div>
        )}
        <span className="absolute top-4 left-4 rounded-full bg-black/55 px-3 py-1.5 font-mono text-xs font-bold backdrop-blur-sm">
          {number}
        </span>
        {linked && (
          <span
            aria-hidden="true"
            className="absolute right-4 bottom-4 flex size-12 items-center justify-center rounded-full bg-cream text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <ArrowUpRightIcon className="size-5" />
          </span>
        )}
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-2xl font-bold tracking-tight">{text.title}</h3>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cream/55">
          {text.location}
        </p>
      </div>
      <p className="mt-2 font-mono text-sm text-cream/55">{text.tags.join(" · ")}</p>
      {linked && <span className="sr-only">({newTabLabel})</span>}
    </>
  );

  return linked ? (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className="group block">
      {content}
    </a>
  ) : (
    <article>{content}</article>
  );
}
