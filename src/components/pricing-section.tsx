import { packages, posterPackages } from "@/content/pricing";
import type { Dictionary } from "@/i18n/get-dictionary";
import { InfoIcon } from "./icons";
import { PriceCard } from "./price-card";
import { SectionHeading } from "./section-heading";
import { SparkleIcon } from "./sparkle-icon";

const formatTugrik = (n: number) => n.toLocaleString("en-US");

/** Highlighted one-line callout (launch promo, "why it matters"). */
function Callout({ label, text }: { label: string; text: string }) {
  return (
    <p className="flex gap-3 rounded-2xl border border-cream/15 bg-cream/[0.06] px-5 py-4 text-sm leading-relaxed text-cream/80">
      <SparkleIcon className="mt-0.5 size-4 shrink-0 text-cream" />
      <span>
        <strong className="font-semibold text-cream">{label}:</strong> {text}
      </span>
    </p>
  );
}

function Footnote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-6 flex gap-3 text-sm leading-relaxed text-cream/60">
      <InfoIcon className="mt-0.5 size-4 shrink-0 text-cream/45" />
      {children}
    </p>
  );
}

/** Website packages: the pricing page's main section (its heading is the h1). */
export function PricingSection({ dict }: { dict: Dictionary }) {
  const text = dict.pricing;

  return (
    <section
      aria-labelledby="pricing-title"
      className="mx-auto w-full max-w-[1332px] px-4 pt-10 sm:px-8 sm:pt-16 lg:pt-24"
    >
      <SectionHeading
        as="h1"
        id="pricing-title"
        eyebrow={text.eyebrow}
        title={text.title}
        intro={text.intro}
      />

      <div className="mt-10 md:mt-14">
        <Callout label={text.promo.label} text={text.promo.text} />
      </div>

      <ul className="mt-6 grid gap-5 lg:grid-cols-3">
        {packages.map((pkg, index) => {
          const item = text.packages[pkg.id];
          return (
            <PriceCard
              key={pkg.id}
              headingLevel="h2"
              number={index + 1}
              name={item.name}
              tagline={item.tagline}
              description={item.for}
              price={{ parts: [formatTugrik(pkg.price[0]), `${formatTugrik(pkg.price[1])}₮`] }}
              priceNote={text.labels.oneTime}
              meta={{ icon: "clock", text: item.delivery }}
              features={item.features}
              footer={{ label: text.labels.afterLaunch, text: item.care }}
              cta={{ href: "#contact", label: text.labels.cta }}
              badge={pkg.featured ? text.labels.mostPopular : undefined}
            />
          );
        })}
      </ul>

      <Footnote>{text.note}</Footnote>
    </section>
  );
}

/** Poster packages, shown under the website packages. */
export function PosterPricingSection({ dict }: { dict: Dictionary }) {
  const text = dict.pricing.posters;

  return (
    <section
      id="posters-pricing"
      aria-labelledby="posters-pricing-title"
      className="mx-auto w-full max-w-[1332px] scroll-mt-6 px-4 pt-24 sm:px-8 sm:pt-32"
    >
      <SectionHeading
        id="posters-pricing-title"
        eyebrow={text.eyebrow}
        title={text.title}
        intro={text.intro}
      />

      <div className="mt-10 md:mt-14">
        <Callout label={text.why.label} text={text.why.text} />
      </div>

      <ul className="mt-6 grid gap-5 lg:grid-cols-3">
        {posterPackages.map((pkg, index) => {
          const item = text.packages[pkg.id];
          return (
            <PriceCard
              key={pkg.id}
              number={index + 1}
              name={item.name}
              tagline={item.tagline}
              price={{
                parts: [`${formatTugrik(pkg.price)}₮`],
                unit: pkg.unit === "poster" ? text.labels.perPosterUnit : text.labels.perMonthUnit,
              }}
              priceNote={
                pkg.perPoster
                  ? text.labels.perPoster.replace("{price}", formatTugrik(pkg.perPoster))
                  : undefined
              }
              meta={{ icon: "stack", text: item.quantity }}
              features={item.features}
              cta={{ href: "#contact", label: dict.pricing.labels.cta }}
              badge={pkg.featured ? text.labels.bestSeller : undefined}
            />
          );
        })}
      </ul>

      <Footnote>{text.note}</Footnote>
    </section>
  );
}
