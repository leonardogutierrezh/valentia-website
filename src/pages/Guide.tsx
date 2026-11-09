import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const sections = [
  {
    id: "es",
    flag: "🇪🇸",
    lang: "Español",
    title: "Cómo conectar Hostify con Valentia",
    intro:
      "Esta guía te explica cómo conectar tu cuenta de Hostify con Valentia Software para empezar a beneficiarte de todos nuestros informes y análisis automáticos.",
    steps: [
      {
        heading: "Localiza tu API Key en Hostify",
        body: (
          <>
            Accede a tu cuenta de Hostify y navega a <strong>Settings</strong> (Ajustes). Al final
            de la página encontrarás el campo <strong>API Key</strong>, tal como se muestra en la
            imagen.
          </>
        ),
        img: { src: "/screenshots/hostify-settings-apikey.jpg", alt: "Página de ajustes de Hostify con una flecha señalando el campo API Key al final", wide: true },
      },
      {
        heading: "Envíanos tu API Key",
        body: "Copia tu API Key completa y envíanosla por el canal que hayas acordado con nuestro equipo (email, WhatsApp o ticket de soporte). Nuestro equipo configurará la conexión en menos de 24 horas.",
      },
      {
        heading: "Accede a la plataforma",
        body: "Una vez hayamos activado tu acceso, podrás iniciar sesión en Valentia Software con las credenciales que te proporcionaremos:",
        link: "https://app.valentiasoftware.com/",
        img: { src: "/screenshots/valentia-login.jpg", alt: "Pantalla de inicio de sesión de Valentia Software", wide: false },
      },
    ],
    help: { text: "¿Necesitas ayuda? Escríbenos a", email: "soporte@valentiasoftware.com" },
    alt: false,
  },
  {
    id: "fr",
    flag: "🇫🇷",
    lang: "Français",
    title: "Comment connecter Hostify à Valentia",
    intro:
      "Ce guide vous explique comment connecter votre compte Hostify à Valentia Software pour profiter de tous nos rapports et analyses automatiques.",
    steps: [
      {
        heading: "Trouvez votre clé API dans Hostify",
        body: (
          <>
            Connectez-vous à votre compte Hostify et accédez à <strong>Settings</strong>{" "}
            (Paramètres). En bas de la page, vous trouverez le champ <strong>API Key</strong>, comme
            indiqué dans l'image.
          </>
        ),
        img: { src: "/screenshots/hostify-settings-apikey.jpg", alt: "Page des paramètres Hostify avec une flèche indiquant le champ API Key en bas", wide: true },
      },
      {
        heading: "Envoyez-nous votre clé API",
        body: "Copiez votre clé API complète et envoyez-la nous via le canal convenu avec notre équipe (email, WhatsApp ou ticket de support). Notre équipe configurera la connexion en moins de 24 heures.",
      },
      {
        heading: "Accédez à la plateforme",
        body: "Une fois votre accès activé, vous pourrez vous connecter à Valentia Software avec les identifiants que nous vous fournirons :",
        link: "https://app.valentiasoftware.com/",
        img: { src: "/screenshots/valentia-login.jpg", alt: "Écran de connexion de Valentia Software", wide: false },
      },
    ],
    help: { text: "Besoin d'aide ? Contactez-nous à", email: "support@valentiasoftware.com" },
    alt: true,
  },
  {
    id: "en",
    flag: "🇬🇧",
    lang: "English",
    title: "How to connect Hostify with Valentia",
    intro:
      "This guide explains how to connect your Hostify account to Valentia Software so you can start benefiting from all our automatic reports and analytics.",
    steps: [
      {
        heading: "Find your API Key in Hostify",
        body: (
          <>
            Log in to your Hostify account and go to <strong>Settings</strong>. At the bottom of
            the page you will find the <strong>API Key</strong> field, as shown in the image.
          </>
        ),
        img: { src: "/screenshots/hostify-settings-apikey.jpg", alt: "Hostify settings page with an arrow pointing to the API Key field at the bottom", wide: true },
      },
      {
        heading: "Send us your API Key",
        body: "Copy your full API Key and send it to us via the channel agreed with our team (email, WhatsApp or support ticket). Our team will set up the connection within 24 hours.",
      },
      {
        heading: "Access the platform",
        body: "Once we have activated your access, you can log in to Valentia Software with the credentials we will provide:",
        link: "https://app.valentiasoftware.com/",
        img: { src: "/screenshots/valentia-login.jpg", alt: "Valentia Software login screen", wide: false },
      },
    ],
    help: { text: "Need help? Contact us at", email: "support@valentiasoftware.com" },
    alt: false,
  },
  {
    id: "de",
    flag: "🇩🇪",
    lang: "Deutsch",
    title: "Hostify mit Valentia verbinden",
    intro:
      "Diese Anleitung erklärt, wie Sie Ihr Hostify-Konto mit Valentia Software verbinden, um von all unseren automatischen Berichten und Analysen zu profitieren.",
    steps: [
      {
        heading: "API-Key in Hostify finden",
        body: (
          <>
            Melden Sie sich in Ihrem Hostify-Konto an und gehen Sie zu <strong>Settings</strong>{" "}
            (Einstellungen). Am Ende der Seite finden Sie das Feld <strong>API Key</strong>, wie im
            Bild gezeigt.
          </>
        ),
        img: { src: "/screenshots/hostify-settings-apikey.jpg", alt: "Hostify-Einstellungsseite mit einem Pfeil, der auf das API-Key-Feld am Ende zeigt", wide: true },
      },
      {
        heading: "API-Key an uns senden",
        body: "Kopieren Sie Ihren vollständigen API-Key und senden Sie ihn uns über den mit unserem Team vereinbarten Kanal (E-Mail, WhatsApp oder Support-Ticket). Unser Team richtet die Verbindung innerhalb von 24 Stunden ein.",
      },
      {
        heading: "Zugang zur Plattform",
        body: "Sobald wir Ihren Zugang aktiviert haben, können Sie sich mit den von uns bereitgestellten Zugangsdaten bei Valentia Software anmelden:",
        link: "https://app.valentiasoftware.com/",
        img: { src: "/screenshots/valentia-login.jpg", alt: "Anmeldebildschirm von Valentia Software", wide: false },
      },
    ],
    help: { text: "Benötigen Sie Hilfe? Kontaktieren Sie uns unter", email: "support@valentiasoftware.com" },
    alt: true,
  },
];

