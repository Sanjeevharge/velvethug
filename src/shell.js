const PAGES = {
  home: './index.html',
  mattresses: './mattresses.html',
  pillows: './pillows.html',
  cushions: './cushions.html',
  bolsters: './bolsters.html',
  accessories: './accessories.html',
  founding: './founding.html',
  account: './account.html'
};

export function currentPage() {
  return document.body.dataset.page || 'home';
}

export function injectShell() {
  const page = currentPage();
  const headerHost = document.getElementById('site-header');
  const footerHost = document.getElementById('site-footer');
  const overlayHost = document.getElementById('site-overlays');
  if (headerHost) headerHost.outerHTML = renderHeader(page);
  if (footerHost) footerHost.outerHTML = renderFooter();
  if (overlayHost) overlayHost.innerHTML = renderOverlays();
}

function navLink(page, label, current, extra = '') {
  const active = current === page ? ' active' : '';
  return `<li><a class="nav-link${active}" href="${PAGES[page]}" data-page="${page}">${label}${extra}</a></li>`;
}

function renderHeader(page) {
  return `
<div id="promoBanner" class="promo-topbar">
  <div class="promo-topbar-inner">
    <div class="promo-actions">
      <span class="promo-tag-badge" id="promoTag">DIWALI DEALS</span>
      <span id="promoMessage">Upto 30% Off — Be held this festive season</span>
    </div>
    <div class="promo-actions">
      <span style="font-size:0.78rem;color:rgba(255,255,255,0.6);">Ends in:</span>
      <span class="promo-countdown" id="promoCountdown">--h --m</span>
      <span class="promo-coupon" id="promoCoupon">DIWALI30</span>
    </div>
    <button class="promo-close-btn" id="promoCloseBt" aria-label="Close banner">✕</button>
  </div>
</div>
<header class="site-header" role="banner">
  <div class="container header-container">
    <a class="brand-logo" href="./index.html" aria-label="Velvet Hug — Home">
      <img src="./src/assets/logo.jpeg" alt="Velvet Hug" class="brand-logo-img"
           onerror="this.onerror=null;this.src='./src/assets/logo.svg'">
      <div class="logo-text-wrap">
        <span class="logo-title">Velvet Hug</span>
        <span class="logo-subtitle">Be Held, Every Night</span>
      </div>
    </a>
    <nav aria-label="Main navigation">
      <ul class="nav-links" role="list">
        ${navLink('home', 'Home', page)}
        ${navLink('mattresses', 'Mattresses', page)}
        ${navLink('pillows', 'Pillows', page)}
        ${navLink('cushions', 'Cushions', page)}
        ${navLink('bolsters', 'Bolsters', page)}
        ${navLink('accessories', 'Accessories', page)}
        ${navLink('founding', 'Founding Partners', page)}
        <li>
          <a class="nav-link" href="#" id="quizBtn">
            Sleep Quiz <span class="nav-badge-pill">New</span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="soundscape-player-bar" role="group" aria-label="Ambient soundscape">
      <span class="soundscape-label">Ambient</span>
      <button class="soundscape-btn" data-sound="rain" aria-label="Rain">Rain</button>
      <button class="soundscape-btn" data-sound="ocean" aria-label="Ocean">Ocean</button>
      <button class="soundscape-btn" data-sound="pages" aria-label="Turning pages">Pages</button>
      <button class="soundscape-btn" data-sound="humming" aria-label="Humming">Hum</button>
      <button class="soundscape-btn" data-sound="breathing" aria-label="Breathing">Breathe</button>
    </div>
    <div class="header-search-bar" id="headerSearchBar" role="search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--text-muted);flex-shrink:0;"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      <input class="header-search-input" placeholder="Search mattresses, pillows…" readonly aria-label="Search">
    </div>
    <div class="header-actions">
      <button class="action-icon-btn" id="headerSearchBtn" aria-label="Open search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      </button>
      <a class="action-icon-btn" id="accountBtn" href="./account.html" aria-label="My Account">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </a>
      <button class="action-icon-btn" id="cartBtn" aria-label="Shopping cart" style="position:relative;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span class="action-badge" id="cartBadge">0</span>
      </button>
    </div>
  </div>
</header>`;
}

