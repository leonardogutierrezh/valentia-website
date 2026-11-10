import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useI18n } from "@/lib/i18n";

interface FrontMatter {
  title?: string;
  meta_description?: string;
  created?: string;
  language?: string;
}

// Minimal "key: value" frontmatter parser (gray-matter needs Node's Buffer).
function parseFrontMatter(raw: string): { data: FrontMatter; content: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, content: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { data, content: m[2] };
}

type State =
  | { status: "loading" }
  | { status: "ok"; fm: FrontMatter; content: string }
  | { status: "error" };

// All post slugs that exist in public/blog/posts/
const POSTS = [
  "caos-invisible-property-manager",
  "property-manager-necesita-mas-que-pms",
];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useI18n();
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    if (!slug) { setState({ status: "error" }); return; }

    // Determine which file to fetch: prefer current lang, fall back to "en" then "es"
    const langs = lang === "es" ? ["es", "en"] : ["en", "es"];

    async function load() {
      for (const l of langs) {
        const url = `/blog/posts/${slug}.${l}.md`;
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const raw = await res.text();
          const { data, content } = parseFrontMatter(raw);
          // Drop the leading "# Title" since the header already shows it.
          setState({ status: "ok", fm: data, content: content.replace(/^\s*#\s+.*\r?\n/, "") });
          return;
        } catch {
          continue;
        }
      }
      setState({ status: "error" });
    }

    setState({ status: "loading" });
    load();
  }, [slug, lang]);

  function fmtDate(iso?: string) {
    if (!iso) return "";
    try {
      return new Date(String(iso) + "T00:00:00").toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      });
    } catch { return String(iso); }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-24 pb-20">
        {state.status === "loading" && (
          <div className="container mx-auto max-w-3xl px-6 py-20 text-center text-muted-foreground">
            Loading…
          </div>
        )}

        {state.status === "error" && (
          <div className="container mx-auto max-w-3xl px-6 py-20 text-center">
            <p className="text-muted-foreground">Post not found.</p>
            <Link to="/blog" className="mt-4 inline-block text-sm font-medium text-vlc-teal hover:underline">
              ← Back to Blog
            </Link>
          </div>
        )}

        {state.status === "ok" && (
          <>
            {/* Header */}
            <header className="border-b border-border py-12">
              <div className="container mx-auto max-w-3xl px-6">
                <Link to="/blog" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-vlc-teal">
                  <span>←</span> Blog
                </Link>
                {state.fm.created && (
                  <p className="mb-3 text-sm text-muted-foreground">{fmtDate(state.fm.created)}</p>
                )}
                <h1 className="font-display text-3xl font-bold leading-tight text-vlc-navy sm:text-4xl">
                  {state.fm.title}
                </h1>
                {state.fm.meta_description && (
                  <p className="mt-4 text-lg text-muted-foreground">{state.fm.meta_description}</p>
                )}
              </div>
            </header>

            {/* Body */}
            <article className="container mx-auto max-w-3xl px-6 pt-10">
              <div className="prose prose-slate max-w-none
                prose-headings:font-display prose-headings:text-vlc-navy
                prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8
                prose-p:text-foreground prose-p:leading-relaxed
                prose-a:text-vlc-teal prose-a:no-underline hover:prose-a:underline
                prose-strong:text-vlc-navy
                prose-blockquote:border-l-vlc-teal prose-blockquote:text-muted-foreground prose-blockquote:not-italic
                prose-li:text-foreground
                prose-ul:my-4 prose-ol:my-4
                prose-hr:border-border">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {state.content}
                </ReactMarkdown>
              </div>

              {/* CTA */}
              <div className="mt-16 rounded-2xl bg-vlc-navy p-8 text-center">
                <h2 className="font-display text-xl font-bold text-white">
                  Built by people who know the problem
                </h2>
                <p className="mt-2 text-sm text-white/70">
                  Valentia is software made by property managers, for property managers.
                </p>
                <Link
                  to="/#contact"
                  className="mt-5 inline-block rounded-xl bg-vlc-teal px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-vlc-teal/30 transition-all hover:bg-vlc-light-teal active:scale-[0.97]"
                >
                  Book a 30-Min Call
                </Link>
              </div>

              <div className="mt-8">
                <Link to="/blog" className="text-sm font-medium text-muted-foreground hover:text-vlc-teal">
                  ← Back to Blog
                </Link>
              </div>
            </article>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
