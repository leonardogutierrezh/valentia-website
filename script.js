// Valentia Software — site interactions

// ---------- i18n ----------
(function setupI18n() {
  var DICT = window.VALENTIA_I18N || { en: {}, es: {} };
  var STORAGE_KEY = "valentia_lang";

  function detectLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "es") return saved;
    } catch (e) {}
    var browser = (navigator.language || "en").toLowerCase();
    return browser.indexOf("es") === 0 ? "es" : "en";
  }

  function applyLang(lang) {
    var dict = DICT[lang] || DICT.en;

    // Text content
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var val = dict[key];
      if (val == null) return;
      // <title> handling
      if (el.tagName === "TITLE") {
        document.title = val;
        return;
      }
      // <meta> description handling
      if (el.tagName === "META") {
        el.setAttribute("content", val);
        return;
      }
      el.textContent = val;
    });

    // Placeholder attributes
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      var val = dict[key];
      if (val != null) el.setAttribute("placeholder", val);
    });

    // <html lang>
    document.documentElement.setAttribute("lang", lang);

    // Toggle button state
    document.querySelectorAll(".lang-switch button[data-lang]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    window.__valentiaLang = lang;
  }

  // Wire up switcher buttons
  document.querySelectorAll(".lang-switch button[data-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-lang"));
    });
  });

  // Initial render
  applyLang(detectLang());
})();

// ---------- Footer year ----------
(function setYear() {
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

// ---------- Product shot fallback (when screenshot file is missing) ----------
(function setupProductShotFallback() {
  function swap(img) {
    var fig = img.closest(".product-shot");
    if (!fig || fig.classList.contains("product-shot-empty")) return;
    var alt = img.getAttribute("alt") || "Screenshot";
    fig.classList.add("product-shot-empty");
    fig.innerHTML =
      '<div class="shot-placeholder">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
          '<rect x="3" y="3" width="18" height="18" rx="2.5"/>' +
          '<circle cx="8.5" cy="8.5" r="1.5"/>' +
          '<path d="M21 15l-4.5-4.5L8 19"/>' +
        '</svg>' +
        '<span>' + alt + '</span>' +
      '</div>';
  }

  document.querySelectorAll(".product-shot img").forEach(function (img) {
    img.addEventListener("error", function () { swap(img); });
    // If image already failed before listener attached
    if (img.complete && img.naturalWidth === 0) swap(img);
  });
})();

// ---------- Mobile nav toggle ----------
(function setupNav() {
  var nav = document.querySelector(".nav");
  var btn = document.querySelector(".nav-toggle");
  if (!nav || !btn) return;
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();

// ---------- Contact form ----------
(function setupContactForm() {
  var form = document.getElementById("contactForm");
  if (!form) return;
  var note = document.getElementById("formNote");

  function t(key, fallback) {
    var lang = window.__valentiaLang || "en";
    var dict = (window.VALENTIA_I18N && window.VALENTIA_I18N[lang]) || {};
    return dict[key] || fallback;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var data = new FormData(form);
    var name = (data.get("name") || "").toString().trim();
    var company = (data.get("company") || "").toString().trim();
    var email = (data.get("email") || "").toString().trim();

    if (!name || !company || !email) {
      note.hidden = false;
      note.classList.add("error");
      note.textContent = t("form.error.required", "Please fill in name, company, and email.");
      return;
    }

    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      note.hidden = false;
      note.classList.add("error");
      note.textContent = t("form.error.email", "That email doesn't look right.");
      return;
    }

    var pms = (data.get("pms") || "").toString();
    var portfolio = (data.get("portfolio") || "").toString();
    var modules = data.getAll("modules").join(", ");
    var message = (data.get("message") || "").toString();

    var body = [
      "Name: " + name,
      "Company: " + company,
      "Email: " + email,
      "Portfolio: " + portfolio,
      "PMS: " + pms,
      "Modules: " + modules,
      "",
      message,
    ].join("\n");

    var mailto =
      "mailto:hello@valentia.software" +
      "?subject=" + encodeURIComponent("New inquiry from " + company) +
      "&body=" + encodeURIComponent(body);

    note.hidden = false;
    note.classList.remove("error");
    note.textContent = t("form.success", "Thanks — opening your email client to send the message.");
    window.location.href = mailto;
  });
})();