function renderFooter() {
  return `
<footer class="site-footer" role="contentinfo">
  <div class="container">
    <div class="footer-top-grid">
      <div>
        <a class="brand-logo" href="./index.html" style="margin-bottom:12px;">
          <img src="./src/assets/logo.jpeg" alt="Velvet Hug Logo" style="height:36px;width:auto;"
               onerror="this.onerror=null;this.src='./src/assets/logo.svg'">
          <div>
            <div class="logo-title" style="color:#FDFBF7;font-size:1.1rem;">Velvet Hug</div>
            <div class="logo-subtitle" style="color:rgba(253,251,247,0.5);">Be Held, Every Night</div>
          </div>
        </a>
        <p style="font-size:0.82rem;color:rgba(253,251,247,0.5);line-height:1.65;max-width:220px;margin:12px 0 16px;">
          Velvet Hug — Your Sleep Partner. Sleep isn't where the day ends. It is where tomorrow begins.
        </p>
      </div>
      <div>
        <div class="footer-col-title">Shop</div>
        <ul class="footer-links-list">
          <li><a class="footer-link" href="./mattresses.html">Mattresses</a></li>
          <li><a class="footer-link" href="./pillows.html">Pillows</a></li>
          <li><a class="footer-link" href="./cushions.html">Cushions</a></li>
          <li><a class="footer-link" href="./bolsters.html">Bolsters</a></li>
          <li><a class="footer-link" href="./accessories.html">Accessories</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Support</div>
        <ul class="footer-links-list">
          <li><a class="footer-link" href="#">100-Night Trial</a></li>
          <li><a class="footer-link" href="#">Warranty</a></li>
          <li><a class="footer-link" href="./account.html">My Account</a></li>
          <li><a class="footer-link" href="./account.html#referrals">Rest Ambassador</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Company</div>
        <ul class="footer-links-list">
          <li><a class="footer-link" href="./index.html#meet">Meet Velvet Hug</a></li>
          <li><a class="footer-link" href="./founding.html">Founding Sleep Partners</a></li>
          <li><a class="footer-link" href="./index.html#stories">Buyer Stories</a></li>
        </ul>
      </div>
      <div>
        <div class="footer-col-title">Stay Updated</div>
        <p style="font-size:0.78rem;color:rgba(253,251,247,0.5);margin-bottom:12px;line-height:1.5;">Founding partner updates and closed community stories — before they go public.</p>
        <input class="form-input" placeholder="Your email address" style="font-size:0.82rem;background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.15);color:#FDFBF7;margin-bottom:8px;" id="newsletterInput">
        <button class="btn btn-gold btn-sm btn-block" type="button" id="newsletterBtn">Subscribe</button>
      </div>
    </div>
    <div class="footer-bottom-bar">
      <div>© 2026 Velvet Hug India Pvt. Ltd. All rights reserved.</div>
      <div>Master line: Velvet Hug — Your Sleep Partner. Be Held, Every Night.</div>
    </div>
  </div>
</footer>
<a href="https://wa.me/91XXXXXXXXXX?text=Hi%20Velvet%20Hug" class="whatsapp-floating-btn" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
</a>
<div id="globalToast" class="notification-toast" role="alert" aria-live="assertive"></div>`;
}

