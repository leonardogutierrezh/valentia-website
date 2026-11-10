import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import imgMarketing from "@/assets/img_marketing.png";
import imgReservations from "@/assets/img_reservations.png";
import imgFinance from "@/assets/img_finance.png";
import imgProperties from "@/assets/img_properties.png";

const screenshots = [
  { label: "Reservations", image: imgReservations },
  { label: "Finance Dashboard", image: imgFinance },
  { label: "Marketing Analytics", image: imgMarketing },
  { label: "Properties Map", image: imgProperties },
];

const AUTOPLAY_MS = 4000;

export function Gallery() {
  const { ref, isVisible } = useScrollReveal();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [api, paused, current]);

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

        <div
          className={`relative mx-auto mt-12 max-w-5xl opacity-0 ${isVisible ? "animate-fade-up [animation-delay:120ms]" : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Carousel setApi={setApi} opts={{ loop: true }}>
            <CarouselContent>
              {screenshots.map((item) => (
                <CarouselItem key={item.label}>
                  <figure className="rounded-2xl border border-border bg-card p-1 shadow-md">
                    <img src={item.image} alt={item.label} className="w-full rounded-xl" loading="lazy" />
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 hidden sm:flex md:-left-12" />
            <CarouselNext className="right-2 hidden sm:flex md:-right-12" />
          </Carousel>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2" role="tablist">
            {screenshots.map((item, i) => (
              <button
                key={item.label}
                role="tab"
                aria-selected={current === i}
                onClick={() => api?.scrollTo(i)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  current === i ? "bg-vlc-navy text-white" : "bg-background text-vlc-navy/70 hover:text-vlc-navy"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
