import { stats } from "@/content/profile";
import type { Dictionary } from "@/i18n/get-dictionary";
import { SparkleIcon } from "../sparkle-icon";
import { Card } from "./card";

export function ProfileCard({ dict }: { dict: Dictionary }) {
  const items = [
    { label: dict.profile.projects, value: stats.projects },
    { label: dict.profile.years, value: stats.years },
  ];

  return (
    <Card className="flex flex-col gap-6 @min-[520px]:flex-row @min-[520px]:items-start @min-[520px]:justify-between">
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex size-[60px] shrink-0 items-center justify-center rounded-full border border-line"
        >
          <SparkleIcon className="size-6" />
        </span>
        <div>
          <p className="text-[30px] font-medium leading-none tracking-tight">
            {dict.profile.name}
          </p>
          <p className="mt-2 text-[15px] leading-snug text-cream/55">
            {dict.hero.role} · {dict.profile.location}
          </p>
        </div>
      </div>

      <dl className="flex shrink-0 gap-8">
        {items.map((item) => (
          <div key={item.label}>
            <dt className="text-[11px] uppercase tracking-[0.2em] text-cream/40">
              {item.label}
            </dt>
            <dd className="mt-1.5 text-lg font-medium">{item.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
