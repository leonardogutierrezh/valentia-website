import valentiaLogo from "@/assets/valentia-logo.png";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="block text-sm text-white/50 transition-colors hover:text-white/80">
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className="block text-sm text-white/50 transition-colors hover:text-white/80">
      {children}
    </Link>
  );
}

export function Footer() {
  const { t } = useI18n();

  const productLinks = [
    { label: t("nav.features"), href: "/#features" },
    { label: t("nav.pricing"), href: "/pricing" },
  ];

  const companyLinks = [
    { label: t("nav.consulting"), href: "/#consulting" },
    { label: t("nav.guide"), href: "/guide" },
    { label: t("nav.blog"), href: "/blog" },
    { label: t("nav.contact"), href: "/#contact" },
    { label: t("nav.cta"), href: "/#contact" },
  ];

  return (
    <footer className="border-t border-white/10 bg-vlc-navy py-12">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <img src={valentiaLogo} alt="Valentia" className="h-7 w-auto brightness-0 invert" />
            <p className="mt-3 text-xs text-white/40">{t("footer.tag")}</p>
            <a
              href="https://www.linkedin.com/company/valent%C3%ADa-software/"
              target="_blank"
              rel="noreferrer"
              aria-label="Valentia on LinkedIn"
              className="mt-3 inline-block text-white/40 transition-colors hover:text-white/70"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-white/40">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-vlc-teal" aria-hidden="true" />
              {t("footer.partner")}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/30">{t("footer.product")}</h4>
            <div className="space-y-2">
              {productLinks.map((l) => (
                <NavLink key={l.href} href={l.href}>{l.label}</NavLink>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/30">{t("footer.company")}</h4>
            <div className="space-y-2">
              {companyLinks.map((l) => (
                <NavLink key={l.label} href={l.href}>{l.label}</NavLink>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/30">{t("footer.contact")}</h4>
            <div className="space-y-2">
              <NavLink href="mailto:hello@valentia.software">hello@valentia.software</NavLink>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs text-white/30">© 2026 {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
