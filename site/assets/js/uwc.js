/* UWC Shared JS — navigation, footer, scroll animations */

// ── Active nav link ──────────────────────────────────────────
function setActiveNav() {
  var path = window.location.pathname;
  document.querySelectorAll('#site-nav .nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    // Normalize the href to a root-relative path: drop any leading ./ or ../
    // segments and any query/hash. Match on a full slash-bounded suffix so
    // e.g. markets/index.html doesn't match resources/index.html.
    var clean = href.replace(/^(\.\.?\/)+/, '').replace(/[?#].*$/, '');
    if (clean && path.endsWith('/' + clean)) {
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
    '      <a href="' + depth + 'markets/index.html">Markets</a>',
    '    </div>',
    '    <div class="nav-item" data-nav-item="resources">',
    '      <button type="button" class="nav-item-trigger" aria-haspopup="true" aria-expanded="false">Resources ' + chevron + '</button>',
    '      <div class="nav-menu" role="menu">',
    '        <a href="' + depth + 'resources/index.html">Resources Hub</a>',
    '        <div class="nav-menu-divider"></div>',
    // Spec Navigator intentionally omitted — products.html is password-gated
    // while the selector is being rebuilt. Re-add here when it goes public.
    '        <a href="' + depth + 'resources/compliance.html">Compliance Center</a>',
    '        <a href="' + depth + 'resources/tools.html">Engineering Tools</a>',
    '        <a href="' + depth + 'find-a-rep.html">Find a Sales Rep</a>',
    '      </div>',
    '    </div>',
    '    <a href="' + depth + 'about.html">About</a>',
    '    <a href="' + depth + 'careers.html">Careers</a>',
    '  </nav>',
    '  <div class="nav-actions">',
    '    <a href="' + depth + 'search.html" class="nav-search-btn" aria-label="Search">',
    '      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    '    </a>',
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
    '</div>',
    renderInternalPagesWidget(depth)
  ].join('\n');
  initInternalPagesWidget();
}

// ── Internal Pages widget ────────────────────────────────────
function renderInternalPagesWidget(basePath) {
  basePath = basePath || '';
  var items = [
    { href: 'status.html',               label: 'Status',
      svg: '<line x1="6" y1="20" x2="6" y2="13"/><line x1="12" y1="20" x2="12" y2="8"/><line x1="18" y1="20" x2="18" y2="16"/>' },
    { href: 'update-plan-18may2026.html', label: 'Update Plan',
      svg: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' },
    { href: 'brand-guide.html',          label: 'Brand Guide',
      svg: '<circle cx="13.5" cy="6.5" r=".75"/><circle cx="17.5" cy="10.5" r=".75"/><circle cx="8.5" cy="7.5" r=".75"/><circle cx="6.5" cy="12.5" r=".75"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.74 1.5-1.66 0-.44-.17-.83-.43-1.13-.27-.31-.42-.7-.42-1.13 0-.92.74-1.66 1.66-1.66H16c3.31 0 6-2.69 6-6 0-5.5-4.5-10-10-10z"/>' },
    { href: 'spec-navigator.html',       label: 'Spec Navigator',
      svg: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>' },
    { href: 'spec-navigator-data-plan.html', label: 'Data Plan',
      svg: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>' },
    { href: '0-spec-sheets-for-print/',  label: 'Print Suite',
      svg: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>' },
    { href: 'USA250.html',               label: 'America 250',
      svg: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>' },
    { href: 'tradeshow-banners-v2.html', label: 'Tradeshow Banners',
      svg: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>' },
    { href: 'truck-wrap.html',           label: 'Truck Wrap',
      svg: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>' },
    { href: 'airpod-giveaway/index.html', label: 'AirPod Giveaway',
      svg: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-7h3z"/><path d="M3 19a2 2 0 0 0 2 2h1v-7H3z"/>' },
    { href: 'search.html',               label: 'Search',
      svg: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' }
  ];
  var links = items.map(function (it) {
    return '<a href="' + basePath + it.href + '" role="menuitem">' +
           '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + it.svg + '</svg>' +
           it.label +
           '</a>';
  }).join('');
  return [
    '<div class="uwc-ipw" id="uwc-ipw">',
    '  <button type="button" class="uwc-ipw-btn" id="uwc-ipw-btn" aria-label="Internal pages" aria-expanded="false">A</button>',
    '  <div class="uwc-ipw-pop" id="uwc-ipw-pop" role="menu" aria-hidden="true">',
    '    <div class="uwc-ipw-eyebrow">Internal Pages</div>',
    links,
    '  </div>',
    '</div>'
  ].join('\n');
}

function initInternalPagesWidget() {
  var btn = document.getElementById('uwc-ipw-btn');
  var pop = document.getElementById('uwc-ipw-pop');
  if (!btn || !pop) return;
  function close() {
    pop.classList.remove('open');
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    pop.setAttribute('aria-hidden', 'true');
  }
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var open = !pop.classList.contains('open');
    pop.classList.toggle('open', open);
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', String(open));
    pop.setAttribute('aria-hidden', String(!open));
  });
  document.addEventListener('click', function (e) {
    if (!pop.contains(e.target) && !btn.contains(e.target)) close();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
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