export default function Guide() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6 text-center">
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-vlc-teal">
              {t("guide.eyebrow")}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-vlc-navy sm:text-5xl md:text-6xl">
              {t("guide.h1a")}{" "}
              <span className="bg-gradient-vlc bg-clip-text text-transparent">{t("guide.h1b")}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              {t("guide.lead")}
            </p>
            <nav className="mt-8 flex flex-wrap justify-center gap-3" aria-label="Language sections">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-vlc-teal hover:text-vlc-teal"
                >
                  {s.flag} {s.lang}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Language sections */}
        {sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className={`py-16 ${s.alt ? "bg-muted/30" : ""}`}
          >
            <div className="container mx-auto max-w-3xl px-6">
              <header className="mb-10">
                <span className="text-2xl">{s.flag}</span>
                <span className="ml-2 text-sm font-semibold uppercase tracking-widest text-vlc-teal">
                  {s.lang}
                </span>
                <h2 className="mt-2 text-2xl font-bold text-vlc-navy">{s.title}</h2>
                <p className="mt-2 text-muted-foreground">{s.intro}</p>
              </header>

              <ol className="space-y-10">
                {s.steps.map((step, i) => (
                  <li key={i} className="flex gap-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-vlc text-sm font-bold text-white">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-vlc-navy">{step.heading}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
                      {step.link && (
                        <a
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-block text-sm font-medium text-vlc-teal hover:underline"
                        >
                          {step.link} →
                        </a>
                      )}
                      {step.img && (
                        <figure className={`mt-4 overflow-hidden rounded-xl border border-border ${step.img.wide ? "max-w-full" : "max-w-xs"}`}>
                          <img
                            src={step.img.src}
                            alt={step.img.alt}
                            loading="lazy"
                            className="w-full object-cover"
                          />
                        </figure>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              <p className="mt-10 text-sm text-muted-foreground">
                {s.help.text}{" "}
                <a href={`mailto:${s.help.email}`} className="font-medium text-vlc-teal hover:underline">
                  {s.help.email}
                </a>
              </p>
            </div>
          </section>
        ))}

        {/* CTA band */}
        <section className="bg-vlc-navy py-16">
          <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 sm:flex-row">
            <div>
              <h2 className="text-2xl font-bold text-white">{t("guide.band.h2")}</h2>
              <p className="mt-1 text-white/60">{t("guide.band.p")}</p>
            </div>
            <Link
              to="/#contact"
              className="shrink-0 rounded-xl bg-gradient-vlc px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-vlc-teal/30 transition-all duration-200 hover:shadow-xl active:scale-[0.97]"
            >
              {t("guide.band.cta")}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
