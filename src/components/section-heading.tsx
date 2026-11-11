/** "( LABEL )" + big title on the left, short monospace intro on the right. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
}: {
  /** id of the <h2>, for the section's aria-labelledby. */
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
      <div>
        <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-cream/60">
          ( {eyebrow} )
        </p>
        <h2
          id={id}
          className="mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] font-black tracking-[-0.045em]"
        >
          {title}
        </h2>
      </div>
      <p className="max-w-sm font-mono text-sm leading-7 text-cream/55 md:mb-1">{intro}</p>
    </div>
  );
}
