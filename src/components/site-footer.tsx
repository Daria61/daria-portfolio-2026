import { socials } from "@/content/profile";
import type { Dictionary } from "@/i18n/get-dictionary";
import { InstagramIcon, LinkedInIcon } from "./icons";
import { SparkleIcon } from "./sparkle-icon";

const socialIcons = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
};

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer className="bg-cream text-ink">
      <div className="flex flex-col gap-6 px-4 py-8 sm:px-8 md:flex-row md:items-center md:justify-between md:py-10">
        <p className="flex items-center gap-3">
          <SparkleIcon className="size-9 shrink-0" />
          <span className="text-lg font-extrabold uppercase leading-[1.05] tracking-tight sm:text-xl">
            {dict.footer.signoff.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
          <p
            id="footer-social"
            className="text-base font-bold uppercase tracking-tight sm:text-lg"
          >
            {dict.footer.follow}
          </p>
          <ul aria-labelledby="footer-social" className="-ml-2.5 flex items-center gap-2 sm:ml-0">
            {socials.map((social) => {
              const Icon = socialIcons[social.id];
              return (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className="flex size-11 items-center justify-center rounded-full transition-colors hover:bg-ink/10 focus-visible:outline-ink focus-visible:outline-offset-0"
                  >
                    <Icon className="size-[22px]" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
