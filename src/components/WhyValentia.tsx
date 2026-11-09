import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function WhyValentia() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useI18n();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const reveal = (_d = 0) => `opacity-0 ${isVisible ? "animate-fade-up" : ""}`;

  const points = [t("why.l1"), t("why.l2"), t("why.l3"), t("why.l4")];

  return (
    <section id="why" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className={`text-sm font-semibold uppercase tracking-wider text-vlc-teal ${reveal()}`}>{t("why.eyebrow")}</p>
          <h2 className={`mt-2 text-3xl font-bold tracking-tight text-vlc-navy sm:text-4xl ${reveal(60)}`}>
            {t("why.h2")}
          </h2>
          <p className={`mt-4 text-muted-foreground ${reveal(120)}`}>
            {t("why.p")}
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p, i) => (
              <li key={i} className={`flex items-start gap-3 ${reveal()}`} style={{ animationDelay: isVisible ? `${180 + i * 60}ms` : undefined }}>
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vlc-teal/15 text-vlc-teal">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-sm text-foreground/80">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={`mx-auto w-full max-w-sm space-y-3 text-center ${reveal(200)}`}>
          <div className="rounded-xl border border-border bg-card px-6 py-4 font-display font-semibold text-vlc-navy">{t("why.stack.pms")}</div>
          <div className="text-vlc-teal">↕</div>
          <div className="rounded-2xl bg-gradient-vlc p-5 text-white shadow-lg shadow-vlc-teal/20">
            <p className="font-display text-lg font-bold">{t("why.stack.layer")}</p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-medium">
              {[t("why.stack.ops"), t("why.stack.marketing"), t("why.stack.finance")].map((m) => (
                <span key={m} className="rounded-lg bg-white/15 py-2">{m}</span>
              ))}
            </div>
          </div>
          <div className="text-vlc-teal">↕</div>
          <div className="rounded-xl border border-border bg-card px-6 py-4 font-display font-semibold text-vlc-navy">{t("why.stack.team")}</div>
        </div>
      </div>
    </section>
  );
}
