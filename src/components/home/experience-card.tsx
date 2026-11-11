import type { Dictionary } from "@/i18n/get-dictionary";
import { Card } from "./card";

export function ExperienceCard({ dict }: { dict: Dictionary }) {
  const { label, items } = dict.experience;

  return (
    <Card id="experience" className="scroll-mt-6">
      <h2 className="text-xs uppercase tracking-[0.25em] text-cream/45">{label}</h2>

      <ol className="mt-6">
        {items.map((item, index) => {
          const isCurrent = index === 0;
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.company}-${item.period}`}
              className={`relative pl-7 ${isLast ? "" : "pb-8"}`}
            >
              {/* Timeline: dot per role, line connecting to the next one. */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute top-5 bottom-1 left-[5px] w-px bg-cream/10"
                />
              )}
              <span
                aria-hidden="true"
                className={`absolute top-[7px] left-0 size-[11px] rounded-full border ${
                  isCurrent
                    ? "border-cream bg-cream ring-4 ring-cream/10"
                    : "border-cream/35 bg-ink"
                }`}
              />

              {/* Narrow: role, company, dates stacked. Wide: dates top-right of the role. */}
              <div className="grid gap-y-1 @min-[480px]:grid-cols-[minmax(0,1fr)_auto] @min-[480px]:items-baseline @min-[480px]:gap-x-4">
                <h3 className="text-base font-medium leading-snug">{item.role}</h3>
                <p className="text-sm text-cream/60">
                  {item.company} · {item.type}
                </p>
                <p className="text-xs whitespace-nowrap text-cream/45 @min-[480px]:col-start-2 @min-[480px]:row-start-1">
                  {item.period}
                </p>
              </div>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-cream/10 bg-cream/[0.03] px-2.5 py-1 text-xs text-cream/65"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
