import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import valentiaLogo from "@/assets/valentia-logo.png";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t("nav.features"), href: "/#features" },
    { label: t("nav.consulting"), href: "/#consulting" },
    { label: t("nav.pricing"), href: "/pricing" },
    { label: t("nav.guide"), href: "/guide" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.contact"), href: "/#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-[0_1px_3px_0_rgba(0,0,0,0.08)]"
          : "bg-white/40 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={valentiaLogo} alt="Valentia" className="h-8 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="font-body text-sm font-medium text-foreground/70 transition-colors duration-200 hover:text-vlc-teal"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Language toggle */}
          <div className="flex overflow-hidden rounded-lg border border-border text-xs font-semibold">
            {(["en", "es"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === l
                    ? "bg-vlc-navy text-white"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a
            href="https://app.valentiasoftware.com/"
            className="rounded-lg border border-vlc-navy px-4 py-2 text-sm font-medium text-vlc-navy transition-all duration-200 hover:bg-vlc-navy hover:text-white active:scale-[0.97]"
          >
            {t("nav.login")}
          </a>
          <Link
            to="/#contact"
            className="rounded-lg bg-gradient-vlc px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:shadow-lg hover:shadow-vlc-teal/20 active:scale-[0.97]"
          >
            {t("nav.cta")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-vlc-navy transition-transform duration-200 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-6 bg-vlc-navy transition-opacity duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-vlc-navy transition-transform duration-200 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-6 py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-foreground/70"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <div className="flex overflow-hidden rounded-lg border border-border text-xs font-semibold">
                {(["en", "es"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-2 transition-colors ${
                      lang === l ? "bg-vlc-navy text-white" : "text-foreground/60"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <a href="https://app.valentiasoftware.com/" className="rounded-lg border border-vlc-navy px-4 py-2 text-sm font-medium text-vlc-navy">
                {t("nav.login")}
              </a>
              <Link to="/#contact" onClick={() => setMobileOpen(false)} className="rounded-lg bg-gradient-vlc px-4 py-2 text-sm font-medium text-white">
                {t("nav.cta")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
