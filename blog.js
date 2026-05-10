// Valentia Software — blog runtime (multilingual)
// Powers: home "Latest articles" section, blog index page, single post page.
//
// Manifest schema (code/blog/posts.json):
//   {
//     "posts": [
//       {
//         "slug": "kebab-case-slug",
//         "languages": ["es", "en"],            // languages this post is available in
//         "title":   { "es": "...", "en": "..." },
//         "excerpt": { "es": "...", "en": "..." },
//         "date": "YYYY-MM-DD",
//         "readingMinutes": 7,
//         "tags": ["..."]
//       }
//     ]
//   }
//
// Body files live in /blog/posts/<slug>.<lang>.md (one per language).
// The post page picks the body matching the active UI language; if not available,
// it falls back to the first language the post supports and shows a small badge.

(function blog() {
  var POSTS_JSON = "blog/posts.json";
  var POSTS_DIR = "blog/posts/";

  // ---------- Helpers ----------
  function activeLang() { return window.__valentiaLang || "en"; }

  function t(key, fallback) {
    var lang = activeLang();
    var dict = (window.VALENTIA_I18N && window.VALENTIA_I18N[lang]) || {};
    return dict[key] || fallback;
  }

  function getQueryParam(name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : null;
  }

  function fmtDate(iso, lang) {
    if (!iso) return "";
    try {
      var d = new Date(iso + "T00:00:00");
      return d.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
        year: "numeric", month: "short", day: "numeric"
      });
    } catch (e) { return iso; }
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // Pick a localized field. Field can be:
  //   - an object { es: "...", en: "..." } → return field[lang], fall back to any value
  //   - a string → return as-is (backwards-compat for old single-language entries)
  function pickLocalized(field, lang) {
    if (field == null) return "";
    if (typeof field === "string") return field;
    if (typeof field !== "object") return String(field);
    if (field[lang]) return field[lang];
    var keys = Object.keys(field);
    return keys.length ? field[keys[0]] : "";
  }

  // What language should we display this post in?
  // Returns { displayLang, isFallback }
  function pickPostLang(post, uiLang) {
    var langs = Array.isArray(post.languages) && post.languages.length
      ? post.languages
      : (post.language ? [post.language] : ["en"]);
    if (langs.indexOf(uiLang) !== -1) {
      return { displayLang: uiLang, isFallback: false };
    }
    return { displayLang: langs[0], isFallback: true };
  }

  // Tiny YAML frontmatter parser (mirrors publish.py for consistency).
  function parseFrontmatter(md) {
    var fm = {};
    var body = md;
    if (md.indexOf("---") === 0) {
      var end = md.indexOf("\n---", 3);
      if (end !== -1) {
        var raw = md.substring(3, end).trim();
        body = md.substring(end + 4).replace(/^\s*\n/, "");
        raw.split(/\r?\n/).forEach(function (line) {
          var idx = line.indexOf(":");
          if (idx === -1) return;
          var k = line.substring(0, idx).trim();
          var v = line.substring(idx + 1).trim();
          if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
            v = v.substring(1, v.length - 1);
          }
          if (v.startsWith("[") && v.endsWith("]")) {
            v = v.substring(1, v.length - 1).split(",").map(function (s) { return s.trim().replace(/^["']|["']$/g, ""); }).filter(Boolean);
          }
          fm[k] = v;
        });
      }
    }
    return { frontmatter: fm, body: body };
  }

  // ---------- Manifest cache ----------
  var manifestPromise = null;
  function loadManifest() {
    if (manifestPromise) return manifestPromise;
    manifestPromise = fetch(POSTS_JSON, { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("posts.json " + r.status);
        return r.json();
      })
      .then(function (data) {
        var list = (data && data.posts) ? data.posts.slice() : [];
        list.sort(function (a, b) { return (b.date || "").localeCompare(a.date || ""); });
        return list;
      })
      .catch(function (e) {
        console.warn("[blog] manifest load failed", e);
        return [];
      });
    return manifestPromise;
  }

  // ---------- Card renderer ----------
  function postCard(p) {
    var uiLang = activeLang();
    var pick = pickPostLang(p, uiLang);
    var displayLang = pick.displayLang;
    var title = pickLocalized(p.title, displayLang);
    var excerpt = pickLocalized(p.excerpt, displayLang);
    var href = "post.html?slug=" + encodeURIComponent(p.slug);
    var date = fmtDate(p.date, uiLang);
    var reading = p.readingMinutes
      ? p.readingMinutes + " " + t("blog.reading.suffix", "min read")
      : "";

    // Show one chip per available language
    var langs = Array.isArray(p.languages) && p.languages.length
      ? p.languages
      : (p.language ? [p.language] : []);
    var langChips = langs.map(function (lng) {
      var cls = "post-lang-badge" + (lng === displayLang ? " post-lang-badge-active" : "");
      return '<span class="' + cls + '">' + escapeHtml(lng.toUpperCase()) + '</span>';
    }).join("");

    return (
      '<article class="post-card">' +
        '<a href="' + href + '" class="post-card-link">' +
          '<div class="post-card-meta">' +
            langChips +
            (date ? '<span>' + escapeHtml(date) + '</span>' : '') +
            (reading ? '<span class="post-meta-sep">·</span><span>' + escapeHtml(reading) + '</span>' : '') +
          '</div>' +
          '<h3 class="post-card-title">' + escapeHtml(title) + '</h3>' +
          '<p class="post-card-excerpt">' + escapeHtml(excerpt) + '</p>' +
          '<span class="post-card-cta">' + t("blog.read", "Read article →") + '</span>' +
        '</a>' +
      '</article>'
    );
  }

  // ---------- Home: latest posts ----------
  function renderHomeLatest() {
    var grid = document.getElementById("homeLatest");
    if (!grid) return;
    loadManifest().then(function (posts) {
      if (!posts.length) {
        grid.innerHTML = '<p class="muted">' + t("blog.empty", "No posts yet.") + '</p>';
        return;
      }
      grid.innerHTML = posts.slice(0, 3).map(postCard).join("");
    });
  }

  // ---------- Blog index ----------
  function renderBlogIndex() {
    var grid = document.getElementById("postsGrid");
    if (!grid) return;
    var emptyMsg = document.getElementById("postsEmpty");
    var filterButtons = document.querySelectorAll(".blog-filter button[data-filter]");
    var currentFilter = "all";

    function postHasLang(p, lang) {
      if (Array.isArray(p.languages)) return p.languages.indexOf(lang) !== -1;
      return p.language === lang;
    }

    function paint(posts) {
      var filtered = currentFilter === "all"
        ? posts
        : posts.filter(function (p) { return postHasLang(p, currentFilter); });
      if (!filtered.length) {
        grid.innerHTML = "";
        if (emptyMsg) emptyMsg.hidden = false;
        return;
      }
      if (emptyMsg) emptyMsg.hidden = true;
      grid.innerHTML = filtered.map(postCard).join("");
    }

    loadManifest().then(function (posts) {
      paint(posts);
      filterButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
          currentFilter = btn.getAttribute("data-filter") || "all";
          filterButtons.forEach(function (b) { b.classList.toggle("active", b === btn); });
          paint(posts);
        });
      });
    });
  }

  // ---------- Single post ----------
  function renderPost() {
    var bodyEl = document.getElementById("postBody");
    if (!bodyEl) return; // not on post page
    var slug = getQueryParam("slug");
    var errorEl = document.getElementById("postError");

    function showError() {
      bodyEl.hidden = true;
      if (errorEl) errorEl.hidden = false;
    }

    if (!slug || !/^[a-z0-9-]+$/i.test(slug)) {
      showError();
      return;
    }

    var titleEl = document.getElementById("postTitle");
    var metaDescEl = document.getElementById("postMetaDesc");
    var h1El = document.getElementById("postH1");
    var dateEl = document.getElementById("postDate");
    var readingEl = document.getElementById("postReading");
    var excerptEl = document.getElementById("postExcerpt");
    var langBadgeEl = document.getElementById("postLangBadge");

    // Look up the manifest entry first so we know which languages exist for this slug.
    loadManifest().then(function (posts) {
      var entry = posts.find(function (p) { return p.slug === slug; });
      var uiLang = activeLang();
      var displayLang;
      var isFallback = false;

      if (entry) {
        var pick = pickPostLang(entry, uiLang);
        displayLang = pick.displayLang;
        isFallback = pick.isFallback;
      } else {
        displayLang = uiLang; // best guess; the .md fetch may still succeed for legacy posts
      }

      // Try the localized file first; if 404, fall back to the legacy <slug>.md
      var primary = POSTS_DIR + slug + "." + displayLang + ".md";
      var legacy = POSTS_DIR + slug + ".md";

      function tryFetch(url, then, otherwise) {
        fetch(url, { cache: "no-cache" }).then(function (r) {
          if (!r.ok) return otherwise();
          r.text().then(then);
        }).catch(otherwise);
      }

      function render(md) {
        var parsed = parseFrontmatter(md);
        var fm = parsed.frontmatter;

        // Prefer localized fields from the manifest, fall back to the .md frontmatter
        var title = entry ? pickLocalized(entry.title, displayLang) : (fm.title || "");
        var excerpt = entry
          ? pickLocalized(entry.excerpt, displayLang)
          : (fm.meta_description || "");
        var date = (entry && entry.date) || fm.created || fm.date || "";

        var pageTitle = title + " — Valentia Software";
        if (titleEl) titleEl.textContent = pageTitle;
        document.title = pageTitle;
        if (metaDescEl && excerpt) metaDescEl.setAttribute("content", excerpt);
        if (h1El) h1El.textContent = title;
        if (excerptEl && excerpt) excerptEl.textContent = excerpt;
        if (dateEl) dateEl.textContent = fmtDate(date, uiLang);
        if (langBadgeEl) {
          if (isFallback) {
            // Tell the reader: "this post is in <displayLang>; you switched UI to <uiLang>"
            langBadgeEl.textContent = displayLang.toUpperCase();
            langBadgeEl.hidden = false;
            langBadgeEl.title = t("post.fallback.note", "Only available in this language");
          } else {
            langBadgeEl.textContent = displayLang.toUpperCase();
            langBadgeEl.hidden = false;
            langBadgeEl.title = "";
          }
        }

        // Reading time from this language's body (falls back to manifest if computed=0)
        var words = parsed.body.split(/\s+/).filter(Boolean).length;
        var mins = Math.max(1, Math.round(words / 200));
        if (readingEl) {
          readingEl.textContent = (entry && entry.readingMinutes ? entry.readingMinutes : mins)
            + " " + t("blog.reading.suffix", "min read");
        }

        bodyEl.hidden = false;
        if (errorEl) errorEl.hidden = true;

        if (window.marked) {
          window.marked.setOptions({ gfm: true, breaks: false });
          // Strip a leading H1 from the body if it duplicates the title we already render.
          var body = parsed.body.replace(/^\s*#\s+.+\n+/, "");
          bodyEl.innerHTML = window.marked.parse(body);
        } else {
          bodyEl.textContent = parsed.body;
        }
      }

      tryFetch(primary, render, function () {
        tryFetch(legacy, render, function () {
          console.warn("[blog] post not found:", primary, "or", legacy);
          showError();
        });
      });
    });
  }

  // ---------- Init ----------
  function reactToLanguageChange() {
    document.querySelectorAll(".lang-switch button[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        // i18n.js updates window.__valentiaLang synchronously on click; defer to next tick
        // to make sure we read the post-update value, then re-render everything.
        setTimeout(function () {
          renderHomeLatest();
          renderBlogIndex();
          if (document.getElementById("postBody")) renderPost();
        }, 0);
      });
    });
  }

  renderHomeLatest();
  renderBlogIndex();
  renderPost();
  reactToLanguageChange();
})();
