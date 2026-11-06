/* Holy Family Parish: clickable prototype.
   Nothing here saves real data. The demo sign-in only remembers a flag in this browser. */
(function () {
  "use strict";

  var DEMO_EMAIL = "demo@holyfamilyhalifax.ca";
  var DEMO_PASSWORD = "HolyFamily2026";
  var KEY = "hfp-demo-signed-in";
  var memory = {};

  function store() {
    try { var s = window.localStorage; s.setItem("hfp-test", "1"); s.removeItem("hfp-test"); return s; }
    catch (e) { try { return window.sessionStorage; } catch (e2) { return null; } }
  }
  var S = store();
  function get(k) { try { return S ? S.getItem(k) : memory[k]; } catch (e) { return memory[k]; } }
  function set(k, v) { try { if (S) S.setItem(k, v); else memory[k] = v; } catch (e) { memory[k] = v; } }
  function del(k) { try { if (S) S.removeItem(k); else delete memory[k]; } catch (e) { delete memory[k]; } }
  var signedIn = function () { return get(KEY) === "1"; };

  /* Icons (simple line icons, 24px grid) */
  var I = {
    home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
    cross: '<path d="M12 2v20M6.5 7.5h11"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    users: '<circle cx="9" cy="8" r="4"/><path d="M2 21v-1a6 6 0 0 1 12 0v1M16 4a4 4 0 0 1 0 8M22 21v-1a6 6 0 0 0-4-5.6"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/>',
    heart: '<path d="M12 20s-7-4.4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.6-9 9-9 9z"/>',
    book: '<path d="M4 19V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2zM8 7h8M8 11h6"/>',
    pin: '<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 20a2 2 0 0 0 4 0"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    receipt: '<path d="M6 2h9l5 5v15H6zM14 2v6h6M9 13h6M9 17h6"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    upload: '<path d="M12 21V9M7 14l5-5 5 5M4 3h16"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    logout: '<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 17l-5-5 5-5M5 12h11"/>',
    chart: '<path d="M3 21h18M6 17V11M11 17V5M16 17v-8M21 17v-3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    back: '<path d="M15 6l-6 6 6 6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8C10 4 6 4 6 6.5S12 8 12 8zM12 8c2-4 6-4 6-1.5S12 8 12 8z"/>',
    megaphone: '<path d="M3 10v4l12 5V5zM15 9a3 3 0 0 1 0 6M6 15l1.5 5h3L9 16"/>',
    music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    flame: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-6.5 2 1 3 3.5 3 3.5s1.5-3 0-7z"/>',
    star: '<path d="M12 3l2.8 6 6.2.6-4.7 4.1 1.4 6.3L12 16.8 6.3 20l1.4-6.3L3 9.6 9.2 9z"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 21l1.9-5.3A8 8 0 1 1 21 12z"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    alert: '<path d="M12 3l10 18H2zM12 10v4M12 17h.01"/>',
    card: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/>',
    hands: '<path d="M12 21v-7M12 14l-4-4V4l4 4 4-4v6z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    door: '<path d="M4 21h16M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M14 12h.01"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/>'
  };
  function icon(name, cls) {
    return '<svg class="i ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (I[name] || I.info) + "</svg>";
  }
  window.HFP = { icon: icon };

  function fillIcons(root) {
    (root || document).querySelectorAll("[data-icon]").forEach(function (el) {
      el.insertAdjacentHTML("afterbegin", icon(el.getAttribute("data-icon")));
      el.removeAttribute("data-icon");
    });
  }

  /* Shell: header, tab bar, footer */
  var body = document.body;
  var root = body.getAttribute("data-root") || "";
  var page = body.getAttribute("data-page") || "";
  function cur(p) { return page === p ? ' aria-current="page"' : ""; }

  var accountHref = signedIn() ? root + "account/index.html" : root + "login.html";
  var accountLabel = signedIn() ? "My account" : "Sign in";

  var strip = '<div class="demo-strip"><strong>Prototype for the parish council.</strong> Announcements are real. Families, names and numbers are samples.</div>';

  var header =
    '<header class="site-header"><div class="wrap">' +
      '<a class="brand" href="' + root + 'index.html"><img src="' + root + 'assets/img/parish-logo.jpg" alt="" width="42" height="42"><span><b>Holy Family</b><span>Syro-Malabar Catholic Church, Halifax</span></span></a>' +
      '<nav class="top-nav" aria-label="Main">' +
        '<a href="' + root + 'index.html"' + cur("home") + '>Home</a>' +
        '<a href="' + root + 'mass.html"' + cur("mass") + '>Mass times</a>' +
        '<a href="' + root + 'events.html"' + cur("events") + '>Events</a>' +
        '<a href="' + root + 'community.html"' + cur("community") + '>Community</a>' +
        '<a href="' + root + 'catechism.html"' + cur("catechism") + '>Catechism</a>' +
        '<a href="' + root + 'give.html"' + cur("give") + '>Give</a>' +
      '</nav>' +
      '<div class="header-actions">' +
        '<button class="lang-btn ml" type="button" data-toast="The real website will offer key pages in Malayalam too. Malayalam text will be written and checked by parish members.">മലയാളം</button>' +
        '<a class="account-btn" href="' + accountHref + '">' + icon("user") + '<span>' + accountLabel + '</span></a>' +
      '</div>' +
    '</div></header>';

  var tabbar =
    '<nav class="tabbar" aria-label="Quick menu">' +
      '<a href="' + root + 'index.html"' + cur("home") + '>' + icon("home") + 'Home</a>' +
      '<a href="' + root + 'mass.html"' + cur("mass") + '>' + icon("clock") + 'Mass</a>' +
      '<a href="' + root + 'events.html"' + cur("events") + '>' + icon("calendar") + 'Events</a>' +
      '<a href="' + root + 'community.html"' + cur("community") + '>' + icon("users") + 'Community</a>' +
      '<a href="' + accountHref + '"' + cur("account") + '>' + icon("user") + (signedIn() ? "Account" : "Sign in") + '</a>' +
    '</nav>';

  var footer =
    '<footer class="site-footer"><div class="kasavu"></div><div class="wrap cols">' +
      '<div><h3>Holy Family Syro-Malabar Catholic Church</h3><p>' + icon("pin") + '<span>St. Stephen Church, 6032 Normandy Drive, Halifax, Nova Scotia<br>Eparchy of Mississauga</span></p>' +
      '<p class="small">' + icon("phone") + '<span>Contact details to be added once confirmed by the parish office.</span></p></div>' +
      '<div><h3>Visit</h3><ul><li><a href="' + root + 'mass.html">Mass times</a></li><li><a href="' + root + 'events.html">Events</a></li><li><a href="' + root + 'catechism.html">Catechism</a></li><li><a href="' + root + 'join.html">Register your family</a></li></ul></div>' +
      '<div><h3>Our community</h3><ul><li><a href="https://jy.holyfamilyhalifax.ca">Jesus Youth</a></li><li><a href="' + root + 'community.html">Associations and family units</a></li><li><a href="' + root + 'privacy.html">How we protect your information</a></li></ul></div>' +
    '</div><div class="wrap small" style="margin-top:1.4rem;opacity:.75">Prototype. Not the live parish website.</div></footer>';

  body.insertAdjacentHTML("afterbegin", strip + header);
  body.insertAdjacentHTML("beforeend", footer + tabbar + '<div class="toast" role="status" aria-live="polite"></div>');

  /* Guard member pages */
  if (body.getAttribute("data-auth") === "member" && S && !signedIn()) {
    window.location.replace(root + "login.html?next=" + encodeURIComponent(location.pathname.split("/").slice(-2).join("/")));
    return;
  }

  /* Toasts: every pretend action explains itself */
  var toastEl = document.querySelector(".toast");
  var timer;
  function toast(msg) {
    toastEl.innerHTML = icon("info") + "<span>" + msg + "</span>";
    toastEl.classList.add("show");
    clearTimeout(timer);
    timer = setTimeout(function () { toastEl.classList.remove("show"); }, 4200);
  }
  window.HFP.toast = toast;
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-toast]");
    if (t) { e.preventDefault(); toast(t.getAttribute("data-toast")); }
  });

  /* Sign in */
  var login = document.getElementById("login-form");
  if (login) {
    login.addEventListener("submit", function (e) {
      e.preventDefault();
      var em = login.email.value.trim().toLowerCase();
      var pw = login.password.value;
      var err = document.getElementById("login-error");
      if (em === DEMO_EMAIL && pw === DEMO_PASSWORD) {
        set(KEY, "1");
        var next = new URLSearchParams(location.search).get("next");
        location.href = next && /^(account|office)\/[\w-]+\.html$/.test(next) ? next : "account/index.html";
      } else {
        err.textContent = "That email or password doesn't match the demo account. Check the details in the gold box.";
      }
    });
    var fill = document.getElementById("fill-demo");
    if (fill) fill.addEventListener("click", function () {
      login.email.value = DEMO_EMAIL; login.password.value = DEMO_PASSWORD; login.email.focus();
    });
  }
  document.querySelectorAll("[data-signout]").forEach(function (b) {
    b.addEventListener("click", function (e) { e.preventDefault(); del(KEY); location.href = root + "index.html"; });
  });

  /* Today card: next Mass from the weekly schedule */
  var today = document.getElementById("next-mass");
  if (today) {
    // day: [hour, minute, label]; Monday has no Mass. Saturday has no Mass on the last Saturday.
    var plan = { 0: [17, 0, "Sunday Holy Mass"], 2: [17, 0, "Holy Mass"], 3: [17, 0, "Holy Mass"], 4: [17, 0, "Holy Mass"], 5: [17, 0, "Holy Mass"], 6: [9, 0, "Holy Mass"] };
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var now = new Date();
    // Dates with no Holy Mass (from the Sunday announcements)
    var closed = [{ from: "2026-11-09", to: "2026-11-14", note: "No Holy Mass November 9 to 14 (priests' annual retreat)" }];
    function ymd(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
    function closure(d) { var k = ymd(d); for (var c = 0; c < closed.length; c++) if (k >= closed[c].from && k <= closed[c].to) return closed[c]; return null; }
    var skipped = null;
    function isLastSaturday(d) { var n = new Date(d); n.setDate(d.getDate() + 7); return d.getDay() === 6 && n.getMonth() !== d.getMonth(); }
    for (var add = 0; add < 21; add++) {
      var d = new Date(now); d.setDate(now.getDate() + add);
      var p = plan[d.getDay()];
      if (!p || isLastSaturday(d)) continue;
      var cl = closure(d); if (cl) { skipped = cl; continue; }
      var at = new Date(d); at.setHours(p[0], p[1], 0, 0);
      if (at > now) {
        var md = d.toLocaleDateString("en-CA", { month: "long", day: "numeric" });
        var when = add === 0 ? "Today, " + days[d.getDay()] : add === 1 ? "Tomorrow, " + days[d.getDay()] : days[d.getDay()] + ", " + md;
        var h = p[0] % 12 || 12, ap = p[0] < 12 ? "AM" : "PM";
        document.getElementById("nm-time").textContent = h + ":" + String(p[1]).padStart(2, "0");
        document.getElementById("nm-ampm").textContent = ap;
        document.getElementById("nm-when").textContent = when;
        document.getElementById("nm-label").textContent = p[2];
        break;
      }
    }
    // Show the closure notice if one is coming up within two weeks
    var noteEl = document.getElementById("nm-note");
    if (noteEl) {
      for (var a2 = 0; a2 < 14; a2++) {
        var d2 = new Date(now); d2.setDate(now.getDate() + a2);
        var c2 = closure(d2);
        if (c2) { noteEl.innerHTML = icon("alert") + "<span>" + c2.note + "</span>"; noteEl.hidden = false; break; }
      }
    }
    var dn = document.getElementById("today-name");
    if (dn) dn.textContent = days[now.getDay()] + ", " + now.toLocaleDateString("en-CA", { month: "long", day: "numeric" });
    document.querySelectorAll(".schedule .day[data-d='" + now.getDay() + "']").forEach(function (r) { r.classList.add("today-row"); });
  }
  document.querySelectorAll(".schedule .day[data-d]").forEach(function (r) {
    if (+r.getAttribute("data-d") === new Date().getDay()) r.classList.add("today-row");
  });

  /* Registration steps */
  var steps = document.querySelectorAll(".step");
  if (steps.length) {
    var marks = document.querySelectorAll(".steps li");
    var at = 0;
    function show(n) {
      at = Math.max(0, Math.min(steps.length - 1, n));
      steps.forEach(function (s, i) { s.classList.toggle("on", i === at); });
      marks.forEach(function (m, i) { m.classList.toggle("on", i === at); m.classList.toggle("done", i < at); });
      var top = document.querySelector(".steps"); if (top && n > 0) top.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    document.addEventListener("click", function (e) {
      if (e.target.closest("[data-next]")) { e.preventDefault(); show(at + 1); }
      if (e.target.closest("[data-prev]")) { e.preventDefault(); show(at - 1); }
    });
    show(0);
  }

  /* Directory filter and search */
  var dir = document.getElementById("directory");
  if (dir) {
    var q = document.getElementById("dir-search");
    var unit = "all";
    function apply() {
      var term = (q.value || "").toLowerCase();
      var shown = 0;
      dir.querySelectorAll(".person").forEach(function (p) {
        var ok = (unit === "all" || p.getAttribute("data-unit") === unit) && p.textContent.toLowerCase().indexOf(term) > -1;
        p.hidden = !ok; if (ok) shown++;
      });
      dir.querySelectorAll(".letter").forEach(function (l) {
        var n = l.nextElementSibling, any = false;
        while (n && !n.classList.contains("letter")) { if (!n.hidden) any = true; n = n.nextElementSibling; }
        l.hidden = !any;
      });
      document.getElementById("dir-count").textContent = shown + (shown === 1 ? " person" : " people");
    }
    q.addEventListener("input", apply);
    document.querySelectorAll(".filters button").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll(".filters button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true"); unit = b.getAttribute("data-unit"); apply();
      });
    });
    apply();
  }

  /* Share on WhatsApp: opens WhatsApp with the post title and its link */
  document.querySelectorAll("[data-share]").forEach(function (a) {
    var c = document.querySelector('link[rel="canonical"]');
    var url = c ? c.href : location.href;
    var h1 = document.querySelector("h1");
    a.href = "https://wa.me/?text=" + encodeURIComponent((h1 ? h1.textContent.trim() + "\n" : "") + url);
  });

  fillIcons();
})();
