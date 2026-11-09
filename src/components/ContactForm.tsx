import { useState, FormEvent } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useI18n } from "@/lib/i18n";

export function ContactForm() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useI18n();
  const [topic, setTopic] = useState<"platform" | "consulting">("platform");
  const [error, setError] = useState("");
  const [modules, setModules] = useState<string[]>([]);

  const isConsulting = topic === "consulting";

  const toggleModule = (mod: string) => {
    setModules((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string).trim();
    const company = (data.get("company") as string).trim();
    const email = (data.get("email") as string).trim();

    if (!name || !company || !email) {
      setError(t("contact.error.required"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t("contact.error.email"));
      return;
    }
    setError("");

    const phone = (data.get("phone") as string).trim();
    const portfolio = (data.get("portfolio") as string) ?? "";
    const pms = (data.get("pms") as string).trim();
    const message = (data.get("message") as string).trim();

    const lines = [
      `Topic: ${isConsulting ? "Consulting project" : "Valentia platform"}`,
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      ...(phone ? [`Phone: ${phone}`] : []),
    ];
    if (!isConsulting) {
      lines.push(
        `Portfolio: ${portfolio}`,
        `PMS: ${pms}`,
        `Modules: ${modules.join(", ") || "—"}`
      );
    }

    const body = [...lines, "", message].join("\n");
    const subject = isConsulting
      ? `Consulting inquiry from ${company}`
      : `New inquiry from ${company}`;

    window.location.href =
      "mailto:hello@valentia.software" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors duration-200 focus:border-vlc-teal focus:outline-none focus:ring-2 focus:ring-vlc-teal/20";

  return (
    <section id="contact" className="py-24 md:py-32">
      <div ref={ref} className="container mx-auto px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2
            className={`text-3xl font-bold tracking-tight text-vlc-navy sm:text-4xl opacity-0 ${
              isVisible ? "animate-fade-up" : ""
            }`}
          >
            {t("contact.h2")}
          </h2>
          <p
            className={`mt-3 text-muted-foreground opacity-0 ${
              isVisible ? "animate-fade-up [animation-delay:80ms]" : ""
            }`}
          >
            {t("contact.p")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`mx-auto mt-10 max-w-lg space-y-4 opacity-0 ${
            isVisible ? "animate-fade-up [animation-delay:160ms]" : ""
          }`}
        >
          {/* Topic */}
          <div className="flex gap-6">
            {(["platform", "consulting"] as const).map((val) => (
              <label key={val} className="flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground">
                <input
                  type="radio"
                  name="topic"
                  value={val}
                  checked={topic === val}
                  onChange={() => setTopic(val)}
                  className="accent-vlc-teal"
                />
                {val === "platform" ? t("contact.topic.platform") : t("contact.topic.consulting")}
              </label>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" required placeholder={t("contact.name")} className={inputClass} />
            <input name="company" required placeholder={t("contact.company")} className={inputClass} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="email" type="email" required placeholder={t("contact.email")} className={inputClass} />
            <input name="phone" type="tel" placeholder={t("contact.phone")} className={inputClass} />
          </div>

          {/* Platform-only fields */}
          {!isConsulting && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <select name="portfolio" className={inputClass} defaultValue="">
                  <option value="" disabled>{t("contact.portfolio")}</option>
                  <option value="<50">{t("contact.portfolio.opt1")}</option>
                  <option value="50-200">{t("contact.portfolio.opt2")}</option>
                  <option value="200-500">{t("contact.portfolio.opt3")}</option>
                  <option value="500+">{t("contact.portfolio.opt4")}</option>
                </select>
                <input name="pms" placeholder={t("contact.pms")} className={inputClass} />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-foreground">{t("contact.modules")}</p>
                <div className="flex flex-wrap gap-4">
                  {[t("why.stack.ops"), t("why.stack.marketing"), t("why.stack.finance")].map((mod) => (
                    <label key={mod} className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={modules.includes(mod)}
                        onChange={() => toggleModule(mod)}
                        className="accent-vlc-teal"
                      />
                      {mod}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <textarea
            name="message"
            rows={4}
            placeholder={t("contact.message")}
            className={inputClass + " resize-none"}
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-vlc py-3.5 text-base font-semibold text-white shadow-lg shadow-vlc-teal/20 transition-all duration-200 hover:shadow-xl hover:shadow-vlc-teal/30 active:scale-[0.97]"
          >
            {t("contact.cta")}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            {t("contact.note")}
          </p>
          <p className="text-center text-xs text-muted-foreground">
            {t("contact.direct")} <a href="mailto:hello@valentia.software" className="font-medium text-vlc-teal hover:underline">hello@valentia.software</a>
          </p>
        </form>
      </div>
    </section>
  );
}