function renderOverlays() {
  return `
<div class="modal-backdrop" id="searchModal" role="dialog" aria-modal="true" aria-label="Search products">
  <div class="modal-card search-modal-card">
    <h2 style="font-family:var(--font-serif);font-size:1.1rem;color:var(--text-primary);margin-bottom:14px;">Find Your Perfect Sleep</h2>
    <div class="search-modal-input-wrap">
      <input class="search-modal-input" id="searchInput" placeholder="Ortho mattress, memory foam pillow, latex…" autocomplete="off">
      <button id="searchModalClose" aria-label="Close search">✕</button>
    </div>
    <div class="search-quick-tags">
      <span class="search-quick-tag">Ortho mattress</span>
      <span class="search-quick-tag">Memory foam pillow</span>
      <span class="search-quick-tag">Natural latex</span>
      <span class="search-quick-tag">Kids mattress</span>
    </div>
    <div class="search-results-list" id="searchResults"></div>
  </div>
</div>
<div class="modal-backdrop" id="pdpModal" role="dialog" aria-modal="true"><div class="pdp-modal-content" id="pdpContent"></div></div>
<div id="cartDrawerBackdrop" class="cart-drawer-backdrop" role="dialog" aria-modal="true">
  <div class="cart-drawer">
    <div class="cart-drawer-header">
      <div class="cart-drawer-title">Your Cart</div>
      <button class="modal-close-icon" style="position:static;" id="cartDrawerClose">✕</button>
    </div>
    <div class="cart-items-scroll" id="cartItemsScroll"></div>
    <div class="cart-drawer-footer">
      <div class="cart-totals-row"><span>Total</span><span id="cartTotal">₹0</span></div>
      <button class="btn btn-gold btn-lg btn-block" id="checkoutBtn">Proceed to Checkout →</button>
    </div>
  </div>
</div>
<div class="compare-bar-float" id="compareBar" style="display:none;">
  <span style="font-size:0.82rem;color:#FDFBF7;font-weight:600;"><span id="compareBarCount">0</span> products to compare</span>
  <button class="btn btn-gold btn-sm" id="compareBtn" onclick="if(window.openCompareModal)window.openCompareModal()">Compare Now</button>
  <button class="btn btn-outline-light btn-sm" id="clearCompareBtn" onclick="if(window.clearCompare)window.clearCompare()">Clear</button>
</div>
<div class="modal-backdrop" id="compareModalBackdrop" role="dialog" aria-modal="true">
  <div class="compare-modal-content">
    <button class="modal-close-icon" id="compareModalClose">✕</button>
    <h2 style="font-family:var(--font-serif);font-size:1.3rem;color:var(--text-primary);margin-bottom:16px;">Compare</h2>
    <div style="overflow-x:auto;"><table class="compare-table"><tbody id="compareTableBody"></tbody></table></div>
  </div>
</div>
<div class="modal-backdrop" id="quizModalBackdrop" role="dialog" aria-modal="true">
  <div class="modal-card quiz-modal-card">
    <button class="modal-close-icon" id="quizModalClose">✕</button>
    <div style="font-family:var(--font-serif);font-size:1.1rem;font-weight:700;color:var(--text-primary);margin-bottom:16px;">Find Your Hug</div>
    <div id="quizContent"></div>
  </div>
</div>
<div class="modal-backdrop" id="doctorModalBackdrop" role="dialog" aria-modal="true">
  <div class="modal-card" style="max-width:480px;width:100%;" id="doctorModalContent"></div>
</div>
<div class="modal-backdrop" id="checkoutModalBackdrop" role="dialog" aria-modal="true">
  <div class="checkout-modal-content" id="checkoutContent">
    <button class="modal-close-icon" id="checkoutModalClose">✕</button>
  </div>
</div>
<div class="modal-backdrop" id="loginModal" role="dialog" aria-modal="true">
  <div class="modal-card" style="max-width:420px;width:100%;">
    <button class="modal-close-icon" id="loginModalClose">✕</button>
    <h2 style="font-family:var(--font-serif);font-size:1.3rem;color:var(--text-primary);margin-bottom:6px;">Welcome back, Sleep Partner.</h2>
    <p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:20px;">Sign in to see your badges, certificate, and Rest Ambassador referrals.</p>
    <div style="margin-bottom:12px;"><label class="form-label">Email</label><input class="form-input" type="email" value="kavitha@example.com"></div>
    <div style="margin-bottom:18px;"><label class="form-label">Password</label><input class="form-input" type="password" value="demo"></div>
    <button class="btn btn-primary btn-lg btn-block" id="demoLoginBtn">Sign In as Founding Partner #212</button>
  </div>
</div>`;
}

export { PAGES };
