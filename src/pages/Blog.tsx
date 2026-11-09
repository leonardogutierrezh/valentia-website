import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

type Lang = "es" | "en";

interface Post {
  slug: string;
  languages: Lang[];
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
  date: string;
  readingMinutes: number;
}

const posts: Post[] = [
  {
    slug: "caos-invisible-property-manager",
    languages: ["es", "en"],
    title: {
      es: "El caos invisible: PMS, Excel, WhatsApp y decisiones sueltas",
      en: "The invisible chaos: PMS, Excel, WhatsApp, and scattered decisions",
    },
    excerpt: {
      es: "El caos invisible aparece cuando un property manager opera con PMS, Excel, WhatsApp y decisiones repartidas. Así se convierte el desorden operativo en control real de negocio.",
      en: "Invisible chaos creeps in when a property manager runs the business across PMS, Excel, WhatsApp, and disconnected decisions. Here's how operational mess turns into real business control.",
    },
    date: "2026-05-17",
    readingMinutes: 9,
  },
  {
    slug: "property-manager-necesita-mas-que-pms",
    languages: ["es", "en"],
    title: {
      es: "Por qué un property manager necesita algo más que un PMS",
      en: "Why a property manager needs more than a PMS",
    },
    excerpt: {
      es: "Un PMS es esencial para gestionar reservas y operaciones, pero un property manager profesional necesita algo más: KPIs, reporting, rentabilidad, propietarios y control de negocio.",
      en: "A PMS is essential for managing reservations and operations, but a professional property manager needs more: KPIs, reporting, profitability, owners, and business control.",
    },
    date: "2026-05-10",
    readingMinutes: 8,
  },
];

function fmtDate(iso: string) {
  try {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function Blog() {
  const [filter, setFilter] = useState<"all" | Lang>("all");
  const { t } = useI18n();

  const visible = filter === "all" ? posts : posts.filter((p) => p.languages.includes(filter));

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 text-center">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-vlc-teal">
              {t("blog.eyebrow")}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-vlc-navy sm:text-5xl">
              {t("blog.h1")}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              {t("blog.lead")}
            </p>

            {/* Filter */}
            <div className="mt-8 flex justify-center gap-2" role="group" aria-label="Filter posts by language">
              {(["all", "en", "es"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    filter === f
                      ? "bg-vlc-navy text-white"
                      : "border border-border text-foreground hover:border-vlc-teal hover:text-vlc-teal"
                  }`}
                >
                  {f === "all" ? t("blog.filter.all") : f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Posts grid */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            {visible.length === 0 ? (
              <p className="text-center text-muted-foreground">{t("blog.empty")}</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((post) => {
                  const lang: Lang = post.languages[0];
                  return (
                    <article
                      key={post.slug}
                      className="flex flex-col rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-md"
                    >
                      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        {post.languages.map((l) => (
                          <span
                            key={l}
                            className="rounded bg-muted px-1.5 py-0.5 font-semibold uppercase"
                          >
                            {l}
                          </span>
                        ))}
                        <span>{fmtDate(post.date)}</span>
                        <span>·</span>
                        <span>{post.readingMinutes} {t("blog.min_read")}</span>
                      </div>
                      <h2 className="text-base font-semibold leading-snug text-vlc-navy">
                        {post.title[lang]}
                      </h2>
                      <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">
                        {post.excerpt[lang]}
                      </p>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="mt-4 text-sm font-medium text-vlc-teal hover:underline"
                      >
                        {t("blog.read")}
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-vlc-navy py-16">
          <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 sm:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-white">{t("blog.band.h2")}</h2>
              <p className="mt-1 text-white/60">{t("blog.band.p")}</p>
            </div>
            <Link
              to="/#contact"
              className="shrink-0 rounded-xl bg-gradient-vlc px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-vlc-teal/30 transition-all duration-200 hover:shadow-xl active:scale-[0.97]"
            >
              {t("blog.band.cta")}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
