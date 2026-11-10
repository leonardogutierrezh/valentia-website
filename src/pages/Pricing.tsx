import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

export default function Pricing() {
  const { t } = useI18n();

  const tiers = [
    {
      key: "t1",
      label: t("pricing.t1.label"),
      name: t("pricing.t1.name"),
      desc: t("pricing.t1.desc"),
      featured: false,
      features: [t("pricing.t1.f1"), t("pricing.t1.f2"), t("pricing.t1.f3"), t("pricing.t1.f4")],
    },
    {
      key: "t2",
      label: t("pricing.t2.label"),
      name: t("pricing.t2.name"),
      desc: t("pricing.t2.desc"),
      featured: true,
      features: [t("pricing.t2.f1"), t("pricing.t2.f2"), t("pricing.t2.f3"), t("pricing.t2.f4")],
    },
    {
      key: "t3",
      label: t("pricing.t3.label"),
      name: t("pricing.t3.name"),
      desc: t("pricing.t3.desc"),
      featured: false,
      features: [t("pricing.t3.f1"), t("pricing.t3.f2"), t("pricing.t3.f3"), t("pricing.t3.f4")],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 text-center">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-vlc-teal">
              {t("pricing.eyebrow")}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-vlc-navy sm:text-5xl md:text-6xl">
              {t("pricing.h1a")} {t("pricing.h1b")}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              {t("pricing.lead")}
            </p>
          </div>
        </section>

        {/* Pricing cards */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {tiers.map((tier) => (
                <div
                  key={tier.key}
                  className={`relative flex flex-col rounded-2xl border p-8 ${
                    tier.featured
                      ? "border-vlc-teal bg-vlc-navy text-white shadow-xl shadow-vlc-teal/20"
                      : "border-border bg-background"
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-vlc-teal hover:bg-vlc-teal/90 px-4 py-1 text-xs font-semibold text-white shadow">
                        {t("pricing.popular")}
                      </span>
                    </div>
                  )}
                  <span
                    className={`text-xs font-semibold uppercase tracking-widest ${
                      tier.featured ? "text-vlc-light-teal" : "text-vlc-teal"
                    }`}
                  >
                    {tier.label}
                  </span>
                  <h2
                    className={`mt-2 text-2xl font-bold ${
                      tier.featured ? "text-white" : "text-vlc-navy"
                    }`}
                  >
                    {tier.name}
                  </h2>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      tier.featured ? "text-white/60" : "text-muted-foreground"
                    }`}
                  >
                    {t("pricing.custom")}
                  </p>
                  <p
                    className={`mt-3 text-sm ${
                      tier.featured ? "text-white/70" : "text-muted-foreground"
                    }`}
                  >
                    {tier.desc}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            tier.featured ? "text-vlc-light-teal" : "text-vlc-teal"
                          }`}
                        />
                        <span className={tier.featured ? "text-white/80" : "text-foreground"}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/#contact"
                    className={`mt-8 block rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
                      tier.featured
                        ? "bg-vlc-teal hover:bg-vlc-teal/90 text-white shadow-lg shadow-vlc-teal/30 hover:shadow-xl"
                        : "border border-vlc-navy text-vlc-navy hover:bg-vlc-navy hover:text-white"
                    }`}
                  >
                    {t("pricing.cta")}
                  </Link>
                </div>
              ))}
            </div>

            {/* Note */}
            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-muted/40 p-6 text-sm text-muted-foreground">
              <strong className="font-semibold text-foreground">{t("pricing.note.title")} </strong>
              {t("pricing.note.body")}
            </div>
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-vlc-navy py-16">
          <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 sm:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-white">{t("pricing.band.h2")}</h2>
              <p className="mt-1 text-white/60">{t("pricing.band.p")}</p>
            </div>
            <Link
              to="/#contact"
              className="shrink-0 rounded-xl bg-vlc-teal hover:bg-vlc-teal/90 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-vlc-teal/30 transition-all duration-200 hover:shadow-xl active:scale-[0.97]"
            >
              {t("pricing.band.cta")}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
