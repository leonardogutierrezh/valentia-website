import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Check, Database, Layers, Users, ClipboardCheck, Megaphone, LineChart, ArrowUpDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

function Connector({ label }: { label?: string }) {
  return (
    <div className="relative flex h-12 items-center justify-center">
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-vlc-teal/40" />
      <span className="relative flex items-center gap-1.5 rounded-full border border-vlc-teal/30 bg-background px-3 py-1 text-xs font-medium text-vlc-teal">
        <ArrowUpDown className="h-3.5 w-3.5" />
        {label}
      </span>
    </div>
  );
}

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

        <div className={`mx-auto w-full max-w-sm ${reveal(200)}`}>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-vlc-navy">
              <Database className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <span className="font-display font-semibold text-vlc-navy">{t("why.stack.pms")}</span>
          </div>

          <Connector label={t("why.stack.sync")} />

          <div className="rounded-2xl bg-vlc-navy p-5 text-white shadow-lg shadow-vlc-navy/20">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-vlc-teal">
                <Layers className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <p className="font-display text-lg font-bold">{t("why.stack.layer")}</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-medium">
              {[
                { icon: ClipboardCheck, label: t("why.stack.ops") },
                { icon: Megaphone, label: t("why.stack.marketing") },
                { icon: LineChart, label: t("why.stack.finance") },
              ].map((m) => (
                <span key={m.label} className="flex flex-col items-center gap-1.5 rounded-lg bg-white/10 py-3">
                  <m.icon className="h-4 w-4 text-vlc-light-teal" strokeWidth={2} />
                  {m.label}
                </span>
              ))}
            </div>
          </div>

          <Connector />

          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-vlc-navy">
              <Users className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <span className="font-display font-semibold text-vlc-navy">{t("why.stack.team")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
