import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { CalendarRange, Filter, Sparkles, Download } from "lucide-react";
import imgStats from "@/assets/img_stats.png";
import { useI18n } from "@/lib/i18n";

export function Stats() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useI18n();

  const bullets = [
    { icon: CalendarRange, text: t("stats.b1") },
    { icon: Filter, text: t("stats.b2") },
    { icon: Sparkles, text: t("stats.b3") },
    { icon: Download, text: t("stats.b4") },
  ];

  return (
    <section className="bg-muted/40 py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div>
            <h2
              className={`text-3xl font-bold tracking-tight text-vlc-navy sm:text-4xl opacity-0 ${
                isVisible ? "animate-fade-up" : ""
              }`}
            >
              {t("stats.h2")}
            </h2>
            <p
              className={`mt-4 text-muted-foreground opacity-0 ${
                isVisible ? "animate-fade-up [animation-delay:80ms]" : ""
              }`}
            >
              {t("stats.p")}
            </p>
            <ul className="mt-8 space-y-4">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 opacity-0 ${
                    isVisible ? "animate-fade-up" : ""
                  }`}
                  style={{ animationDelay: isVisible ? `${160 + i * 80}ms` : undefined }}
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-vlc-teal/10 text-vlc-teal">
                    <b.icon className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <span className="text-sm leading-relaxed text-foreground/80">{b.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right placeholder */}
          <div
            className={`opacity-0 ${isVisible ? "animate-fade-up [animation-delay:300ms]" : ""}`}
          >
            <div className="rounded-2xl border border-border bg-card p-1 shadow-xl shadow-vlc-navy/5">
              <img src={imgStats} alt="Stats & charts overview" className="w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
