import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { PostersSection } from "@/components/posters-section";
import { WorkSection } from "@/components/work-section";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

export default async function HomePage() {
  const lang = await getLocale();
  const dict = await getDictionary();

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1332px] px-4 pt-8 sm:px-8 sm:pt-16 lg:pt-[136px]">
        <Hero dict={dict} />
      </div>
      <WorkSection dict={dict} />
      <PostersSection dict={dict} />
      <ContactSection lang={lang} dict={dict} />
    </main>
  );
}
