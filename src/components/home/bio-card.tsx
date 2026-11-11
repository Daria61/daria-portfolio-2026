import type { Dictionary } from "@/i18n/get-dictionary";
import { CalendarIcon, LayersIcon } from "../icons";
import { Card } from "./card";

export function BioCard({ dict }: { dict: Dictionary }) {
  return (
    <Card className="flex flex-col justify-between gap-6">
      <p className="text-[15px] leading-relaxed text-cream/85 sm:text-base sm:leading-[1.7]">
        {dict.bio.text}
      </p>
      <ul className="flex flex-col gap-3 text-sm text-cream/55 @min-[520px]:flex-row @min-[520px]:gap-8">
        <li className="flex items-center gap-3">
          <LayersIcon className="size-4 shrink-0 text-cream/40" />
          {dict.bio.focus}
        </li>
        <li className="flex items-center gap-3">
          <CalendarIcon className="size-4 shrink-0 text-cream/40" />
          {dict.bio.availability}
        </li>
      </ul>
    </Card>
  );
}
