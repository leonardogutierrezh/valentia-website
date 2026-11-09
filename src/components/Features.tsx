import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { CalendarCheck, BarChart3, TrendingUp, MapPin, BookOpen, Shield } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Features() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useI18n();

  const features = [
    { icon: CalendarCheck, title: t("features.card.reservations"), desc: t("features.card.reservations.desc") },
    { icon: BarChart3,     title: t("features.card.finances"),     desc: t("features.card.finances.desc") },
    { icon: TrendingUp,    title: t("features.card.marketing"),    desc: t("features.card.marketing.desc") },
    { icon: MapPin,        title: t("features.card.properties"),   desc: t("features.card.properties.desc") },
    { icon: BookOpen,      title: t("features.card.support"),      desc: t("features.card.support.desc") },
    { icon: Shield,        title: t("features.card.multi"),        desc: t("features.card.multi.desc") },
  ];

  return (
    <section id="features" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-3xl font-bold tracking-tight text-vlc-navy sm:text-4xl opacity-0 ${
              isVisible ? "animate-fade-up" : ""
            }`}
          >
            {t("features.h2.alt")}
          </h2>
          <p
            className={`mt-4 text-muted-foreground opacity-0 ${
              isVisible ? "animate-fade-up [animation-delay:80ms]" : ""
            }`}
          >
            {t("features.p.alt")}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-vlc-teal/8 hover:-translate-y-1 opacity-0 ${
                isVisible ? "animate-fade-up" : ""
              }`}
              style={{ animationDelay: isVisible ? `${160 + i * 80}ms` : undefined }}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-vlc-teal/10 text-vlc-teal transition-colors duration-300 group-hover:bg-vlc-teal group-hover:text-white">
                <f.icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h3 className="font-display text-lg font-semibold text-vlc-navy">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
