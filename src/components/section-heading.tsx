/** "( LABEL )" + big title on the left, short monospace intro on the right. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  as: Heading = "h2",
}: {
  /** id of the heading, for the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** "h1" when the heading is the page's main title (e.g. the pricing page). */
  as?: "h1" | "h2";
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
      <div>
        <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-cream/60">
          ( {eyebrow} )
        </p>
        <Heading
          id={id}
          className="mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-black tracking-[-0.045em] text-balance"
        >
          {title}
        </Heading>
      </div>
      <p className="max-w-sm font-mono text-sm leading-7 text-cream/55 md:mb-1">{intro}</p>
    </div>
  );
}
