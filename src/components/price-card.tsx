import { CheckIcon, ClockIcon, LayersIcon } from "./icons";

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
  /** Boxed note above the button, e.g. what happens after launch. */
  footer?: { label: string; text: string };
  cta: { href: string; label: string };
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
 * One pricing package. On desktop its parts sit on rows shared with the cards
 * beside it (CSS subgrid), so prices, lists and buttons line up across a row
 * of cards whatever the text lengths. The parent <ul> must be a 3-column grid.
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
  footer,
  cta,
  badge,
  headingLevel: Heading = "h3",
}: PriceCardProps) {
  const featured = Boolean(badge);
  const muted = featured ? "text-ink/60" : "text-cream/55";
  const rows = 5 + (description ? 1 : 0) + (footer ? 1 : 0);
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

      {description && (
        <p className={`mt-4 text-[15px] leading-relaxed ${featured ? "text-ink/75" : "text-cream/75"}`}>
          {description}
        </p>
      )}

      <div className="mt-6">
        {/* A range wraps at the dash, never inside a number, when the card is narrow. */}
        <p className="text-xl font-bold tracking-tight tabular-nums sm:text-2xl lg:text-xl xl:text-2xl">
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

      <p className={`mt-4 flex items-center gap-2 text-sm ${featured ? "text-ink/80" : "text-cream/80"}`}>
        <MetaIcon className="size-4 shrink-0" />
        {meta.text}
      </p>

      <ul
        className={`mt-6 space-y-3 border-t pt-6 text-[15px] ${
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

      {footer && (
        // On desktop this box stretches to the tallest card's box.
        <div
          className={`mt-6 rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            featured ? "bg-ink/[0.06]" : "bg-cream/[0.04]"
          }`}
        >
          <p className={`font-mono text-[11px] uppercase tracking-[0.15em] ${muted}`}>
            {footer.label}
          </p>
          <p className={`mt-1 ${featured ? "text-ink/85" : "text-cream/80"}`}>{footer.text}</p>
        </div>
      )}

      <a
        href={cta.href}
        className={`flex h-12 items-center justify-center rounded-full text-[15px] font-semibold transition-colors ${
          footer ? "mt-4" : "mt-6"
        } ${
          featured
            ? "bg-ink text-cream hover:bg-ink/85 focus-visible:outline-ink"
            : "bg-cream text-ink hover:bg-white"
        }`}
      >
        {cta.label}
      </a>
    </li>
  );
}
