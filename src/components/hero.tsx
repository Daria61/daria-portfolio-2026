import type { Dictionary } from "@/i18n/get-dictionary";
import { BioCard } from "./home/bio-card";
import { ExperienceCard } from "./home/experience-card";
import { PortraitCard } from "./home/portrait-card";
import { ProfileCard } from "./home/profile-card";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="about"
      aria-labelledby="hero-name"
      className="grid scroll-mt-6 gap-5 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-8 xl:grid-cols-[510px_minmax(0,1fr)]"
    >
      <PortraitCard dict={dict} />

      {/* @container: the cards below adapt to this column's width, not the screen's. */}
      <div className="@container grid content-start gap-5">
        <ProfileCard dict={dict} />
        <BioCard dict={dict} />
        <ExperienceCard dict={dict} />
      </div>
    </section>
  );
}
