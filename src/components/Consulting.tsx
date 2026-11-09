import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Code2, Bot, Plug, RefreshCcw } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const pains = [
  "“Our operation runs on spreadsheets.”",
  "“Our tools don't talk to each other.”",
  "“We want to use AI but don't know where to start.”",
  "“Our system can't grow with us.”",
];

const services = [
  { icon: Code2, title: "Custom dashboards, CRM & ERP", desc: "Your own dashboard, CRM, ERP, client portal or back-office — built around how you work, not the other way around." },
  { icon: Bot, title: "AI assistants & automation", desc: "AI that reads, writes and answers using your own data: reports, customer replies, document processing, and assistants connected to your systems." },
  { icon: Plug, title: "Integrations & data", desc: "Connect your PMS, CRM, shop, ERP and spreadsheets. Dashboards and reports that update themselves." },
  { icon: RefreshCcw, title: "Modernisation", desc: "Move off expensive or outdated platforms — old frameworks or no-code tools you've outgrown — without losing what works." },
];

const steps = [
  { title: "Discovery call", desc: "Free, 30 minutes. We learn the problem and how your business runs." },
  { title: "Diagnostic & proposal", desc: "1–2 weeks. A map of your process, what to build first, and a fixed quote." },
  { title: "Build in short cycles", desc: "Working software every 1–2 weeks. You review and steer as we go." },
  { title: "Run & improve", desc: "Hosting, support and new features on a simple monthly plan." },
];

const results = [
  { value: "300+", label: "properties managed" },
  { value: "200+", label: "hours saved every month" },
  { value: "15,000+", label: "reservations a year" },
  { value: "90%", label: "keyless check-ins" },
];

const models = [
  { tag: "Project", title: "Fixed scope, fixed price", desc: "A clear goal, a clear quote. Best for a new app, a migration or an integration." },
  { tag: "AI pilot", title: "2–4 weeks on one real process", desc: "A fixed-price AI proof of concept on your own data, so you see the value before you invest more." },
  { tag: "Monthly team", title: "Ongoing building and support", desc: "A set number of days each month to keep improving your software, with support included." },
];

const tech = ["Python", "Django", "JavaScript", "React", "Astro", "Swift / iOS", "PostgreSQL", "MySQL", "AWS", "Vercel", "Claude", "OpenAI", "MCP"];

const faqs = [
  { q: "Do you only work with vacation rental companies?", a: "No. Valentia grew out of vacation rentals, but our consulting is for any business that needs custom software, AI or integrations." },
  { q: "Who owns the code?", a: "You do. The code and the data are yours from day one." },
  { q: "Can you work with our existing team or system?", a: "Yes. We often extend what you already have instead of replacing it, and we can work alongside your own developers." },
  { q: "How much does a project cost?", a: "It depends on the scope. After the diagnostic you get a fixed quote, so there are no surprises." },
  { q: "Is our data safe with AI?", a: "We use business AI services that don't train on your data, and we give the AI access only to what it needs." },
  { q: "Where do you work?", a: "Remotely, in English and Spanish, with clients in Spain and Latin America." },
];

export function Consulting() {
  const { ref, isVisible } = useScrollReveal(0.05);
  const { t } = useI18n();
  const fade = isVisible ? "animate-fade-up" : "";

  return (
    <section id="consulting" className="bg-vlc-navy py-24 text-white md:py-32">
      <div ref={ref} className="container mx-auto max-w-6xl px-6">
        {/* Intro */}
        <div className={`mx-auto max-w-2xl text-center opacity-0 ${fade}`}>
          <p className="text-sm font-semibold uppercase tracking-wider text-vlc-light-teal">{t("consulting.eyebrow")} · Consulting</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t("consulting.h2")}</h2>
          <p className="mt-4 text-white/70">
            {t("consulting.p")}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {pains.map((p) => (
            <span key={p} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm italic text-white/80">{p}</span>
          ))}
        </div>

        {/* Services */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-vlc-teal/20 text-vlc-light-teal">
                <s.icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <h3 className="mt-24 text-center font-display text-2xl font-bold">Small steps, working software</h3>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.title}>
              <span className="font-display text-3xl font-bold text-vlc-orange">0{i + 1}</span>
              <h4 className="mt-2 font-display font-semibold">{s.title}</h4>
              <p className="mt-1 text-sm text-white/65">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Case study */}
        <div className="mt-24 rounded-3xl bg-white p-8 text-foreground md:p-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-vlc-teal">Selected work · Vacation rental management · Valencia</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-vlc-navy sm:text-3xl">VLC Host — built and proven in our own operation</h3>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-vlc-navy">The problem</h4>
              <p className="mt-2 text-sm text-muted-foreground">
                VLC Host's operation was spread across its PMS, spreadsheets and chat messages. Owner reports and month-end closing took days of manual work.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-vlc-navy">What we built</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>A management app for the whole team</li>
                <li>Live sync with the PMS — 50+ fields per reservation</li>
                <li>Smart-lock automation across 9+ lock types</li>
                <li>Owner reports that write themselves</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4">
            {results.map((r) => (
              <div key={r.label}>
                <p className="font-display text-3xl font-bold text-vlc-teal">{r.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{r.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech */}
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {tech.map((t) => (
            <span key={t} className="rounded-md bg-white/10 px-3 py-1 text-xs font-medium text-white/75">{t}</span>
          ))}
        </div>

        {/* Models */}
        <h3 className="mt-24 text-center font-display text-2xl font-bold">Pick the model that fits</h3>
        <p className="mt-2 text-center text-sm text-white/65">No public price list — every business is different. You get a fixed quote after the diagnostic.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {models.map((m) => (
            <div key={m.tag} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="rounded-full bg-vlc-orange/20 px-3 py-1 text-xs font-semibold text-vlc-orange">{m.tag}</span>
              <h4 className="mt-4 font-display text-lg font-semibold">{m.title}</h4>
              <p className="mt-2 text-sm text-white/65">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h3 className="mt-24 text-center font-display text-2xl font-bold">Common questions</h3>
        <Accordion type="single" collapsible className="mx-auto mt-8 max-w-3xl">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q} className="border-white/15">
              <AccordionTrigger className="text-left hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-white/70">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 text-center">
          <a href="#contact" className="inline-block rounded-xl bg-vlc-teal px-8 py-3.5 font-semibold text-white shadow-lg shadow-vlc-teal/30 transition-all hover:bg-vlc-light-teal active:scale-[0.97]">
            Book a 30-min call
          </a>
        </div>
      </div>
    </section>
  );
}
