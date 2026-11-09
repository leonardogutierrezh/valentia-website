import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import heroBg from "@/assets/hero-city.jpg";
import imgDashboard from "@/assets/img_dashboard.png";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 -z-10">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-vlc-navy/80 via-vlc-navy/70 to-vlc-navy/90" />
      </div>

      <div ref={ref} className="container mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className={`mb-4 text-sm font-semibold uppercase tracking-widest text-vlc-light-teal opacity-0 ${isVisible ? "animate-fade-up" : ""}`}>
            {t("hero.badge")}
          </p>
          <h1
            className={`font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl md:text-4xl lg:text-5xl opacity-0 ${
              isVisible ? "animate-fade-up [animation-delay:60ms]" : ""
            }`}
          >
            {t("hero.h1a")}
            <br />
            <span className="bg-gradient-to-r from-vlc-light-teal to-vlc-teal bg-clip-text text-transparent">
              {t("hero.h1b")}
            </span>
          </h1>

          <p
            className={`mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl opacity-0 ${
              isVisible ? "animate-fade-up [animation-delay:120ms]" : ""
            }`}
          >
            {t("hero.sub")}
          </p>

          <div
            className={`mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row opacity-0 ${
              isVisible ? "animate-fade-up [animation-delay:240ms]" : ""
            }`}
          >
            <a
              href="#contact"
              className="rounded-xl bg-vlc-teal px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-vlc-teal/30 transition-all duration-200 hover:bg-vlc-light-teal hover:shadow-xl active:scale-[0.97]"
            >
              {t("hero.cta.primary")}
            </a>
            <a
              href="https://app.valentiasoftware.com/"
              className="rounded-xl border-2 border-white/25 px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10 active:scale-[0.97]"
            >
              {t("nav.login")}
            </a>
          </div>
        </div>

        {/* Dashboard placeholder */}
        <div
          className={`mx-auto mt-20 max-w-5xl opacity-0 ${isVisible ? "animate-fade-up [animation-delay:400ms]" : ""}`}
        >
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-1 shadow-2xl shadow-black/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-vlc-orange/60" />
              <div className="h-3 w-3 rounded-full bg-vlc-light-teal/60" />
              <div className="h-3 w-3 rounded-full bg-vlc-teal/40" />
            </div>
            <img src={imgDashboard} alt="Valentia Software dashboard overview" className="w-full rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
