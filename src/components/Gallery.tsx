import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Monitor } from "lucide-react";
import imgMarketing from "@/assets/img_marketing.png";
import imgReservations from "@/assets/img_reservations.png";
import imgFinance from "@/assets/img_finance.png";
import imgProperties from "@/assets/img_properties.png";

const screenshots: { label: string; image?: string }[] = [
  { label: "Reservations View", image: imgReservations },
  { label: "Finance Dashboard", image: imgFinance },
  { label: "Marketing Analytics", image: imgMarketing },
  { label: "Properties Map", image: imgProperties },
];

export function Gallery() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="bg-muted/40 py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <h2
          className={`mx-auto max-w-lg text-center text-3xl font-bold tracking-tight text-vlc-navy sm:text-4xl opacity-0 ${
            isVisible ? "animate-fade-up" : ""
          }`}
        >
          Built for real operations
        </h2>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2">
          {screenshots.map((item, i) => (
            <div
              key={item.label}
              className={`opacity-0 ${isVisible ? "animate-fade-up" : ""}`}
              style={{ animationDelay: isVisible ? `${120 + i * 100}ms` : undefined }}
            >
              <div className="rounded-2xl border border-border bg-card p-1 shadow-md transition-shadow duration-300 hover:shadow-xl">
                {item.image ? (
                  <img src={item.image} alt={item.label} className="w-full rounded-xl" />
                ) : (
                  <div className="flex min-h-[220px] items-center justify-center rounded-xl bg-gradient-to-br from-vlc-navy/[0.04] to-vlc-teal/[0.07] md:min-h-[260px]">
                    <div className="text-center">
                      <Monitor className="mx-auto mb-2 h-8 w-8 text-vlc-teal/40" strokeWidth={1.5} />
                      <p className="font-display text-xs font-semibold text-vlc-navy/40 uppercase tracking-wider">
                        Insert Screenshot
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{item.label}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
