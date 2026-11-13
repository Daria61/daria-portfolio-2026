import { CheckIcon, ClockIcon, LayersIcon, PinIcon } from "./icons";

export type PriceCardProps = {
  number: number;
  name: string;
  tagline: string;
  /** Who it's for. Optional (poster packs don't have one). */
  description?: string;
  /** Price as one or more parts; several are joined with " – " (a range). */
  price: { parts: string[]; unit?: string };
  /** Small line under the price, e.g. "One-time payment". */
  priceNote?: string;
  /** Icon line under the price: delivery time (clock) or quantity (stack). */
  meta: { icon: "clock" | "stack"; text: string };
  features: string[];
  /** One light line right above the button, e.g. what happens after launch. */
  note?: string;
  /** With `newTabLabel`, the link opens in a new tab (e.g. Messenger). */
  cta: { href: string; label: string; newTabLabel?: string };
  /** Shown as a badge on the card's top edge; also highlights the card. */
  badge?: string;
  /** Heading level for the package name, one below its section's heading. */
  headingLevel?: "h2" | "h3";
};

// Tailwind needs whole class names, so the possible row spans are listed.
const ROW_SPAN: Record<number, string> = {
  5: "lg:row-span-5",
  6: "lg:row-span-6",
  7: "lg:row-span-7",
};

/**
 * One pricing package, in the order people scan a price list: name, price,
 * who it's for, what's included, button. On desktop its parts sit on rows
 * shared with the cards beside it (CSS subgrid), so prices, lists and buttons
 * line up across a row of cards whatever the text lengths. The parent <ul>
 * must be a 3-column grid.
 * (No @container on the card: container queries turn a subgrid into "none".)
 */
export function PriceCard({
  number,
  name,
  tagline,
  description,
  price,
  priceNote,
  meta,
  features,
  note,
  cta,
  badge,
  headingLevel: Heading = "h3",
}: PriceCardProps) {
  const featured = Boolean(badge);
  const muted = featured ? "text-ink/60" : "text-cream/55";
  const rows = 5 + (description ? 1 : 0) + (note ? 1 : 0);
  const MetaIcon = meta.icon === "clock" ? ClockIcon : LayersIcon;

  return (
    <li
      className={`relative flex flex-col rounded-[28px] p-6 sm:p-7 lg:grid lg:grid-rows-subgrid lg:gap-y-0 ${ROW_SPAN[rows]} ${
        featured ? "bg-cream text-ink" : "border border-cream/10 bg-cream/[0.035]"
      }`}
    >
      {/* Badge sits on the card's top edge so the name keeps one line. */}
      {badge && (
        <span className="absolute -top-3.5 right-6 rounded-full border border-ink/10 bg-ink px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] whitespace-nowrap text-cream">
          {badge}
        </span>
      )}

      <div>
        <Heading className="text-2xl font-black uppercase tracking-[-0.03em]">{name}</Heading>
        <p className={`mt-1 text-sm ${muted}`}>
          {String(number).padStart(2, "0")} · {tagline}
        </p>
      </div>

      <div className="mt-5">
        {/* A range wraps at the dash, never inside a number, when the card is narrow. */}
        <p className="text-[22px] font-extrabold tracking-tight tabular-nums sm:text-[26px] lg:text-[22px] xl:text-[26px]">
          {price.parts.map((part, i) => (
            <span key={part}>
              {i > 0 && " – "}
              <span className="whitespace-nowrap">{part}</span>
            </span>
          ))}
          {price.unit && (
            <span className={`ml-1.5 text-base font-medium ${muted}`}>{price.unit}</span>
          )}
        </p>
        {priceNote && (
          <p className={`mt-1 text-xs uppercase tracking-[0.15em] ${muted}`}>{priceNote}</p>
        )}
      </div>

      <p className={`mt-3 flex items-center gap-2 text-sm ${featured ? "text-ink/80" : "text-cream/80"}`}>
        <MetaIcon className="size-4 shrink-0" />
        {meta.text}
      </p>

      {description && (
        <p className={`mt-5 text-[15px] leading-relaxed ${featured ? "text-ink/75" : "text-cream/75"}`}>
          {description}
        </p>
      )}

      <ul
        className={`mt-5 space-y-3 border-t pt-5 text-[15px] ${
          featured ? "border-ink/15" : "border-cream/10"
        }`}
      >
        {features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <CheckIcon className={`mt-0.5 size-4 shrink-0 ${featured ? "text-ink" : "text-cream"}`} />
            <span className={featured ? "text-ink/85" : "text-cream/85"}>{feature}</span>
          </li>
        ))}
      </ul>

      {note && (
        // A light line, not a box. On desktop it sits at the bottom of its
        // shared row, right above the button, whatever the list lengths.
        <p
          className={`mt-6 flex gap-2 text-sm leading-snug italic lg:self-end ${
            featured ? "text-ink/65" : "text-cream/60"
          }`}
        >
          <PinIcon className="mt-0.5 size-3.5 shrink-0 not-italic" />
          {note}
        </p>
      )}

      <a
        href={cta.href}
        {...(cta.newTabLabel && { target: "_blank", rel: "noopener noreferrer" })}
        className={`flex h-12 items-center justify-center rounded-full text-[15px] font-semibold transition-colors ${
          note ? "mt-4" : "mt-6"
        } ${
          featured
            ? "bg-ink text-cream hover:bg-ink/85 focus-visible:outline-ink"
            : "bg-cream text-ink hover:bg-white"
        }`}
      >
        {cta.label}
        {cta.newTabLabel && <span className="sr-only"> ({cta.newTabLabel})</span>}
      </a>
    </li>
  );
}
