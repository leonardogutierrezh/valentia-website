// Valentia Software — blog runtime
// Powers: home "Latest articles" section, blog index page, single post page.
// Posts live as .md files in /blog/posts/ with YAML frontmatter.
// Manifest: /blog/posts.json (single source of truth for listings).

(function blog() {
  var POSTS_JSON = "blog/posts.json";
  var POSTS_DIR = "blog/posts/";

  // ---------- Helpers ----------
  function t(key, fallback) {
    var lang = window.__valentiaLang || "en";
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

  // Tiny YAML frontmatter parser — handles our flat key/value + array shape only.
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
          // strip optional surrounding quotes
          if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
            v = v.substring(1, v.length - 1);
          }
          // arrays like [a, b, c]
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
        // Sort newest first
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
    var lang = window.__valentiaLang || "en";
    var href = "post.html?slug=" + encodeURIComponent(p.slug);
    var date = fmtDate(p.date, lang);
    var reading = p.readingMinutes
      ? p.readingMinutes + " " + t("blog.reading.suffix", "min read")
      : "";
    return (
      '<article class="post-card">' +
        '<a href="' + href + '" class="post-card-link">' +
          '<div class="post-card-meta">' +
            '<span class="post-lang-badge">' + escapeHtml((p.language || "en").toUpperCase()) + '</span>' +
            (date ? '<span>' + escapeHtml(date) + '</span>' : '') +
            (reading ? '<span class="post-meta-sep">·</span><span>' + escapeHtml(reading) + '</span>' : '') +
          '</div>' +
          '<h3 class="post-card-title">' + escapeHtml(p.title || "") + '</h3>' +
          '<p class="post-card-excerpt">' + escapeHtml(p.excerpt || "") + '</p>' +
          '<span class="post-card-cta" data-i18n-text="blog.read">' + t("blog.read", "Read article →") + '</span>' +
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

    function paint(posts) {
      var filtered = currentFilter === "all"
        ? posts
        : posts.filter(function (p) { return (p.language || "en") === currentFilter; });
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

    fetch(POSTS_DIR + slug + ".md", { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("post " + r.status);
        return r.text();
      })
      .then(function (md) {
        var parsed = parseFrontmatter(md);
        var fm = parsed.frontmatter;
        var lang = window.__valentiaLang || "en";

        var pageTitle = (fm.meta_title || fm.title || "Article") + " — Valentia Software";
        if (titleEl) titleEl.textContent = pageTitle;
        document.title = pageTitle;
        if (metaDescEl && fm.meta_description) metaDescEl.setAttribute("content", fm.meta_description);
        if (h1El) h1El.textContent = fm.title || "";
        if (excerptEl && fm.meta_description) excerptEl.textContent = fm.meta_description;
        if (dateEl) dateEl.textContent = fmtDate(fm.created || fm.date || "", lang);
        if (langBadgeEl && fm.language) {
          langBadgeEl.textContent = String(fm.language).toUpperCase();
          langBadgeEl.hidden = false;
        }

        // Reading time estimate (200 wpm)
        var words = parsed.body.split(/\s+/).length;
        var mins = Math.max(1, Math.round(words / 200));
        if (readingEl) readingEl.textContent = mins + " " + t("blog.reading.suffix", "min read");

        // Render markdown
        if (window.marked) {
          window.marked.setOptions({ gfm: true, breaks: false });
          // Strip the first H1 from body if it duplicates the title (we already render it in header)
          var body = parsed.body.replace(/^\s*#\s+.+\n+/, "");
          bodyEl.innerHTML = window.marked.parse(body);
        } else {
          bodyEl.textContent = parsed.body;
        }
      })
      .catch(function (e) {
        console.warn("[blog] post load failed", e);
        showError();
      });
  }

  // ---------- Init ----------
  // i18n.js applies translations synchronously on load, so window.__valentiaLang is ready.
  // Re-render relevant pieces if user toggles language.
  function reactToLanguageChange() {
    document.querySelectorAll(".lang-switch button[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        // Defer so i18n.js updates window.__valentiaLang first
        setTimeout(function () {
          // Cards & post times need re-render because they use locale-formatted dates
          renderHomeLatest();
          renderBlogIndex();
          // For the single post, just refresh date/reading-time labels
          var dateEl = document.getElementById("postDate");
          if (dateEl) {
            var slug = getQueryParam("slug");
            if (slug) renderPost();
          }
        }, 0);
      });
    });
  }

  renderHomeLatest();
  renderBlogIndex();
  renderPost();
  reactToLanguageChange();
})();
