// Language-independent profile data. Text that changes per language lives in
// src/i18n/dictionaries/*.json.

/** The live site's address (used for full URLs in link previews). */
export const siteUrl = "https://daria.flowagency.mn";

export const stats = {
  projects: "15+",
  years: "4",
};

export const phone = {
  display: "+976 86238974",
  href: "tel:+97686238974",
};

/**
 * Facebook Messenger chat with the Flow Agency page, with `message` already
 * typed in the chat box (used by the pricing "Get started" buttons).
 */
export function messengerLink(message: string) {
  return `https://m.me/flowagency.mn?text=${encodeURIComponent(message)}`;
}

export const socials = [
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/darie.in.frame/",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/erdenedari-chuluunbaatar-a22119251/",
  },
] as const;
