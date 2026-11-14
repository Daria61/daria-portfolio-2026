import { packages, posterPackages, trial } from "@/content/pricing";
import { messengerLink } from "@/content/profile";
import type { Dictionary } from "@/i18n/get-dictionary";
import { CheckIcon, InfoIcon, XIcon } from "./icons";
import { PriceCard } from "./price-card";
import { SectionHeading } from "./section-heading";
import { SparkleIcon } from "./sparkle-icon";

const formatTugrik = (n: number) => n.toLocaleString("en-US");

/** "Get started": opens Messenger with "…I'd like to order the <package> package." typed in. */
function orderButton(dict: Dictionary, message: string, packageName: string) {
  return {
    href: messengerLink(message.replace("{package}", packageName)),
    label: dict.pricing.labels.cta,
    newTabLabel: dict.work.newTab,
  };
}

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

/**
 * "Try & Decide": a landing page for a small upfront price that the client
 * tests for 30 days, then keeps (paying the rest of a package) or lets go.
 * Wide block above the website packages: offer and button on the left, the
 * three steps on the right (stacked on phones).
 */
function TrialOffer({ dict }: { dict: Dictionary }) {
  const text = dict.pricing.trial;
  const price = formatTugrik(trial.price);
  const withPrice = (s: string) => s.replace("{price}", price);
  const lastStep = text.steps.length - 1;

  const outcomes = [
    { ...text.keep, Icon: CheckIcon },
    { ...text.stop, Icon: XIcon },
  ];

  return (
    <article
      aria-labelledby="trial-title"
      className="grid gap-8 rounded-[28px] border border-cream/20 bg-cream/[0.05] p-6 sm:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-0 lg:p-10"
    >
      <div className="flex flex-col lg:pr-10">
        <span className="self-start rounded-full bg-cream px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink">
          {text.badge}
        </span>
        <h2
          id="trial-title"
          className="mt-5 text-[28px] leading-[1.05] font-black uppercase tracking-[-0.03em] text-balance sm:text-4xl"
        >
          {text.name}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-cream/75">{withPrice(text.tagline)}</p>

        <p className="mt-6 text-[30px] font-extrabold tracking-tight tabular-nums sm:text-[34px]">
          {price}₮
          <span className="ml-2 text-base font-medium text-cream/55">{text.unit}</span>
        </p>

        {/* Desktop: pushes the button down to line up with the last step. */}
        <div aria-hidden="true" className="hidden lg:block lg:flex-1" />
        <a
          href={messengerLink(text.message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex h-12 items-center justify-center rounded-full bg-cream text-[15px] font-semibold text-ink transition-colors hover:bg-white"
        >
          {text.cta}
          <span className="sr-only"> ({dict.work.newTab})</span>
        </a>
        <p className="mt-3 flex gap-2 text-xs leading-relaxed text-cream/55">
          <InfoIcon className="mt-px size-3.5 shrink-0" />
          {text.note}
        </p>
      </div>

      <ol className="grid content-start gap-6 border-t border-cream/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
        {text.steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-cream/25 font-mono text-xs font-bold"
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1 pt-1">
              <h3 className="text-base font-semibold">{step.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-cream/70">{step.text}</p>

              {/* Last step: the two ways it can end, side by side from sm. */}
              {index === lastStep && (
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {outcomes.map(({ label, text: outcome, Icon }) => (
                    <li key={label} className="rounded-2xl bg-cream/[0.06] px-4 py-3">
                      <p className="flex items-center gap-2 text-sm font-semibold">
                        <Icon className="size-4 shrink-0" />
                        {label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-cream/70">
                        {withPrice(outcome)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </article>
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
        <TrialOffer dict={dict} />
      </div>

      <div className="mt-10 md:mt-12">
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
              note={item.care}
              cta={orderButton(dict, text.labels.message, item.name)}
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

      <ul className="mt-10 grid gap-5 md:mt-14 lg:grid-cols-3">
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
              cta={orderButton(dict, text.labels.message, item.name)}
              badge={pkg.featured ? text.labels.bestSeller : undefined}
            />
          );
        })}
      </ul>

      <Footnote>{text.note}</Footnote>
    </section>
  );
}
