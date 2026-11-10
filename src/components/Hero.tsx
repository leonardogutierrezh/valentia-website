import { Link } from "react-router-dom";
import { LayoutDashboard, Wrench, ArrowRight, Plug } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import imgDashboard from "@/assets/img_dashboard.png";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const { t } = useI18n();
  const fade = isVisible ? "opacity-0 animate-fade-up" : "opacity-0";
  const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

  const options = [
    {
      icon: LayoutDashboard,
      tag: t("hero.opt1.tag"),
      title: t("hero.opt1.title"),
      desc: t("hero.opt1.desc"),
      cta: t("hero.opt1.cta"),
      to: "/#contact",
      primary: true,
    },
    {
      icon: Wrench,
      tag: t("hero.opt2.tag"),
      title: t("hero.opt2.title"),
      desc: t("hero.opt2.desc"),
      cta: t("hero.opt2.cta"),
      to: "/consulting",
      primary: false,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-vlc-navy">
      <div ref={ref} className="container mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className={`mb-4 text-sm font-semibold uppercase tracking-widest text-vlc-light-teal ${fade}`} style={delay(0)}>
            {t("hero.badge")}
          </p>
          <h1
            className={`font-display text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl ${fade}`} style={delay(60)}
          >
            {t("hero.h1a")} <span className="text-vlc-light-teal">{t("hero.h1b")}</span>
          </h1>
          <p className={`mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75 ${fade}`} style={delay(120)}>
            {t("hero.sub")}
          </p>
        </div>

        <div className={`mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2 ${fade}`} style={delay(200)}>
          {options.map((o) => (
            <div
              key={o.title}
              className="flex flex-col rounded-2xl border border-white/15 bg-white/[0.06] p-6 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-vlc-teal text-white">
                  <o.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-vlc-light-teal">{o.tag}</span>
              </div>
              <h2 className="mt-4 font-display text-xl font-bold text-white">{o.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{o.desc}</p>
              <Link
                to={o.to}
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors active:scale-[0.97] ${
                  o.primary
                    ? "bg-vlc-teal text-white hover:bg-vlc-teal/90"
                    : "border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10"
                }`}
              >
                {o.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <p className={`mx-auto mt-6 flex max-w-4xl items-center justify-center gap-2 text-center text-sm text-white/70 ${fade}`} style={delay(260)}>
          <Plug className="h-4 w-4 shrink-0 text-vlc-light-teal" />
          {t("hero.coexist")}
        </p>

        <div className={`mx-auto mt-16 max-w-5xl ${fade}`} style={delay(400)}>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-1 shadow-2xl shadow-black/30">
            <img src={imgDashboard} alt="Valentia platform dashboard" className="w-full rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
