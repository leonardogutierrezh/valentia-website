// Valentia Software — site interactions

// Footer year
(function setYear() {
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();

// Mobile nav toggle
(function setupNav() {
  var nav = document.querySelector(".nav");
  var btn = document.querySelector(".nav-toggle");
  if (!nav || !btn) return;
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  // Close on link click (mobile)
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();

// Contact form — client-side only (no backend yet)
(function setupContactForm() {
  var form = document.getElementById("contactForm");
  if (!form) return;
  var note = document.getElementById("formNote");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var data = new FormData(form);
    var name = (data.get("name") || "").toString().trim();
    var company = (data.get("company") || "").toString().trim();
    var email = (data.get("email") || "").toString().trim();

    if (!name || !company || !email) {
      note.hidden = false;
      note.classList.add("error");
      note.textContent = "Please fill in name, company, and email.";
      return;
    }

    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      note.hidden = false;
      note.classList.add("error");
      note.textContent = "That email doesn't look right.";
      return;
    }

    // Build mailto fallback so the message goes somewhere even without a backend.
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
    note.textContent = "Thanks — opening your email client to send the message.";
    window.location.href = mailto;
  });
})();
