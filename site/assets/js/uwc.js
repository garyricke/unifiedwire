/* UWC Shared JS — navigation, footer, scroll animations */

// ── Active nav link ──────────────────────────────────────────
function setActiveNav() {
  var path = window.location.pathname;
  document.querySelectorAll('#site-nav .nav-links a').forEach(function (a) {
    if (a.getAttribute('href') && path.endsWith(a.getAttribute('href').replace(/^.*\//, ''))) {
      a.classList.add('active');
    }
  });
}

// ── Mobile hamburger ─────────────────────────────────────────
function initMobileNav() {
  var btn   = document.getElementById('nav-hamburger');
  var links = document.getElementById('nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  // close on outside click
  document.addEventListener('click', function (e) {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    }
  });
}

// ── Scroll fade-in ───────────────────────────────────────────
function initFadeIn() {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  document.querySelectorAll('.fade-in').forEach(function (el) { io.observe(el); });
}

// ── Nav HTML ─────────────────────────────────────────────────
function renderNav(depth) {
  // depth: '' for site root, '../' for one level deep, '../../' for two levels
  depth = depth || '';
  var nav = document.getElementById('site-nav');
  if (!nav) return;
  nav.innerHTML = [
    '<div class="nav-inner">',
    '  <a class="nav-logo" href="' + depth + 'home.html">',
    '    <img src="https://res.cloudinary.com/dsbllwpbh/image/upload/f_auto,q_auto/uwc/unified-logo-current" alt="Unified Wire & Cable">',
    '  </a>',
    '  <nav class="nav-links" id="nav-links" role="navigation" aria-label="Main">',
    '    <a href="' + depth + 'products.html">Products</a>',
    '    <a href="' + depth + 'markets/index.html">Markets</a>',
    '    <a href="' + depth + 'resources/index.html">Resources</a>',
    '    <a href="' + depth + 'about.html">About</a>',
    '    <a href="' + depth + 'careers.html">Careers</a>',
    '  </nav>',
    '  <div class="nav-actions">',
    '    <a href="' + depth + 'find-a-rep.html" class="btn btn-outline-wh btn-sm">Find a Rep</a>',
    '    <a href="' + depth + 'contact.html" class="btn btn-primary btn-sm">Request a Quote</a>',
    '    <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu" aria-expanded="false">',
    '      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">',
    '        <line x1="3" y1="6" x2="19" y2="6"/><line x1="3" y1="11" x2="19" y2="11"/><line x1="3" y1="16" x2="19" y2="16"/>',
    '      </svg>',
    '    </button>',
    '  </div>',
    '</div>'
  ].join('\n');
}

// ── Footer HTML ──────────────────────────────────────────────
function renderFooter(depth) {
  depth = depth || '';
  var footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = [
    '<div class="container">',
    '  <div class="footer-grid">',
    '    <div class="footer-brand">',
    '      <div class="footer-logo">',
    '        <img src="https://res.cloudinary.com/dsbllwpbh/image/upload/f_auto,q_auto/uwc/unified-logo-current" alt="Unified Wire & Cable">',
    '      </div>',
    '      <p>Precision-manufactured wire and cable since 1977. Vertically integrated from copper fabrication to extrusion — DeKalb, Illinois.</p>',
    '      <div class="footer-certs">',
    '        <span class="footer-cert-tag">ISO 9001:2015</span>',
    '        <span class="footer-cert-tag">UL Listed</span>',
    '        <span class="footer-cert-tag">CSA</span>',
    '        <span class="footer-cert-tag">RoHS3</span>',
    '        <span class="footer-cert-tag">Made in USA</span>',
    '      </div>',
    '    </div>',
    '    <div class="footer-col">',
    '      <h5>Products</h5>',
    '      <a href="' + depth + 'products.html">Spec Navigator</a>',
    '      <a href="' + depth + 'products.html">Automotive Wire</a>',
    '      <a href="' + depth + 'products.html">UL Style Hook-up</a>',
    '      <a href="' + depth + 'products.html">X-Link / XLPE</a>',
    '      <a href="' + depth + 'products.html">MIL Spec Wire</a>',
    '      <a href="' + depth + 'products.html">Boat Cable</a>',
    '    </div>',
    '    <div class="footer-col">',
    '      <h5>Company</h5>',
    '      <a href="' + depth + 'about.html">About Us</a>',
    '      <a href="' + depth + 'skin-coat-technology.html">Skin Coat Technology</a>',
    '      <a href="' + depth + 'careers.html">Careers</a>',
    '      <a href="' + depth + 'contact.html">Contact</a>',
    '      <a href="' + depth + 'find-a-rep.html">Find a Rep</a>',
    '    </div>',
    '    <div class="footer-col">',
    '      <h5>Resources</h5>',
    '      <a href="' + depth + 'resources/index.html">Resources Hub</a>',
    '      <a href="' + depth + 'resources/compliance.html">Compliance Center</a>',
    '      <a href="' + depth + 'resources/tools.html">Engineering Tools</a>',
    '      <a href="' + depth + 'markets/index.html">Markets & Industries</a>',
    '    </div>',
    '  </div>',
    '  <div class="footer-bottom">',
    '    <span>© 2026 Unified Wire & Cable, Inc. &nbsp;·&nbsp; DeKalb, IL 60115 &nbsp;·&nbsp; 815-748-4876</span>',
    '    <a href="#">Privacy Policy</a>',
    '  </div>',
    '</div>'
  ].join('\n');
}

// ── Gate HTML helper ─────────────────────────────────────────
function renderGate(pageName) {
  var gate = document.getElementById('uwc-gate');
  if (!gate) return;
  gate.innerHTML = [
    '<div class="gate-card">',
    '  <div class="gate-logo">',
    '    <img src="https://res.cloudinary.com/dsbllwpbh/image/upload/f_auto,q_auto/uwc/unified-logo-current" alt="Unified Wire & Cable">',
    '  </div>',
    '  <hr class="gate-divider">',
    '  <div class="gate-eyebrow">' + (pageName || 'Authorized Access') + '</div>',
    '  <div class="gate-heading">Preview Access</div>',
    '  <p class="gate-sub">This site is currently in development. Enter your access password to continue.</p>',
    '  <form id="gate-form" autocomplete="off">',
    '    <label class="gate-label" for="gate-input">Password</label>',
    '    <input type="password" id="gate-input" class="gate-input" placeholder="Enter password" autocomplete="current-password">',
    '    <div class="gate-error" id="gate-error">Incorrect password. Please try again.</div>',
    '    <button type="submit" class="gate-btn">Enter</button>',
    '  </form>',
    '  <div class="gate-footer">Unified Wire & Cable &nbsp;·&nbsp; Internal Preview</div>',
    '</div>'
  ].join('\n');
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  var depth = window._uwcDepth || '';
  renderNav(depth);
  renderFooter(depth);
  renderGate(window._uwcPage || '');
  setActiveNav();
  initMobileNav();
  initFadeIn();
});
