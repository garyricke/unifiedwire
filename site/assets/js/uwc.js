/* UWC Shared JS — navigation, footer, scroll animations */

// ── Active nav link ──────────────────────────────────────────
function setActiveNav() {
  var path = window.location.pathname;
  document.querySelectorAll('#site-nav .nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href && path.endsWith(href.replace(/^.*\//, ''))) {
      a.classList.add('active');
      // Mark parent dropdown trigger as active too
      var parentItem = a.closest('.nav-item');
      if (parentItem) parentItem.classList.add('nav-item--active');
    }
  });
  // Section-level: any /markets/* page → mark Markets active; same for resources
  if (/\/markets\//.test(path)) {
    var m = document.querySelector('#site-nav .nav-item[data-nav-item="markets"]');
    if (m) m.classList.add('nav-item--active');
  }
  if (/\/resources\//.test(path)) {
    var r = document.querySelector('#site-nav .nav-item[data-nav-item="resources"]');
    if (r) r.classList.add('nav-item--active');
  }
}

// ── Mobile hamburger ─────────────────────────────────────────
function initMobileNav() {
  var btn   = document.getElementById('nav-hamburger');
  var links = document.getElementById('nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    if (!open) {
      // collapse any accordion sections when drawer closes
      links.querySelectorAll('.nav-item--open').forEach(function (it) {
        it.classList.remove('nav-item--open');
        var t = it.querySelector('.nav-item-trigger');
        if (t) t.setAttribute('aria-expanded', false);
      });
    }
  });
  // Mobile-only: clicking a dropdown trigger toggles the accordion section
  links.querySelectorAll('.nav-item-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      // Only intercept when the mobile drawer is open (desktop uses hover)
      if (!links.classList.contains('open')) return;
      e.stopPropagation();
      var item = trigger.closest('.nav-item');
      var isOpen = item.classList.toggle('nav-item--open');
      trigger.setAttribute('aria-expanded', isOpen);
    });
  });
  // close drawer on outside click
  document.addEventListener('click', function (e) {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
      links.querySelectorAll('.nav-item--open').forEach(function (it) {
        it.classList.remove('nav-item--open');
      });
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
  var chevron = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
  nav.innerHTML = [
    '<div class="nav-inner">',
    '  <a class="nav-logo" href="' + depth + 'home.html">',
    '    <img src="https://res.cloudinary.com/dsbllwpbh/image/upload/f_auto,q_auto/uwc/unified-logo-current" alt="Unified Wire & Cable">',
    '  </a>',
    '  <nav class="nav-links" id="nav-links" role="navigation" aria-label="Main">',
    '    <a href="' + depth + 'spec-sheets.html">Products</a>',
    '    <div class="nav-item" data-nav-item="markets">',
    '      <button type="button" class="nav-item-trigger" aria-haspopup="true" aria-expanded="false">Markets ' + chevron + '</button>',
    '      <div class="nav-menu" role="menu">',
    '        <a href="' + depth + 'markets/index.html">All Markets</a>',
    '        <div class="nav-menu-divider"></div>',
    '        <a href="' + depth + 'markets/appliance.html">Appliance</a>',
    '        <a href="' + depth + 'markets/automotive.html">Automotive</a>',
    '        <a href="' + depth + 'markets/marine.html">Marine</a>',
    '        <a href="' + depth + 'markets/rv.html">Recreational Vehicle</a>',
    '        <a href="' + depth + 'markets/electronics-oem.html">Electronics &amp; OEM</a>',
    '        <a href="' + depth + 'markets/military.html">Military</a>',
    '        <a href="' + depth + 'markets/distribution.html">Distribution</a>',
    '      </div>',
    '    </div>',
    '    <div class="nav-item" data-nav-item="resources">',
    '      <button type="button" class="nav-item-trigger" aria-haspopup="true" aria-expanded="false">Resources ' + chevron + '</button>',
    '      <div class="nav-menu" role="menu">',
    '        <a href="' + depth + 'resources/index.html">Resources Hub</a>',
    '        <div class="nav-menu-divider"></div>',
    '        <a href="' + depth + 'resources/compliance.html">Compliance Center</a>',
    '        <a href="' + depth + 'resources/tools.html">Engineering Tools</a>',
    '      </div>',
    '    </div>',
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
    '      <a href="' + depth + 'spec-sheets.html">All Spec Sheets</a>',
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
    '    <a href="' + depth + 'privacy-policy.html">Privacy Policy</a>',
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

// ── See Also: mini product navigator ─────────────────────────
var UWC_SPEC_SHEETS = [
  { slug: '1007',              name: 'UL 1007',           sub: 'Bare/Tin Copper',     img: 'assets/img/cables/wire-ul1007-1569.png' },
  { slug: '1015',              name: 'UL 1015',           sub: 'Bare/Tin 600V',       img: 'assets/img/cables/wire-mtw-1015.png' },
  { slug: 'gpt',               name: 'GPT',               sub: 'Bare Copper',         img: 'assets/img/cables/wire-auto-primary.png' },
  { slug: 'gptm',              name: 'GPTM',              sub: 'Marine Primary',      img: 'assets/img/cables/wire-gptm-marine.png' },
  { slug: 'gxl',               name: 'GXL',               sub: 'Bare Copper',         img: 'assets/img/cables/wire-sgx.png' },
  { slug: 'tfn-tffn',          name: 'TFN / TFFN',        sub: 'Fixture Wire',        img: 'assets/img/cables/wire-tfn-tffn-solid.png' },
  { slug: 'thhn-mtw-thwn-2',   name: 'THHN / THWN-2',     sub: 'Building Wire',       img: 'assets/img/cables/wire-thhn-thwn.png' },
  { slug: 'xhhw-sis',          name: 'XHHW-2 / SIS',      sub: 'Building Wire',       img: 'assets/img/cables/wire-xhhw2.png' },
  { slug: 'sjtoow',            name: 'SJTOOW',            sub: 'Portable Cord',       img: 'assets/img/cables/wire-soow.png' },
  { slug: 'mv-15kv-cu',        name: 'CU 15kV',           sub: 'MV Power Cable',      img: 'assets/img/cables/wire-mv-15kv.png' },
  { slug: 'mv-15kv-al',        name: 'AL 15kV',           sub: 'MV Power Cable',      img: 'assets/img/cables/wire-mv-15kv.png' },
  { slug: 'mv-25kv-al',        name: 'AL 25kV',           sub: 'MV Power Cable',      img: 'assets/img/cables/wire-mv-25kv-cu.png' },
  { slug: 'mv-35kv-al',        name: 'AL 35kV',           sub: 'MV Power Cable',      img: 'assets/img/cables/wire-mv-35kv-al.png' }
];

function getCurrentSpecSlug() {
  var m = (location.pathname || '').match(/spec-sheet-(.+?)\.html/);
  return m ? m[1] : null;
}

function renderSeeAlso(depth) {
  depth = depth || '';
  var host = document.getElementById('see-also-grid');
  if (!host) return;
  var current = getCurrentSpecSlug();
  var html = '';
  UWC_SPEC_SHEETS.forEach(function (p) {
    if (p.slug === current) return;
    html += '<a class="see-also-card" href="' + depth + 'spec-sheet-' + p.slug + '.html">' +
            '<img src="' + depth + p.img + '" alt="' + p.name + '" loading="lazy">' +
            '<div class="sa-name">' + p.name + '</div>' +
            '<div class="sa-sub">' + p.sub + '</div>' +
            '</a>';
  });
  host.innerHTML = html;
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
  renderSeeAlso(depth);
});
