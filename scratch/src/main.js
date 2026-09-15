// src/main.js — Velvet Hug Complete Application
// Multi-page SPA with router, cart, compare, checkout, payment gateway, quiz, soundscape, founding partner counter, OTP/Google auth, and customer account hub

import {
  PRODUCTS, CATEGORIES, FILTER_AXES, SLEEP_QUIZ, DOCTORS,
  MOCK_FOUNDING_PARTNERS, INITIAL_PARTNER_COUNT, FOUNDING_PARTNER_LIMIT,
  ACTIVE_PROMOS, MATTRESS_LAYERS, FABRIC_FEATURES,
  getProductsByCategory, searchProducts, formatPrice, getProductById
} from './data/products.js';

import { soundEngine } from './components/Soundscape.js';

// ────────────────────────────────────────────────────────────
// PERSISTENT STATE & STORAGE HELPERS
// ────────────────────────────────────────────────────────────
const STORAGE_KEY_USER = 'vh_user_data';
const STORAGE_KEY_CART = 'vh_cart_data';
const STORAGE_KEY_FOUNDING = 'vh_founding_count';

function loadStoredUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_USER);
    if (data) return JSON.parse(data);
  } catch (e) {}
  return null;
}

function saveStoredUser(user) {
  try {
    if (user) localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY_USER);
  } catch (e) {}
}

function loadStoredCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CART);
    if (data) return JSON.parse(data);
  } catch (e) {}
  return [];
}

function saveStoredCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart || []));
  } catch (e) {}
}

function getStoredFoundingCount() {
  try {
    const val = localStorage.getItem(STORAGE_KEY_FOUNDING);
    if (val) return parseInt(val, 10);
  } catch (e) {}
  return INITIAL_PARTNER_COUNT;
}

function setStoredFoundingCount(count) {
  try {
    localStorage.setItem(STORAGE_KEY_FOUNDING, count.toString());
  } catch (e) {}
}

// ────────────────────────────────────────────────────────────
// APP STATE
// ────────────────────────────────────────────────────────────
const state = {
  currentPage: 'home',
  cart: loadStoredCart(),
  compareList: [],
  filters: { size: [], material: [], firmness: [], tier: [], ageGroup: [], packaging: [] },
  activeCategory: 'mattresses',
  activeAccSubTab: 'All',
  foundingCount: getStoredFoundingCount(),
  promoIndex: 0,
  quizAnswers: {},
  quizStep: 0,
  user: loadStoredUser(),
  searchQuery: '',
  pdpProduct: null,
  checkoutStep: 'details', // details | payment | success
  paymentMethod: 'upi', // upi | card | netbanking | cod
  activeAccountTab: 'overview', // overview | orders | referrals | addresses | wishlist
  appliedCoupon: null,
  simulatedOtp: '4821',
  otpTimerSecs: 45
};

// ────────────────────────────────────────────────────────────
// HELPERS
// ────────────────────────────────────────────────────────────
function qs(sel, ctx = document) { return ctx.querySelector(sel); }
function qsa(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

// Size pricing multipliers relative to base (Double/Queen)
function getSizeMultiplier(size) {
  const multipliers = {
    'Single':     0.65,
    'Twin':       0.70,
    'Double':     0.85,
    'Queen':      1.00,
    'XL Queen':   1.08,
    'Super Queen': 1.15,
    'King':       1.22,
    'Super King': 1.35,
    'Kids':       0.60,
    'Bunk':       0.72,
    'Guest room': 0.80,
    'Standard':   1.00
  };
  return multipliers[size] ?? 1.0;
}

function toast(msg, dur = 2800) {
  const t = qs('#globalToast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(state._toastTimer);
  state._toastTimer = setTimeout(() => t.classList.remove('show'), dur);
}

function navigateTo(page, pushHistory = true) {
  if (!page) page = 'home';
  
  // Prevent duplicate navigation pushes
  if (pushHistory && page === state.currentPage) {
    return;
  }
  
  state.currentPage = page;

  // Push to browser history cleanly (1 single state entry per click)
  if (pushHistory) {
    history.pushState({ page }, '', page === 'home' ? '#' : `#${page}`);
  }

  // Hide all views and show target view
  qsa('.page-view').forEach(v => {
    v.classList.remove('active');
    v.style.display = 'none';
  });

  const targetView = qs(`#view-${page}`);
  if (targetView) {
    targetView.classList.add('active');
    targetView.style.display = 'block';
  } else {
    const homeView = qs('#view-home');
    if (homeView) {
      homeView.classList.add('active');
      homeView.style.display = 'block';
    }
  }

  // If navigating to a category page, render its contents
  if (['mattresses', 'pillows', 'cushions', 'bolsters', 'accessories'].includes(page)) {
    state.activeCategory = page;
    renderCategoryPage(page);
  }

  // If navigating to account page, render it
  if (page === 'account') {
    renderAccountPage();
  }

  // Update nav active state
  qsa('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Single handler for browser Back/Forward navigation
window.addEventListener('popstate', e => {
  const page = e.state?.page || window.location.hash.replace('#', '') || 'home';
  navigateTo(page, false);
});

window.navigateTo = navigateTo;
window.goToPage = navigateTo;

// ────────────────────────────────────────────────────────────
// PROMO BANNER
// ────────────────────────────────────────────────────────────
let countdownInterval = null;
function startCountdown(targetDate, el) {
  if (countdownInterval) clearInterval(countdownInterval);
  function tick() {
    const diff = targetDate - Date.now();
    if (diff <= 0) { el.textContent = 'Expired'; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.textContent = d > 0 ? `${d}d ${h}h ${m}m` : `${h}h ${m}m ${s}s`;
  }
  tick();
  countdownInterval = setInterval(tick, 1000);
}

function initPromoBanner() {
  const banner = qs('#promoBanner');
  if (!banner || !ACTIVE_PROMOS.length) return;

  let promoIdx = 0;
  function updatePromo() {
    const promo = ACTIVE_PROMOS[promoIdx];
    const msgEl = qs('#promoMessage', banner);
    const tagEl = qs('#promoTag', banner);
    const couponEl = qs('#promoCoupon', banner);
    const countEl = qs('#promoCountdown', banner);
    if (msgEl) msgEl.textContent = promo.message;
    if (tagEl) tagEl.textContent = promo.tag;
    if (couponEl) couponEl.textContent = promo.coupon;
    if (promo.endsAt && countEl) startCountdown(promo.endsAt, countEl);
    else if (countEl) countEl.textContent = '';
  }
  updatePromo();
  setInterval(() => {
    promoIdx = (promoIdx + 1) % ACTIVE_PROMOS.length;
    updatePromo();
  }, 6000);

  qs('#promoCoupon', banner)?.addEventListener('click', () => {
    navigator.clipboard?.writeText(ACTIVE_PROMOS[promoIdx]?.coupon || '').catch(() => {});
    toast('🎉 Coupon code copied!');
  });
  qs('#promoCloseBt')?.addEventListener('click', () => { banner.style.display = 'none'; });
}

// ────────────────────────────────────────────────────────────
// FOUNDING PARTNER COUNTER
// ────────────────────────────────────────────────────────────
function initFoundingCounter() {
  const counterEl = qs('#foundingCounterNum');
  const fillEl = qs('#foundingProgressFill');
  const labelEl = qs('#foundingCounterLabel');
  if (!counterEl) return;

  function update(count) {
    state.foundingCount = Math.min(count, FOUNDING_PARTNER_LIMIT);
    setStoredFoundingCount(state.foundingCount);
    if (counterEl) counterEl.textContent = state.foundingCount.toLocaleString('en-IN');
    const pct = Math.round((state.foundingCount / FOUNDING_PARTNER_LIMIT) * 100);
    if (fillEl) fillEl.style.width = pct + '%';
    if (labelEl) {
      if (state.foundingCount >= FOUNDING_PARTNER_LIMIT) {
        labelEl.textContent = 'Site is now welcoming Sleep Partners';
      } else {
        const remaining = FOUNDING_PARTNER_LIMIT - state.foundingCount;
        labelEl.textContent = `${remaining} Founding spots remaining of 1,000`;
      }
    }
  }
  update(state.foundingCount);

  // Simulated live increment
  function liveIncrement() {
    if (state.foundingCount >= FOUNDING_PARTNER_LIMIT) return;
    const interval = 25000 + Math.random() * 40000;
    setTimeout(() => {
      update(state.foundingCount + 1);
      liveIncrement();
    }, interval);
  }
  liveIncrement();
}

// ────────────────────────────────────────────────────────────
// NAVIGATION & ROUTING
// ────────────────────────────────────────────────────────────
function initNavigation() {
  document.addEventListener('click', e => {
    const pageEl = e.target.closest('[data-page]');
    if (pageEl) {
      e.preventDefault();
      const page = pageEl.dataset.page;
      if (page) navigateTo(page);
      return;
    }

    const catCard = e.target.closest('[data-navigate-category]');
    if (catCard) {
      e.preventDefault();
      const cat = catCard.dataset.navigateCategory;
      if (cat) {
        resetFilters();
        navigateTo(cat);
      }
      return;
    }

    const logo = e.target.closest('.brand-logo');
    if (logo) {
      e.preventDefault();
      navigateTo('home');
      return;
    }
  });
}

// ────────────────────────────────────────────────────────────
// SOUNDSCAPE PLAYER
// ────────────────────────────────────────────────────────────
function initSoundscape() {
  document.addEventListener('click', async e => {
    const btn = e.target.closest('[data-sound]');
    if (!btn) return;
    const preset = btn.dataset.sound;
    const isPlaying = await soundEngine.play(preset);

    qsa('[data-sound]').forEach(b => {
      if (b.dataset.sound === preset) {
        b.classList.toggle('active', isPlaying);
      } else {
        b.classList.remove('active');
      }
    });

    if (isPlaying) {
      toast(`🎵 Ambient sound: ${preset.toUpperCase()} playing`);
    } else {
      toast('🔇 Ambient sound paused');
    }
  });
}

// ────────────────────────────────────────────────────────────
// SEARCH MODAL
// ────────────────────────────────────────────────────────────
function initSearch() {
  const searchModal = qs('#searchModal');
  const searchInput = qs('#searchInput');
  const searchResults = qs('#searchResults');

  qs('#headerSearchBtn')?.addEventListener('click', () => {
    searchModal?.classList.add('active');
    setTimeout(() => searchInput?.focus(), 100);
  });
  qs('#searchModalClose')?.addEventListener('click', () => {
    searchModal?.classList.remove('active');
  });
  searchModal?.addEventListener('click', e => {
    if (e.target === searchModal) searchModal.classList.remove('active');
  });

  searchInput?.addEventListener('input', e => {
    const query = e.target.value.trim();
    if (!query) {
      if (searchResults) searchResults.innerHTML = '';
      return;
    }
    const results = searchProducts(query);
    renderSearchResults(results, searchResults);
  });

  qsa('.search-quick-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = tag.textContent.trim();
        const results = searchProducts(searchInput.value);
        renderSearchResults(results, searchResults);
      }
    });
  });
}

function renderSearchResults(results, container) {
  if (!container) return;
  if (!results.length) {
    container.innerHTML = '<div style="padding:24px;text-align:center;color:var(--text-muted);">No products found matching your search.</div>';
    return;
  }
  container.innerHTML = results.map(p => `
    <div class="search-result-item" onclick="openPDP(getProductById('${p.id}'));document.getElementById('searchModal').classList.remove('active');">
      <img src="${p.image}" alt="${p.name}" class="search-result-img" onerror="this.style.display='none'">
      <div style="flex:1;">
        <div style="font-family:var(--font-serif);font-weight:600;color:var(--midnight-blue);">${p.name}</div>
        <div style="font-size:0.75rem;color:var(--text-muted);">${p.collection || ''} · ${p.category}</div>
        <div style="font-size:0.84rem;font-weight:700;color:var(--midnight-blue);margin-top:2px;">${formatPrice(p.basePrice)} <span style="text-decoration:line-through;color:var(--text-muted);font-weight:400;font-size:0.76rem;">${formatPrice(p.mrp)}</span></div>
      </div>
      <span class="badge badge-founding" style="font-size:0.65rem;">View</span>
    </div>
  `).join('');
}

// ────────────────────────────────────────────────────────────
// CART MANAGEMENT
// ────────────────────────────────────────────────────────────
function initCart() {
  updateCartBadge();
  qs('#cartBtn')?.addEventListener('click', openCart);
  qs('#cartDrawerClose')?.addEventListener('click', closeCart);
  qs('#cartDrawerBackdrop')?.addEventListener('click', e => {
    if (e.target === qs('#cartDrawerBackdrop')) closeCart();
  });
  qs('#checkoutBtn')?.addEventListener('click', () => {
    if (state.cart.length === 0) {
      toast('Your cart is empty. Please add items to proceed.');
      return;
    }
    openCheckout();
  });
}

function openCart() {
  renderCart();
  const el = qs('#cartDrawerBackdrop');
  if (el) {
    el.classList.add('active', 'open');
  }
}

function closeCart() {
  const el = qs('#cartDrawerBackdrop');
  if (el) {
    el.classList.remove('active', 'open');
  }
}

function addToCart(productId, size = 'Standard', qty = 1, overridePrice = null) {
  const product = getProductById(productId);
  if (!product) return;

  // Use size multiplier for price if no override given
  const effectivePrice = overridePrice !== null
    ? overridePrice
    : Math.round(product.basePrice * getSizeMultiplier(size));

  const existingIndex = state.cart.findIndex(i => i.product.id === productId && i.size === size);
  if (existingIndex > -1) {
    state.cart[existingIndex].qty += qty;
  } else {
    state.cart.push({ product, size, qty, price: effectivePrice });
  }

  saveStoredCart(state.cart);
  updateCartBadge();
  toast(`✓ Added "${product.name}" (${size}) to cart!`);
  openCart();
}

function removeFromCart(index) {
  state.cart.splice(index, 1);
  saveStoredCart(state.cart);
  updateCartBadge();
  renderCart();
}

function updateCartQty(index, delta) {
  state.cart[index].qty += delta;
  if (state.cart[index].qty <= 0) {
    removeFromCart(index);
  } else {
    saveStoredCart(state.cart);
    renderCart();
    updateCartBadge();
  }
}

function updateCartBadge() {
  const totalItems = state.cart.reduce((sum, i) => sum + i.qty, 0);
  const badge = qs('#cartBadge');
  if (badge) badge.textContent = totalItems;
}

function getCartTotal() {
  return state.cart.reduce((sum, i) => sum + ((i.price ?? i.product.basePrice) * i.qty), 0);
}

function renderCart() {
  const container = qs('#cartItemsScroll');
  const totalEl = qs('#cartTotal');
  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div style="padding:48px 24px;text-align:center;color:var(--text-muted);">
        <div style="font-size:3rem;margin-bottom:12px;">🛒</div>
        <div style="font-family:var(--font-serif);font-size:1.1rem;color:var(--midnight-blue);margin-bottom:6px;">Your cart is empty</div>
        <p style="font-size:0.84rem;margin-bottom:16px;">Explore our handcrafted mattresses & pillows.</p>
        <button class="btn btn-primary btn-sm" onclick="closeCart();goToPage('mattresses')">Shop Mattresses</button>
      </div>`;
    if (totalEl) totalEl.textContent = '₹0';
    return;
  }

  container.innerHTML = state.cart.map((item, idx) => `
    <div class="cart-item-row">
      <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-thumb" onerror="this.style.display='none'">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.product.name}</div>
        <div class="cart-item-meta">${item.size} · ${formatPrice(item.price ?? item.product.basePrice)}</div>
        <div class="cart-item-actions">
          <div class="cart-qty-ctrl">
            <button class="qty-btn" onclick="updateCartQty(${idx}, -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty(${idx}, 1)">+</button>
          </div>
          <button class="remove-cart-item-btn" onclick="removeFromCart(${idx})">Remove</button>
        </div>
      </div>
      <div style="font-weight:700;font-size:0.95rem;color:var(--midnight-blue);">
        ${formatPrice((item.price ?? item.product.basePrice) * item.qty)}
      </div>
    </div>
  `).join('');

  if (totalEl) totalEl.textContent = formatPrice(getCartTotal());
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQty = updateCartQty;
window.closeCart = closeCart;
window.openCart = openCart;

// Update displayed price on card when size dropdown changes
window.updateCardPrice = function(selectEl, basePrice, mrp) {
  const size = selectEl.value;
  const mult = getSizeMultiplier(size);
  const card = selectEl.closest('[data-product-id]');
  if (!card) return;
  const priceEl = card.querySelector('.card-size-price');
  const mrpEl   = card.querySelector('.card-size-mrp');
  if (priceEl) priceEl.textContent = formatPrice(Math.round(basePrice * mult));
  if (mrpEl)   mrpEl.textContent   = formatPrice(Math.round(mrp * mult));
};


// ────────────────────────────────────────────────────────────
// COMPARE TOOL
// ────────────────────────────────────────────────────────────
function initCompare() {
  qs('#compareBtn')?.addEventListener('click', openCompareModal);
  qs('#compareModalClose')?.addEventListener('click', closeCompareModal);
  qs('#compareModalBackdrop')?.addEventListener('click', e => {
    if (e.target === qs('#compareModalBackdrop')) closeCompareModal();
  });
  qs('#clearCompareBtn')?.addEventListener('click', clearCompare);
}

function toggleCompare(productId) {
  const idx = state.compareList.indexOf(productId);
  if (idx > -1) {
    state.compareList.splice(idx, 1);
  } else {
    if (state.compareList.length >= 3) {
      toast('You can compare up to 3 products at a time');
      return;
    }
    state.compareList.push(productId);
  }
  updateCompareBar();
}

function updateCompareBar() {
  const bar = qs('#compareBar');
  const count = qs('#compareBarCount');
  if (!bar) return;
  const isVisible = state.compareList && state.compareList.length > 0;
  if (isVisible) {
    bar.classList.add('visible');
    bar.style.display = 'flex';
  } else {
    bar.classList.remove('visible');
    bar.style.display = 'none';
  }
  if (count) count.textContent = state.compareList ? state.compareList.length : 0;
  qsa('.compare-checkbox').forEach(cb => {
    cb.checked = state.compareList && state.compareList.includes(cb.dataset.productId);
  });
}

function clearCompare() {
  state.compareList = [];
  updateCompareBar();
  closeCompareModal();
}

function openCompareModal() {
  if (!state.compareList.length) { toast('Select products to compare first'); return; }
  renderCompareTable();
  qs('#compareModalBackdrop')?.classList.add('active');
}

function closeCompareModal() {
  qs('#compareModalBackdrop')?.classList.remove('active');
}

function renderCompareTable() {
  const products = state.compareList.map(id => getProductById(id)).filter(Boolean);
  const tableEl = qs('#compareTableBody');
  if (!tableEl || !products.length) return;

  const rows = [
    ['Product', p => `<strong style="font-family:var(--font-serif);font-size:1.05rem;">${p.name}</strong><br><span style="color:var(--text-muted);font-size:0.75rem;">${p.collection || ''}</span>`],
    ['Price', p => `<strong style="color:var(--midnight-blue);">${formatPrice(p.basePrice)}</strong> <span style="text-decoration:line-through;color:var(--text-muted);font-size:0.75rem;">${formatPrice(p.mrp)}</span>`],
    ['Firmness', p => `${p.firmness || 'Medium'} (${p.firmnessScore ? p.firmnessScore + '/8' : '—'})`],
    ['Height', p => p.height ? `${p.height} cm` : '—'],
    ['Materials', p => (p.materials || []).join(', ')],
    ['Doctor Approved', p => p.doctorRecommended ? '✅ Yes (Physio Validated)' : 'Standard Comfort'],
    ['Trial & Warranty', p => `${p.trialDays || 100} Nights · ${p.warranty || '10 Years'}`],
    ['Action', p => `<button class="btn btn-primary btn-sm" onclick="closeCompareModal();openPDP(getProductById('${p.id}'))">View Details</button>`]
  ];

  tableEl.innerHTML = rows.map(([label, getter]) => `
    <tr>
      <th>${label}</th>
      ${products.map(p => `<td>${getter(p)}</td>`).join('')}
    </tr>
  `).join('');
}

window.toggleCompare = toggleCompare;
window.clearCompare = clearCompare;
window.openCompareModal = openCompareModal;
window.closeCompareModal = closeCompareModal;

// ────────────────────────────────────────────────────────────
// PRODUCT DETAIL MODAL (PDP)
// ────────────────────────────────────────────────────────────
function openPDP(product) {
  if (!product) return;
  state.pdpProduct = product;
  renderPDP(product);
  qs('#pdpModal')?.classList.add('active');
}

function closePDP() {
  qs('#pdpModal')?.classList.remove('active');
  state.pdpProduct = null;
}

window.openPDP = openPDP;
window.closePDP = closePDP;

function renderPDP(product) {
  const el = qs('#pdpContent');
  if (!el) return;

  const discountedAmt = product.mrp - product.basePrice;

  el.innerHTML = `
    <button class="modal-close-icon" onclick="closePDP()">✕</button>
    
    <!-- Left: Media & Anatomy -->
    <div>
      <div class="pdp-gallery-main">
        <img src="${product.image || ''}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;"
             onerror="this.parentElement.innerHTML='<div style=\\'height:300px;display:flex;align-items:center;justify-content:center;background:var(--bg-secondary);font-size:4rem;\\'>🛏️</div>'">
      </div>
      
      <div style="margin-top:20px;">
        <div style="font-family:var(--font-serif);font-size:0.95rem;font-weight:700;color:var(--text-primary);margin-bottom:10px;">The 5 Precision Layers</div>
        ${(product.layers || MATTRESS_LAYERS).map(l => `
          <div style="display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid rgba(76,63,94,0.08);">
            <div style="width:26px;height:26px;border-radius:50%;background:var(--champagne-gold-light);border:1px solid var(--champagne-gold-border);display:flex;align-items:center;justify-content:center;font-family:var(--font-serif);font-size:0.75rem;font-weight:700;color:var(--champagne-gold);flex-shrink:0;">${l.num}</div>
            <div>
              <div style="font-family:var(--font-serif);font-size:0.88rem;font-weight:600;color:var(--text-primary);">${l.humanName} <span style="font-size:0.74rem;font-weight:400;color:var(--text-muted);">· ${l.spec}</span></div>
              <div style="font-size:0.78rem;color:var(--text-secondary);">${l.description || l.material}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    
    <!-- Right: Purchase Config -->
    <div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
        <span class="badge ${getBadgeClass(product.badge)}">${product.badgeLabel || ''}</span>
        ${product.doctorRecommended ? '<span class="badge badge-new">🩺 Doctor Recommended</span>' : ''}
      </div>
      <h2 style="font-family:var(--font-serif);font-size:1.7rem;font-weight:700;color:var(--text-primary);margin-bottom:4px;">${product.name}</h2>
      <p style="font-family:var(--font-serif);font-style:italic;color:var(--text-secondary);margin-bottom:14px;">"${product.tagline}"</p>
      
      <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:14px;margin-bottom:16px;">
        <div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;">
          <span style="font-size:1.7rem;font-weight:800;color:var(--text-primary);" id="pdpCurrentPrice">${formatPrice(product.basePrice)}</span>
          <span style="color:var(--text-muted);text-decoration:line-through;font-size:1rem;" id="pdpMrpPrice">${formatPrice(product.mrp)}</span>
          <span style="color:var(--accent-emerald);font-weight:700;font-size:0.86rem;" id="pdpSaveText">Save ${formatPrice(discountedAmt)} (${product.discount}% off)</span>
        </div>
        ${product.emi ? `<div style="font-size:0.78rem;color:var(--text-muted);margin-top:4px;" id="pdpEmiText">No-cost EMI starting from ${product.emi}</div>` : ''}
      </div>
      
      <!-- Size Selector -->
      <div style="margin-bottom:16px;">
        <label class="form-label">Select Size</label>
        <div style="display:flex;flex-wrap:wrap;gap:8px;" id="pdpSizeChips">
          ${(product.sizes || ['Standard']).map((s, i) => `
            <button class="pdp-chip-btn ${i === 0 ? 'active' : ''}" data-size="${s}" onclick="selectPDPSize(this)">${s}</button>
          `).join('')}
        </div>
      </div>
      
      <!-- Firmness -->
      ${product.firmnessScore ? `
      <div style="margin-bottom:16px;">
        <label class="form-label">Firmness Rating: ${product.firmness}</label>
        <div class="meter-bar-track" style="height:8px;background:rgba(76,63,94,0.12);border-radius:999px;overflow:hidden;">
          <div class="meter-bar-fill" style="width:${product.firmnessScore * 12.5}%;height:100%;background:linear-gradient(90deg,var(--muted-violet),var(--midnight-blue));border-radius:999px;"></div>
        </div>
      </div>` : ''}
      
      <!-- Action Buttons -->
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">
        <button class="btn btn-gold btn-lg btn-block" onclick="addToCartFromPDP()">
          🛒 Add to Cart
        </button>
        <button class="btn btn-outline btn-lg btn-block" onclick="closePDP();openCheckoutDirect()">
          ⚡ Instant Buy Now
        </button>
      </div>
      
      <!-- Pincode Delivery Check -->
      <div style="margin-top:16px;">
        <label class="form-label">Check Delivery Speed to Your Pincode</label>
        <div style="display:flex;gap:8px;">
          <input class="form-input" placeholder="Enter 6-digit pincode" maxlength="6" id="pdpPincodeInput" style="flex:1;">
          <button class="btn btn-outline btn-sm" onclick="
            const pin = document.getElementById('pdpPincodeInput').value;
            const res = document.getElementById('pdpPincodeResult');
            if (pin.length < 6) { res.textContent = 'Enter valid 6-digit pincode'; return; }
            res.innerHTML = '<span style=\\'color:var(--accent-emerald);font-weight:600;\\'>✓ Free White-Glove delivery to ' + pin + ' in 3-5 days. 100-Night trial included.</span>';
          ">Verify</button>
        </div>
        <div id="pdpPincodeResult" style="font-size:0.78rem;margin-top:5px;"></div>
      </div>
    </div>
  `;
}

window.selectPDPSize = function(btn) {
  qs('#pdpSizeChips')?.querySelectorAll('.pdp-chip-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  // Update displayed price based on size multiplier
  const product = state.pdpProduct;
  if (!product) return;
  const size = btn.dataset.size;
  const sizeMultiplier = getSizeMultiplier(size);
  const newPrice = Math.round(product.basePrice * sizeMultiplier);
  const newMrp   = Math.round(product.mrp * sizeMultiplier);
  const discAmt  = newMrp - newPrice;
  const discPct  = Math.round((discAmt / newMrp) * 100);
  const priceEl  = qs('#pdpCurrentPrice');
  const mrpEl    = qs('#pdpMrpPrice');
  const saveEl   = qs('#pdpSaveText');
  if (priceEl) priceEl.textContent = formatPrice(newPrice);
  if (mrpEl)   mrpEl.textContent   = formatPrice(newMrp);
  if (saveEl)  saveEl.textContent  = `Save ${formatPrice(discAmt)} (${discPct}% off)`;
  // Store adjusted price for cart
  state._pdpAdjustedPrice = newPrice;
};

window.addToCartFromPDP = function() {
  if (!state.pdpProduct) return;
  const sizeBtn = qs('#pdpSizeChips .pdp-chip-btn.active');
  const size = sizeBtn?.dataset.size || state.pdpProduct.sizes?.[0] || 'Standard';
  const adjustedPrice = state._pdpAdjustedPrice || state.pdpProduct.basePrice;
  // Temporarily set the price for cart
  const orig = state.pdpProduct.basePrice;
  state.pdpProduct._cartPrice = adjustedPrice;
  closePDP();
  addToCart(state.pdpProduct.id, size, 1, adjustedPrice);
  state.pdpProduct = null;
  state._pdpAdjustedPrice = null;
};

window.openCheckoutDirect = function() {
  if (state.pdpProduct) {
    const sizeBtn = qs('#pdpSizeChips .pdp-chip-btn.active');
    const size = sizeBtn?.dataset.size || state.pdpProduct.sizes?.[0] || 'Standard';
    const adjustedPrice = state._pdpAdjustedPrice || Math.round(state.pdpProduct.basePrice * getSizeMultiplier(size));
    // Clear cart or add current product and proceed
    state.cart = [{ product: state.pdpProduct, size, qty: 1, price: adjustedPrice }];
    updateCartBadge();
    state.pdpProduct = null;
    state._pdpAdjustedPrice = null;
  }
  closePDP();
  openCheckout();
};

// ────────────────────────────────────────────────────────────
// MATTRESS 6-AXIS PARALLEL INDEPENDENT FILTERS
// ────────────────────────────────────────────────────────────
function renderFilterBar(category) {
  const filterContainer = qs('#filterAxesContainer');
  if (!filterContainer) return;

  filterContainer.innerHTML = Object.entries(FILTER_AXES).map(([axisKey, axis]) => {
    const selectedCount = (state.filters[axisKey] || []).length;
    return `
      <div class="filter-axis-box">
        <div class="filter-axis-label">
          <span style="display:flex;align-items:center;gap:6px;">
            ${axis.label}
            ${selectedCount > 0 ? `<span class="badge badge-founding" style="font-size:0.62rem;padding:2px 6px;">${selectedCount} active</span>` : ''}
          </span>
          ${selectedCount > 0 ? `<button class="custom-size-btn" onclick="clearFilterAxis('${axisKey}')" style="color:var(--text-muted);font-weight:400;">Reset</button>` : ''}
        </div>
        <div class="filter-chips-grid">
          ${axis.options.map(opt => {
            const isSelected = state.filters[axisKey]?.includes(opt);
            return `
              <button class="filter-chip ${isSelected ? 'active' : ''}"
                      data-axis="${axisKey}" data-value="${opt}">
                ${opt.length > 22 ? opt.split(' (')[0] : opt} ${isSelected ? '✓' : ''}
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');

  // Chip click listeners (parallel independent toggle)
  qsa('.filter-chip', filterContainer).forEach(chip => {
    chip.addEventListener('click', () => {
      const axis = chip.dataset.axis;
      const val = chip.dataset.value;
      const arr = state.filters[axis] || [];
      const idx = arr.indexOf(val);
      if (idx > -1) arr.splice(idx, 1);
      else arr.push(val);
      state.filters[axis] = arr;

      // Re-render filters & products
      renderFilterBar('mattresses');
      const products = getProductsByCategory('mattresses', state.filters);
      const container = qs('#view-mattresses .products-grid');
      if (container) renderProductCards(products, container);
    });
  });
}

function clearFilterAxis(axisKey) {
  state.filters[axisKey] = [];
  renderFilterBar('mattresses');
  const products = getProductsByCategory('mattresses', state.filters);
  const container = qs('#view-mattresses .products-grid');
  if (container) renderProductCards(products, container);
}

function resetFilters() {
  state.filters = { size: [], material: [], firmness: [], tier: [], ageGroup: [], packaging: [] };
}

window.clearFilterAxis = clearFilterAxis;
window.resetFilters = resetFilters;

function renderProductCards(products, container) {
  if (!products.length) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:48px 24px;color:var(--text-muted);">
        <div style="font-size:2.5rem;margin-bottom:12px;">🔍</div>
        <div style="font-family:var(--font-serif);font-size:1.1rem;color:var(--midnight-blue);margin-bottom:6px;">No products match all selected filters</div>
        <p style="font-size:0.84rem;margin-bottom:14px;">Try clearing one of the 6 filter axes to see more options.</p>
        <button class="btn btn-outline btn-sm" onclick="resetFilters();renderCategoryPage(state.activeCategory)">Clear All Filters</button>
      </div>`;
    return;
  }
  container.innerHTML = products.map(p => renderProductCard(p)).join('');

  // Bind individual card listeners
  container.querySelectorAll('[data-product-id]').forEach(card => {
    const pId = card.dataset.productId;
    const prod = getProductById(pId);
    card.querySelector('.card-product-title')?.addEventListener('click', () => { if (prod) openPDP(prod); });
    card.querySelector('.add-to-cart-btn')?.addEventListener('click', () => {
      const selectEl = card.querySelector('.size-quick-select');
      const size = selectEl?.value || prod?.sizes?.[0] || 'Standard';
      const overridePrice = Math.round((prod?.basePrice || 0) * getSizeMultiplier(size));
      addToCart(pId, size, 1, overridePrice);
    });
    const compareChk = card.querySelector('.compare-checkbox');
    compareChk?.addEventListener('change', () => { toggleCompare(pId); });
    card.querySelector('.card-floating-3d-btn')?.addEventListener('click', () => { if (prod) openPDP(prod); });
    card.querySelector('.card-view-btn')?.addEventListener('click', () => { if (prod) openPDP(prod); });
    card.querySelector('.card-doctor-pill')?.addEventListener('click', () => openDoctorModal(pId));
  });
}

function renderProductCard(p) {
  return `
    <article class="product-card" data-product-id="${p.id}">
      <div class="card-badge-container">
        ${p.badgeLabel ? `<span class="badge ${getBadgeClass(p.badge)}">${p.badgeLabel}</span>` : ''}
        ${p.doctorRecommended ? '<span class="badge badge-new" style="font-size:0.64rem;">🩺 Dr. Rec</span>' : ''}
      </div>
      
      <div class="product-card-media">
        <img src="${p.image || ''}" alt="${p.name}"
             onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22240%22><rect width=%22400%22 height=%22240%22 fill=%22%23F7F5F0%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2264%22>🛏️</text></svg>'">
        ${p.has3D ? '<button class="card-floating-3d-btn">⟳ 3D View</button>' : ''}
      </div>
      
      <div class="product-card-body">
        <div class="card-tier-height">
          <span>${p.collection || ''}</span>
          ${p.height ? `<span>${p.height}cm height</span>` : ''}
        </div>
        <h3 class="card-product-title">${p.name}</h3>
        
        ${p.firmnessScore ? `
        <div class="card-firmness-meter">
          <div class="meter-header"><span>Firmness</span><span>${p.firmness}</span></div>
          <div class="meter-bar-track"><div class="meter-bar-fill" style="width:${p.firmnessScore * 12.5}%"></div></div>
        </div>` : ''}
        
        ${p.doctorRecommended ? `
        <div class="card-doctor-pill" style="cursor:pointer;">
          <span>🩺</span> Recommended by Sleep Doctors
        </div>` : ''}
        
        ${p.sizes?.length > 1 ? `
        <div style="margin-bottom:10px;">
          <select class="form-input size-quick-select" style="padding:6px 10px;font-size:0.78rem;"
            onchange="updateCardPrice(this, ${p.basePrice}, ${p.mrp})">
            ${p.sizes.map(s => `<option value="${s}">${s} — ${formatPrice(Math.round(p.basePrice * getSizeMultiplier(s)))}</option>`).join('')}
          </select>
        </div>` : ''}
        
        <div class="card-price-row">
          <span class="card-current-price card-size-price">${formatPrice(Math.round(p.basePrice * getSizeMultiplier(p.sizes?.[0] || 'Queen')))}</span>
          <span class="card-original-price card-size-mrp">${formatPrice(Math.round(p.mrp * getSizeMultiplier(p.sizes?.[0] || 'Queen')))}</span>
          <span class="card-discount-tag">${p.discount}% off</span>
        </div>
        ${p.emi ? `<div class="card-emi-text">${p.emi}</div>` : '<div style="height:16px;"></div>'}
        
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
          <span class="stars">${'★'.repeat(Math.round(p.rating))}</span>
          <span class="rating-text">${p.rating} (${p.reviews?.toLocaleString('en-IN')})</span>
        </div>
        
        <div class="card-footer-actions">
          <label class="compare-checkbox-label">
            <input type="checkbox" class="compare-checkbox" data-product-id="${p.id}" style="width:14px;height:14px;accent-color:var(--midnight-blue);">
            Compare
          </label>
          <button class="btn btn-primary btn-sm add-to-cart-btn">Add to Cart</button>
        </div>
        <button class="btn btn-outline btn-sm btn-block card-view-btn" style="margin-top:6px;">View Details</button>
      </div>
    </article>`;
}

function getBadgeClass(badge) {
  const map = { bestseller: 'badge-bestsel', sale: 'badge-sale', new: 'badge-new', ortho: 'badge-new', luxury: 'badge-founding', kids: 'badge-bestsel' };
  return map[badge] || 'badge-bestsel';
}

function renderCategoryPage(category) {
  const catData = CATEGORIES[category];
  if (!catData) return;

  const heroTitle = qs(`#view-${category} .page-hero-title`);
  const heroSub = qs(`#view-${category} .page-hero-subtitle`);
  if (heroTitle) heroTitle.textContent = catData.label;
  if (heroSub) heroSub.textContent = catData.description;

  if (category === 'mattresses') renderFilterBar(category);

  const productsContainer = qs(`#view-${category} .products-grid`);
  if (productsContainer) {
    const products = getProductsByCategory(category, category === 'mattresses' ? state.filters : {});
    renderProductCards(products, productsContainer);
  }

  if (category === 'accessories') initAccSubTabs();
}

function initAccSubTabs() {
  const tabContainer = qs('#accSubTabs');
  if (!tabContainer) return;
  const tabs = ['All', 'Mattress Protectors', 'Pillow Covers', 'Sleep Masks', 'Aromatherapy'];
  tabContainer.innerHTML = tabs.map(t => `
    <button class="acc-sub-tab ${t === state.activeAccSubTab ? 'active' : ''}" data-subtab="${t}">${t}</button>
  `).join('');
  tabContainer.querySelectorAll('.acc-sub-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeAccSubTab = btn.dataset.subtab;
      tabContainer.querySelectorAll('.acc-sub-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const container = qs('#view-accessories .products-grid');
      if (container) {
        let products = getProductsByCategory('accessories', {});
        if (state.activeAccSubTab !== 'All') {
          const tagMap = { 'Mattress Protectors': 'protector', 'Pillow Covers': 'pillowcase', 'Sleep Masks': 'sleep-mask', 'Aromatherapy': 'aromatherapy' };
          const tag = tagMap[state.activeAccSubTab];
          if (tag) products = products.filter(p => p.tags?.includes(tag));
        }
        renderProductCards(products, container);
      }
    });
  });
}

// ────────────────────────────────────────────────────────────
// CUSTOMER AUTH & LOGIN (OTP + GOOGLE)
// ────────────────────────────────────────────────────────────
function initAuth() {
  qs('#accountBtn')?.addEventListener('click', () => {
    if (!state.user) {
      // Show login first, then go to account page after login
      openLoginModal();
    } else {
      navigateTo('account');
    }
  });

  // Google Login simulation
  qs('#googleLoginBtn')?.addEventListener('click', () => {
    state.user = {
      name: 'Arjun Sharma',
      email: 'arjun.sharma@gmail.com',
      phone: '9876543210',
      avatar: 'A',
      foundingNumber: 212,
      isFounding: true,
      isAmbassador: true,
      referralCode: 'VELVET-ARJUN212',
      referralStats: { count: 3, earned: 3000, pending: 1000 },
      orders: [
        {
          id: 'VH-ORD-89241',
          date: '24 Aug 2026',
          status: 'In Transit',
          step: 3,
          trackingId: 'VH-TRK-99021',
          items: [{ name: 'Elara Cloud Mattress (Queen)', price: 28000, qty: 1 }],
          total: 28000,
          address: 'Flat 4B, Sunrise Apts, Indiranagar, Bangalore 560038'
        }
      ],
      addresses: [
        { id: 'a1', tag: 'Home', name: 'Arjun Sharma', phone: '+91 98765 43210', line: 'Flat 4B, Sunrise Apts, Indiranagar', city: 'Bangalore', state: 'Karnataka', pincode: '560038', isDefault: true }
      ],
      wishlist: ['vh-m001', 'vh-p002']
    };
    saveStoredUser(state.user);
    updateHeaderUserUI();
    qs('#loginModal')?.classList.remove('active');
    toast('🎉 Signed in via Google as Arjun Sharma (#212)');
    navigateTo('account');
  });

  // Phone OTP Flow
  qs('#sendOtpBtn')?.addEventListener('click', () => {
    const phone = qs('#loginPhoneInput')?.value?.trim();
    if (!phone || phone.length < 10) {
      toast('Please enter a valid 10-digit mobile number');
      return;
    }
    state.simulatedOtp = (Math.floor(1000 + Math.random() * 9000)).toString();
    qs('#otpTargetPhone').textContent = `+91 ${phone.slice(0,5)} •••••`;
    qs('#simulatedCode').textContent = state.simulatedOtp;
    qs('#otpPhoneStep').style.display = 'none';
    qs('#otpVerifyStep').style.display = 'block';
    startOtpCountdown();
    toast(`📲 Verification SMS sent to +91 ${phone}`);
  });

  qs('#autoFillOtpBtn')?.addEventListener('click', () => {
    const code = state.simulatedOtp;
    qs('#otp1').value = code[0] || '1';
    qs('#otp2').value = code[1] || '2';
    qs('#otp3').value = code[2] || '3';
    qs('#otp4').value = code[3] || '4';
  });

  qs('#changePhoneBtn')?.addEventListener('click', () => {
    qs('#otpVerifyStep').style.display = 'none';
    qs('#otpPhoneStep').style.display = 'block';
  });

  qs('#verifyOtpBtn')?.addEventListener('click', () => {
    const phone = qs('#loginPhoneInput')?.value?.trim() || '9876543210';
    
    // Auto-create or load profile
    const existing = loadStoredUser();
    if (existing) {
      state.user = existing;
    } else {
      state.user = {
        name: 'Sleep Partner',
        phone: phone,
        email: `${phone}@velvethug.in`,
        avatar: 'P',
        foundingNumber: state.foundingCount <= FOUNDING_PARTNER_LIMIT ? 348 : null,
        isFounding: state.foundingCount <= FOUNDING_PARTNER_LIMIT,
        isAmbassador: true,
        referralCode: `VELVET-${phone.slice(-4)}`,
        referralStats: { count: 1, earned: 1000, pending: 0 },
        orders: [],
        addresses: [
          { id: 'a1', tag: 'Home', name: 'Sleep Partner', phone: `+91 ${phone}`, line: 'MG Road', city: 'Bangalore', state: 'Karnataka', pincode: '560001', isDefault: true }
        ],
        wishlist: []
      };
    }

    saveStoredUser(state.user);
    updateHeaderUserUI();
    qs('#loginModal')?.classList.remove('active');
    toast(`👋 Welcome, Sleep Partner!`);
    navigateTo('account');
  });

  // Auto-focus progression for OTP inputs
  ['otp1','otp2','otp3','otp4'].forEach((id, idx, arr) => {
    qs(`#${id}`)?.addEventListener('input', e => {
      if (e.target.value.length === 1 && idx < arr.length - 1) {
        qs(`#${arr[idx+1]}`)?.focus();
      }
    });
  });

  updateHeaderUserUI();
}

function startOtpCountdown() {
  state.otpTimerSecs = 45;
  const timerEl = qs('#otpTimer');
  const iv = setInterval(() => {
    state.otpTimerSecs--;
    if (timerEl) timerEl.textContent = `00:${state.otpTimerSecs.toString().padStart(2, '0')}`;
    if (state.otpTimerSecs <= 0) clearInterval(iv);
  }, 1000);
}

function updateHeaderUserUI() {
  const btn = qs('#accountBtn');
  if (!btn) return;
  if (state.user) {
    btn.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span style="position:absolute;top:5px;right:5px;width:9px;height:9px;border-radius:50%;background:var(--accent-emerald,#059669);border:2px solid #FFFFFF;" title="Logged in as ${state.user.name}"></span>
    `;
    btn.title = `Signed in: ${state.user.name} (#${state.user.foundingNumber || 'Sleep Partner'})`;
  } else {
    btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    btn.title = 'My Account & Profile';
  }
}

function openLoginModal() {
  const otpVerify = qs('#otpVerifyStep');
  const otpPhone  = qs('#otpPhoneStep');
  if (otpVerify) otpVerify.style.display = 'none';
  if (otpPhone)  otpPhone.style.display  = 'block';
  qs('#loginModal')?.classList.add('active');
}

// ────────────────────────────────────────────────────────────
// CUSTOMER ACCOUNT DASHBOARD (Modal Hub)
// ────────────────────────────────────────────────────────────
function openAccountModal() {
  if (!state.user) { openLoginModal(); return; }
  renderAccountModal();
  qs('#accountModal')?.classList.add('active');
}

function closeAccountModal() {
  qs('#accountModal')?.classList.remove('active');
}

function renderAccountModal() {
  const el = qs('#accountDashboardContent');
  if (!el || !state.user) return;

  const u = state.user;
  const foundingBadge = u.isFounding ? `<span class="badge-chip founding">🏅 Founding Sleep Partner #${u.foundingNumber}</span>` : `<span class="badge-chip sleep-partner">🌙 Sleep Partner</span>`;
  const ambassadorBadge = u.isAmbassador ? `<span class="badge-chip ambassador">🌿 Rest Ambassador</span>` : '';
  const vipBadge = `<span class="badge-chip sleep-partner">⚡ VIP First Access</span>`;

  el.innerHTML = `
    <button class="modal-close-icon" onclick="document.getElementById('accountModal').classList.remove('active')">✕</button>
    
    <!-- Profile Header -->
    <div class="account-profile-header">
      <div class="account-user-meta">
        <div class="account-user-avatar">${u.avatar || u.name[0] || 'V'}</div>
        <div>
          <div style="font-family:var(--font-serif);font-size:1.35rem;font-weight:700;color:var(--text-primary);">${u.name}</div>
          <div style="font-size:0.82rem;color:var(--text-muted);">${u.email} · ${u.phone}</div>
        </div>
      </div>
      <button class="btn btn-outline btn-sm" onclick="logoutUser()">Sign Out</button>
    </div>
    
    <!-- Multiple Badges Side-by-Side -->
    <div class="account-badges-row">
      ${foundingBadge}
      ${ambassadorBadge}
      ${vipBadge}
    </div>
    
    <!-- Nav Tabs -->
    <div class="account-nav-tabs">
      <button class="account-nav-tab ${state.activeAccountTab === 'overview' ? 'active' : ''}" onclick="switchAccountTab('overview')">Overview</button>
      <button class="account-nav-tab ${state.activeAccountTab === 'orders' ? 'active' : ''}" onclick="switchAccountTab('orders')">Orders & Live Tracking (${u.orders?.length || 0})</button>
      <button class="account-nav-tab ${state.activeAccountTab === 'referrals' ? 'active' : ''}" onclick="switchAccountTab('referrals')">Rest Ambassador Referrals</button>
      <button class="account-nav-tab ${state.activeAccountTab === 'addresses' ? 'active' : ''}" onclick="switchAccountTab('addresses')">Saved Addresses</button>
      <button class="account-nav-tab ${state.activeAccountTab === 'wishlist' ? 'active' : ''}" onclick="switchAccountTab('wishlist')">Wishlist</button>
    </div>
    
    <!-- Tab Content -->
    <div id="accountTabContent">
      ${renderAccountTabContent()}
    </div>
  `;
}

function switchAccountTab(tab) {
  state.activeAccountTab = tab;
  renderAccountModal();
}

function renderAccountTabContent() {
  const u = state.user;
  if (!u) return '';

  if (state.activeAccountTab === 'overview') {
    return `
      <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:20px;">
        <div style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-md);padding:24px;">
          <div style="font-family:var(--font-serif);font-size:1.1rem;font-weight:700;color:var(--text-primary);margin-bottom:8px;">Founding Partner Recognition</div>
          <p style="font-size:0.84rem;color:var(--text-secondary);line-height:1.6;margin-bottom:18px;">
            As Founding Partner <strong>#${u.foundingNumber || 212}</strong>, your price lock gives you an automatic <strong>15% fixed discount</strong> on all purchases.
          </p>
          <div style="display:flex;gap:10px;">
            <button class="btn btn-gold btn-sm" onclick="openCertificateModal()">🏅 View Official Certificate</button>
            <button class="btn btn-outline btn-sm" onclick="switchAccountTab('referrals')">Refer & Earn</button>
          </div>
        </div>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div class="referral-stat-box" style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.1);">
            <div style="font-size:1.6rem;font-weight:800;color:var(--midnight-blue);">${u.orders?.length || 0}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">Active Orders</div>
          </div>
          <div class="referral-stat-box" style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.1);">
            <div style="font-size:1.6rem;font-weight:800;color:var(--accent-emerald);">₹${(u.referralStats?.earned || 0).toLocaleString('en-IN')}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">Rewards Earned</div>
          </div>
          <div class="referral-stat-box" style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.1);grid-column:1/-1;">
            <div style="font-size:0.76rem;color:var(--text-muted);margin-bottom:4px;">YOUR REFERRAL LINK</div>
            <div style="font-family:monospace;font-size:0.88rem;color:var(--midnight-blue);font-weight:700;">velvethug.in/ref/${u.referralCode}</div>
          </div>
        </div>
      </div>
    `;
  }

  else if (state.activeAccountTab === 'orders') {
    if (!u.orders || u.orders.length === 0) {
      return `
        <div style="text-align:center;padding:40px;color:var(--text-muted);">
          <div style="font-size:2.5rem;margin-bottom:10px;">📦</div>
          <div style="font-family:var(--font-serif);font-size:1.1rem;color:var(--midnight-blue);margin-bottom:6px;">No orders yet</div>
          <p style="font-size:0.84rem;margin-bottom:16px;">Your handcrafted sleep system awaits.</p>
          <button class="btn btn-primary btn-sm" onclick="closeAccountModal();goToPage('mattresses')">Explore Mattresses</button>
        </div>
      `;
    }
    return u.orders.map(o => {
      const isDelivered = o.step >= 4 || o.status === 'Delivered';
      const firstItemName = (o.items && o.items[0]) ? o.items[0].name.replace(/'/g, "\\'") : 'Velvet Hug Sleep System';
      return `
      <div class="order-card">
        <div class="order-card-header">
          <div>
            <span style="font-family:var(--font-serif);font-weight:700;color:var(--midnight-blue);font-size:1rem;">Order #${o.id}</span>
            <span style="font-size:0.78rem;color:var(--text-muted);margin-left:8px;">Placed on ${o.date}</span>
          </div>
          <div>
            <span class="badge badge-founding" style="font-size:0.72rem;">${o.status}</span>
            <span style="font-weight:700;color:var(--midnight-blue);margin-left:10px;">${formatPrice(o.total)}</span>
          </div>
        </div>
        
        <!-- Interactive Tracking Stepper -->
        <div class="tracking-stepper">
          <div class="tracking-step ${o.step >= 1 ? 'completed' : ''}">
            <div class="tracking-dot">✓</div>
            <div class="tracking-label">Order Placed</div>
          </div>
          <div class="tracking-step ${o.step >= 2 ? 'completed' : ''}">
            <div class="tracking-dot">✓</div>
            <div class="tracking-label">Crafted in Lab</div>
          </div>
          <div class="tracking-step ${o.step >= 3 ? (o.step === 3 ? 'current' : 'completed') : ''}">
            <div class="tracking-dot">${o.step === 3 ? '🚚' : '✓'}</div>
            <div class="tracking-label">White-Glove Dispatched</div>
          </div>
          <div class="tracking-step ${o.step >= 4 ? 'completed' : ''}">
            <div class="tracking-dot">🏡</div>
            <div class="tracking-label">Delivered &amp; Held</div>
          </div>
        </div>
        
        <div style="font-size:0.8rem;color:var(--text-secondary);background:#fff;padding:12px;border-radius:var(--radius-xs);margin-top:12px;">
          <strong>Items:</strong> ${(o.items || []).map(i => `${i.name} × ${i.qty}`).join(', ')}<br>
          <strong>Delivery to:</strong> ${o.address}<br>
          <strong>Live Tracking:</strong> <span style="font-family:monospace;color:var(--midnight-blue);font-weight:700;">${o.trackingId}</span>
        </div>

        <!-- Post-Delivery Review & Rating Action -->
        <div style="margin-top:12px;padding-top:10px;border-top:1px dashed rgba(76,63,94,0.15);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            ${o.hasReviewed ? `
              <span style="color:var(--accent-emerald);font-size:0.84rem;font-weight:700;">✓ Verified Review Submitted &amp; Recorded</span>
            ` : `
              <button class="btn btn-gold btn-sm" onclick="window.openOrderReviewModal('${o.id}', '${firstItemName}')">
                ★ Write a Doctor / Sleeper Review
              </button>
            `}
          </div>
          ${o.step < 4 ? `
            <button class="btn btn-outline btn-sm" onclick="window.simulateDelivery('${o.id}')" title="Test Delivery Transition" style="font-size:0.75rem;">
              🚚 Mark as Delivered (Test Flow)
            </button>
          ` : ''}
        </div>
      </div>
    `;
    }).join('');
  }

  else if (state.activeAccountTab === 'referrals') {
    return `
      <div class="referral-hero-card">
        <div style="font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--champagne-gold);margin-bottom:4px;">Rest Ambassador Program</div>
        <h3 style="font-family:var(--font-serif);font-size:1.4rem;margin-bottom:8px;">Hold someone's sleep. Earn ₹1,000 for each friend.</h3>
        <p style="font-size:0.86rem;color:rgba(255,255,255,0.75);margin-bottom:16px;">
          When your friends purchase using your link, they get <strong>10% off</strong> and you earn <strong>₹1,000 cash reward</strong>.
        </p>
        <div class="referral-link-box">
          <input class="form-input" value="https://velvethug.in/ref/${u.referralCode}" readonly style="background:transparent;border:none;color:#fff;font-size:0.85rem;font-family:monospace;" id="refLinkInput">
          <button class="btn btn-gold btn-sm" onclick="
            navigator.clipboard.writeText('https://velvethug.in/ref/${u.referralCode}');
            toast('✓ Referral link copied to clipboard!');
          ">Copy Link</button>
        </div>
      </div>
      
      <div class="referral-stats-grid">
        <div class="referral-stat-box" style="background:var(--bg-secondary);">
          <div style="font-size:1.8rem;font-weight:800;color:var(--midnight-blue);">${u.referralStats?.count || 0}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);">Friends Referred</div>
        </div>
        <div class="referral-stat-box" style="background:var(--bg-secondary);">
          <div style="font-size:1.8rem;font-weight:800;color:var(--accent-emerald);">₹${(u.referralStats?.earned || 0).toLocaleString('en-IN')}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);">Rewards Paid</div>
        </div>
        <div class="referral-stat-box" style="background:var(--bg-secondary);">
          <div style="font-size:1.8rem;font-weight:800;color:var(--muted-violet);">₹${(u.referralStats?.pending || 0).toLocaleString('en-IN')}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);">Rewards in Trial</div>
        </div>
      </div>
      
      <div style="text-align:center;margin-top:16px;">
        <a href="https://wa.me/?text=Hey!%20I%20got%20the%20Velvet%20Hug%20mattress%20and%20it%20has%20transformed%20my%20sleep.%20Get%2010%25%20off%20with%20my%20link:%20https://velvethug.in/ref/${u.referralCode}" target="_blank" class="btn btn-primary btn-sm">
          Share to WhatsApp 💬
        </a>
      </div>
    `;
  }

  else if (state.activeAccountTab === 'addresses') {
    return `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px;">
        ${(u.addresses || []).map(a => `
          <div style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-sm);padding:18px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
              <span class="badge badge-founding" style="font-size:0.68rem;">${a.tag}</span>
              ${a.isDefault ? '<span style="font-size:0.72rem;color:var(--accent-emerald);font-weight:700;">Default</span>' : ''}
            </div>
            <div style="font-weight:700;color:var(--midnight-blue);margin-bottom:4px;">${a.name}</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.5;">${a.line}<br>${a.city}, ${a.state} - ${a.pincode}<br>Phone: ${a.phone}</div>
          </div>
        `).join('')}
      </div>
      <button class="btn btn-outline btn-sm" onclick="toast('Address saved as default!')">+ Add New Address</button>
    `;
  }

  else if (state.activeAccountTab === 'wishlist') {
    return `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
        ${PRODUCTS.slice(0, 2).map(p => `
          <div style="display:flex;gap:12px;background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.1);border-radius:var(--radius-sm);padding:12px;align-items:center;">
            <img src="${p.image}" style="width:70px;height:60px;object-fit:cover;border-radius:4px;" onerror="this.style.display='none'">
            <div style="flex:1;">
              <div style="font-family:var(--font-serif);font-weight:600;font-size:0.92rem;color:var(--midnight-blue);">${p.name}</div>
              <div style="font-size:0.84rem;font-weight:700;color:var(--midnight-blue);">${formatPrice(p.basePrice)}</div>
            </div>
            <button class="btn btn-primary btn-sm" onclick="addToCart('${p.id}');closeAccountModal();">Add</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  return '';
}

function logoutUser() {
  state.user = null;
  saveStoredUser(null);
  updateHeaderUserUI();
  closeAccountModal();
  navigateTo('home');
  toast('Signed out successfully');
}

window.openAccountModal = openAccountModal;
window.closeAccountModal = closeAccountModal;
window.switchAccountTab = switchAccountTab;
window.logoutUser = logoutUser;

// ────────────────────────────────────────────────────────────
// DEDICATED ACCOUNT PAGE (view-account)
// ────────────────────────────────────────────────────────────
let _accountPageTab = 'orders';

function renderAccountPage() {
  const guest    = qs('#accountPageGuest');
  const loggedIn = qs('#accountPageLoggedIn');
  const titleEl  = qs('#accountPageTitle');
  const subEl    = qs('#accountPageSubtitle');

  if (!state.user) {
    if (guest)    guest.style.display    = 'block';
    if (loggedIn) loggedIn.style.display = 'none';
    return;
  }

  if (guest)    guest.style.display    = 'none';
  if (loggedIn) loggedIn.style.display = 'block';

  const u = state.user;

  // Header
  if (titleEl) titleEl.textContent = u.name;
  if (subEl)   subEl.textContent   = u.email || `+91 ${u.phone}`;

  const avatarEl = qs('#acctAvatar');
  if (avatarEl) avatarEl.textContent = u.avatar || u.name?.[0] || 'V';

  const nameEl = qs('#acctName');
  if (nameEl)  nameEl.textContent = u.name;

  const contactEl = qs('#acctContact');
  if (contactEl) contactEl.textContent = [u.email, u.phone ? `+91 ${u.phone}` : ''].filter(Boolean).join(' · ');

  const badgesEl = qs('#acctBadges');
  if (badgesEl) {
    let badgeHTML = '';
    if (u.isFounding) badgeHTML += `<span class="badge badge-founding">🏅 Founding Partner #${u.foundingNumber}</span>`;
    if (u.isAmbassador) badgeHTML += `<span class="badge badge-new" style="margin-left:4px;">🌿 Rest Ambassador</span>`;
    badgesEl.innerHTML = badgeHTML;
  }

  renderAccountPageTab();
}

function switchAccountPageTab(tab) {
  _accountPageTab = tab;
  qs('#acctTabOrders')?.classList.toggle('active', tab === 'orders');
  qs('#acctTabProfile')?.classList.toggle('active', tab === 'profile');
  renderAccountPageTab();
}

function renderAccountPageTab() {
  const el = qs('#accountPageTabContent');
  if (!el || !state.user) return;
  const u = state.user;

  if (_accountPageTab === 'orders') {
    if (!u.orders || u.orders.length === 0) {
      el.innerHTML = `
        <div style="text-align:center;padding:60px 0;">
          <div style="font-size:3.5rem;margin-bottom:16px;">📦</div>
          <div style="font-family:var(--font-serif);font-size:1.3rem;color:var(--midnight-blue);margin-bottom:8px;">No orders yet</div>
          <p style="color:var(--text-muted);margin-bottom:24px;">Your handcrafted sleep system awaits.</p>
          <button class="btn btn-gold btn-lg" onclick="goToPage('mattresses')">Explore Mattresses →</button>
        </div>`;
      return;
    }
    el.innerHTML = u.orders.map(o => {
      const curStatus = o.deliveryStatus || o.status || 'Order Placed';
      const stepIdx = curStatus === 'Delivered' ? 4 : (curStatus === 'Dispatched' ? 3 : (curStatus === 'Crafted in Lab' ? 2 : 1));

      return `
      <div class="order-card" style="margin-bottom:20px;background:var(--bg-surface);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-md);padding:20px;">
        <div class="order-card-header" style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(76,63,94,0.08);padding-bottom:12px;margin-bottom:14px;">
          <div>
            <span style="font-family:var(--font-serif);font-weight:700;color:var(--midnight-blue);font-size:1.05rem;">Order #${o.id}</span>
            <span style="font-size:0.78rem;color:var(--text-muted);margin-left:8px;">Ordered on ${o.date}</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="badge badge-founding" style="font-size:0.72rem;">${curStatus}</span>
            <span style="font-weight:700;color:var(--midnight-blue);font-size:1.05rem;">${formatPrice(o.total || o.amount)}</span>
          </div>
        </div>

        <!-- Dynamic 4-Step Tracking Stepper -->
        <div class="tracking-stepper">
          <div class="tracking-step ${stepIdx >= 1 ? 'completed' : ''}">
            <div class="tracking-dot">✓</div><div class="tracking-label">Order Placed</div>
          </div>
          <div class="tracking-step ${stepIdx >= 2 ? 'completed' : ''}">
            <div class="tracking-dot">${stepIdx >= 2 ? '✓' : '2'}</div><div class="tracking-label">Crafted in Lab</div>
          </div>
          <div class="tracking-step ${stepIdx >= 3 ? 'completed' : ''}">
            <div class="tracking-dot">${stepIdx >= 3 ? '✓' : '3'}</div><div class="tracking-label">Dispatched</div>
          </div>
          <div class="tracking-step ${stepIdx >= 4 ? 'completed' : ''}">
            <div class="tracking-dot">${stepIdx >= 4 ? '✓' : '4'}</div><div class="tracking-label">Delivered</div>
          </div>
        </div>

        <!-- Order Items & Delivery Details -->
        <div style="font-size:0.82rem;color:var(--text-secondary);background:var(--bg-secondary);padding:14px;border-radius:var(--radius-sm);margin-top:14px;">
          <div style="margin-bottom:4px;"><strong>Items:</strong> ${(o.items||[]).map(i => (typeof i === 'string' ? i : `${i.name} × ${i.qty}`)).join(', ')}</div>
          <div style="margin-bottom:4px;"><strong>Delivery Address:</strong> ${o.address}</div>
          <div><strong>Tracking Reference:</strong> <span style="font-family:monospace;font-weight:700;color:var(--midnight-blue);">${o.trackingId || 'VH-TRK-99021'}</span></div>

          ${o.timeline && o.timeline.length > 0 ? `
            <div style="margin-top:12px;padding-top:10px;border-top:1px solid rgba(76,63,94,0.1);">
              <div style="font-weight:700;font-size:0.78rem;color:var(--midnight-blue);margin-bottom:6px;">Milestone History &amp; Timestamps:</div>
              ${o.timeline.map(t => `
                <div style="font-size:0.75rem;display:flex;justify-content:space-between;padding:3px 0;color:var(--text-secondary);">
                  <span>• <strong>${t.stage}</strong>: ${t.note}</span>
                  <span style="color:var(--text-muted);">${t.timestamp}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
    }).join('');
    return;
  }

  // Profile tab
  el.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">

      <!-- Personal Info -->
      <div style="background:var(--bg-surface);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-lg);padding:24px;">
        <div style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:var(--midnight-blue);margin-bottom:16px;">Personal Details</div>
        <div style="margin-bottom:14px;">
          <label class="form-label">Full Name</label>
          <input class="form-input" id="profileName" value="${u.name || ''}" placeholder="Your name">
        </div>
        <div style="margin-bottom:14px;">
          <label class="form-label">Email Address</label>
          <input class="form-input" id="profileEmail" value="${u.email || ''}" placeholder="your@email.com">
        </div>
        <div style="margin-bottom:20px;">
          <label class="form-label">Phone Number (+91)</label>
          <input class="form-input" id="profilePhone" value="${u.phone || ''}" placeholder="98765 43210">
        </div>
        <button class="btn btn-primary btn-sm" onclick="saveProfileDetails()">Save Changes</button>
      </div>

      <!-- Saved Addresses -->
      <div style="background:var(--bg-surface);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-lg);padding:24px;">
        <div style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:var(--midnight-blue);margin-bottom:16px;">Saved Addresses</div>
        <div id="profileAddressList">
          ${(u.addresses || []).map((a, i) => `
            <div style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.1);border-radius:var(--radius-sm);padding:14px;margin-bottom:10px;position:relative;">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                <span class="badge badge-founding" style="font-size:0.65rem;">${a.tag}</span>
                ${a.isDefault ? '<span style="font-size:0.72rem;color:var(--accent-emerald);font-weight:700;">Default</span>' : `<button class="btn btn-outline btn-sm" style="font-size:0.68rem;padding:2px 8px;" onclick="setDefaultAddress(${i})">Set Default</button>`}
              </div>
              <div style="font-weight:700;color:var(--midnight-blue);font-size:0.9rem;">${a.name}</div>
              <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;">${a.line}<br>${a.city}, ${a.state} - ${a.pincode}<br>📞 ${a.phone}</div>
              <button onclick="deleteAddress(${i})" style="position:absolute;top:10px;right:10px;background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:0.75rem;">✕ Remove</button>
            </div>
          `).join('')}
        </div>
        <div style="border-top:1px solid rgba(76,63,94,0.08);padding-top:14px;margin-top:14px;">
          <div style="font-size:0.82rem;font-weight:600;color:var(--midnight-blue);margin-bottom:10px;">Add New Address</div>
          <input class="form-input" id="newAddrTag" placeholder="Label (Home / Office)" style="margin-bottom:6px;">
          <input class="form-input" id="newAddrLine" placeholder="Street address" style="margin-bottom:6px;">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:8px;">
            <input class="form-input" id="newAddrCity" placeholder="City">
            <input class="form-input" id="newAddrState" placeholder="State">
            <input class="form-input" id="newAddrPin" placeholder="Pincode" maxlength="6">
          </div>
          <button class="btn btn-outline btn-sm" onclick="addNewAddress()">+ Save Address</button>
        </div>
      </div>

    </div>

    <!-- Sleep Partner Status Card -->
    ${u.isFounding ? `
    <div style="background:linear-gradient(135deg,var(--midnight-blue),var(--muted-violet));border-radius:var(--radius-lg);padding:24px;margin-top:24px;color:#FDFBF7;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;">
      <div>
        <div style="font-size:0.78rem;letter-spacing:0.1em;opacity:0.7;margin-bottom:4px;">FOUNDING SLEEP PARTNER</div>
        <div style="font-family:var(--font-serif);font-size:2rem;font-weight:700;">#${u.foundingNumber}</div>
        <div style="font-size:0.84rem;opacity:0.75;margin-top:4px;">15% lifetime price lock · VIP first access</div>
      </div>
      <div style="display:flex;gap:10px;">
        <button class="btn btn-gold btn-sm" onclick="openCertificateModal()">📜 Certificate</button>
        <button class="btn btn-outline-light btn-sm" onclick="switchAccountPageTab('orders')">View Orders</button>
      </div>
    </div>` : ''}

    <!-- Referral Panel -->
    <div style="background:var(--bg-surface);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-lg);padding:24px;margin-top:24px;">
      <div style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:var(--midnight-blue);margin-bottom:8px;">🌿 Rest Ambassador — Refer &amp; Earn</div>
      <p style="font-size:0.84rem;color:var(--text-muted);margin-bottom:14px;">Share your link. Earn ₹1,000 for every friend who buys.</p>
      <div style="display:flex;gap:8px;margin-bottom:12px;">
        <input class="form-input" value="https://velvethug.in/ref/${u.referralCode}" readonly style="font-family:monospace;font-size:0.82rem;">
        <button class="btn btn-gold btn-sm" onclick="navigator.clipboard?.writeText('https://velvethug.in/ref/${u.referralCode}');toast('✓ Link copied!')">Copy</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
        <div style="text-align:center;background:var(--bg-secondary);padding:12px;border-radius:var(--radius-sm);">
          <div style="font-size:1.4rem;font-weight:800;color:var(--midnight-blue);">${u.referralStats?.count || 0}</div>
          <div style="font-size:0.72rem;color:var(--text-muted);">Friends Referred</div>
        </div>
        <div style="text-align:center;background:var(--bg-secondary);padding:12px;border-radius:var(--radius-sm);">
          <div style="font-size:1.4rem;font-weight:800;color:var(--accent-emerald);">₹${(u.referralStats?.earned||0).toLocaleString('en-IN')}</div>
          <div style="font-size:0.72rem;color:var(--text-muted);">Earned</div>
        </div>
        <div style="text-align:center;background:var(--bg-secondary);padding:12px;border-radius:var(--radius-sm);">
          <div style="font-size:1.4rem;font-weight:800;color:var(--muted-violet);">₹${(u.referralStats?.pending||0).toLocaleString('en-IN')}</div>
          <div style="font-size:0.72rem;color:var(--text-muted);">In Trial</div>
        </div>
      </div>
    </div>
  `;
}

function saveProfileDetails() {
  if (!state.user) return;
  const name  = qs('#profileName')?.value?.trim();
  const email = qs('#profileEmail')?.value?.trim();
  const phone = qs('#profilePhone')?.value?.trim();
  if (!name) { toast('Name cannot be empty'); return; }
  state.user.name  = name;
  state.user.email = email;
  state.user.phone = phone;
  state.user.avatar = name[0].toUpperCase();
  saveStoredUser(state.user);
  updateHeaderUserUI();
  renderAccountPage();
  toast('✓ Profile updated!');
}

function addNewAddress() {
  if (!state.user) return;
  const tag  = qs('#newAddrTag')?.value?.trim() || 'Home';
  const line = qs('#newAddrLine')?.value?.trim();
  const city = qs('#newAddrCity')?.value?.trim();
  const st   = qs('#newAddrState')?.value?.trim();
  const pin  = qs('#newAddrPin')?.value?.trim();
  if (!line || !city || !pin) { toast('Please fill address, city and pincode'); return; }
  state.user.addresses = state.user.addresses || [];
  state.user.addresses.push({
    id: `a${Date.now()}`, tag, name: state.user.name,
    phone: `+91 ${state.user.phone}`,
    line, city, state: st, pincode: pin,
    isDefault: state.user.addresses.length === 0
  });
  saveStoredUser(state.user);
  renderAccountPageTab();
  toast('✓ Address saved!');
}

function deleteAddress(idx) {
  if (!state.user?.addresses) return;
  state.user.addresses.splice(idx, 1);
  if (state.user.addresses.length && !state.user.addresses.some(a => a.isDefault)) {
    state.user.addresses[0].isDefault = true;
  }
  saveStoredUser(state.user);
  renderAccountPageTab();
  toast('Address removed');
}

function setDefaultAddress(idx) {
  if (!state.user?.addresses) return;
  state.user.addresses.forEach((a, i) => a.isDefault = (i === idx));
  saveStoredUser(state.user);
  renderAccountPageTab();
  toast('✓ Default address updated');
}

window.switchAccountPageTab = switchAccountPageTab;
window.saveProfileDetails   = saveProfileDetails;
window.addNewAddress        = addNewAddress;
window.deleteAddress        = deleteAddress;
window.setDefaultAddress    = setDefaultAddress;

// ────────────────────────────────────────────────────────────
// FOUNDING SLEEP PARTNER DIGITAL CERTIFICATE
// ────────────────────────────────────────────────────────────
function openCertificateModal() {
  const u = state.user || { name: 'Sleep Partner', foundingNumber: 212 };
  const el = qs('#certificateContent');
  if (!el) return;

  el.innerHTML = `
    <button class="modal-close-icon" onclick="document.getElementById('certificateModal').classList.remove('active')">✕</button>
    <div class="certificate-seal">👑</div>
    <div style="font-size:0.75rem;letter-spacing:0.18em;font-weight:700;color:var(--muted-violet);text-transform:uppercase;margin-bottom:8px;">Certificate of Honour</div>
    <h2 style="font-family:var(--font-serif);font-size:1.8rem;color:var(--midnight-blue);margin-bottom:8px;">Founding Sleep Partner</h2>
    <div style="font-family:var(--font-serif);font-size:2.8rem;font-weight:700;color:var(--midnight-blue);margin:8px 0;">#${u.foundingNumber || 212}</div>
    <p style="font-family:var(--font-serif);font-style:italic;font-size:1.1rem;color:var(--muted-violet);margin-bottom:16px;">
      Awarded to <strong>${u.name}</strong>
    </p>
    <p style="font-size:0.84rem;color:var(--text-secondary);max-width:440px;margin:0 auto 24px;line-height:1.6;">
      As one of the first 1,000 customers to trust Velvet Hug with their rest, this numbered status and 15% lifetime price lock are permanently tied to your name.
    </p>
    <div style="display:flex;justify-content:space-around;border-top:1px solid rgba(76,63,94,0.15);padding-top:16px;margin-bottom:24px;font-size:0.75rem;color:var(--text-muted);">
      <div>Verified by<br><strong style="color:var(--midnight-blue);">Velvet Hug Sleep Labs</strong></div>
      <div>Issued<br><strong style="color:var(--midnight-blue);">Founding Batch 2026</strong></div>
    </div>
    <div style="display:flex;gap:12px;justify-content:center;">
      <button class="btn btn-gold btn-sm" onclick="window.print();toast('🖨️ Printing certificate...')">Print / Save PDF</button>
      <button class="btn btn-outline btn-sm" onclick="toast('Badge link copied for sharing!')">Share Badge</button>
    </div>
  `;

  qs('#certificateModal')?.classList.add('active');
}

window.openCertificateModal = openCertificateModal;

// ────────────────────────────────────────────────────────────
// END-TO-END PAYMENT GATEWAY FLOW
// ────────────────────────────────────────────────────────────
function initCheckout() {
  qs('#checkoutModalClose')?.addEventListener('click', closeCheckout);
  qs('#checkoutModalBackdrop')?.addEventListener('click', e => {
    if (e.target === qs('#checkoutModalBackdrop')) closeCheckout();
  });
}

function openCheckout() {
  closeCart();
  state.checkoutStep = 'details';
  renderCheckout();
  qs('#checkoutModalBackdrop')?.classList.add('active');
}

function closeCheckout() {
  qs('#checkoutModalBackdrop')?.classList.remove('active');
}

function setPaymentMethod(method) {
  state.paymentMethod = method;
  renderCheckout();
}

window.setPaymentMethod = setPaymentMethod;

function getActiveCoupons() {
  try {
    const raw = localStorage.getItem('vh_admin_store_v1');
    if (raw) {
      const store = JSON.parse(raw);
      if (store.coupons && store.coupons.length > 0) {
        return store.coupons.filter(c => c.status === 'Active');
      }
    }
  } catch (e) {}
  return [
    { code: 'DIWALI30', discountPct: 30, maxDiscount: 10000, minOrder: 15000 },
    { code: 'FOUNDING', discountPct: 15, maxDiscount: 15000, minOrder: 10000 },
    { code: 'REST10', discountPct: 10, maxDiscount: 5000, minOrder: 5000 }
  ];
}

function renderCheckout() {
  const el = qs('#checkoutContent');
  if (!el) return;

  const rawTotal = getCartTotal();
  const isFounding = state.user?.isFounding;
  const availableCoupons = getActiveCoupons();

  let activeCouponObj = null;
  if (state.appliedCoupon) {
    activeCouponObj = availableCoupons.find(c => c.code.toUpperCase() === state.appliedCoupon.toUpperCase());
  }

  let calculatedDiscount = 0;
  if (isFounding) {
    calculatedDiscount = Math.round(rawTotal * 0.15);
  } else if (activeCouponObj) {
    const rawDisc = Math.round(rawTotal * (activeCouponObj.discountPct / 100));
    calculatedDiscount = Math.min(rawDisc, activeCouponObj.maxDiscount || 10000);
  }

  const finalTotal = Math.max(0, rawTotal - calculatedDiscount);

  const steps = `
    <div class="checkout-steps-bar">
      <div class="checkout-step-pill ${state.checkoutStep === 'details' ? 'active' : ''}">
        <div class="checkout-step-num">1</div> Delivery Details
      </div>
      <div style="flex-grow:1;height:1px;background:rgba(76,63,94,0.1);margin:0 8px;align-self:center;"></div>
      <div class="checkout-step-pill ${state.checkoutStep === 'payment' ? 'active' : ''}">
        <div class="checkout-step-num">2</div> Secure Payment
      </div>
      <div style="flex-grow:1;height:1px;background:rgba(76,63,94,0.1);margin:0 8px;align-self:center;"></div>
      <div class="checkout-step-pill ${state.checkoutStep === 'success' ? 'active' : ''}">
        <div class="checkout-step-num">✓</div> Order Confirmed
      </div>
    </div>`;

  if (state.checkoutStep === 'details') {
    const u = state.user;
    el.innerHTML = `
      ${steps}
      <h3 style="font-family:var(--font-serif);font-size:1.3rem;color:var(--midnight-blue);margin-bottom:16px;">Delivery Details</h3>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
        <div><label class="form-label">Full Name</label><input class="form-input" id="coName" value="${u?.name || ''}" placeholder="Arjun Sharma"></div>
        <div><label class="form-label">Phone Number (+91)</label><input class="form-input" id="coPhone" value="${u?.phone || ''}" placeholder="98765 43210"></div>
      </div>
      <div style="margin-bottom:12px;"><label class="form-label">Email for Order & Digital Badge</label><input class="form-input" id="coEmail" value="${u?.email || ''}" placeholder="arjun@gmail.com"></div>
      <div style="margin-bottom:12px;"><label class="form-label">Complete Street Address</label><input class="form-input" id="coAddress" value="${u?.addresses?.[0]?.line || ''}" placeholder="Flat 4B, Sunrise Apartments, MG Road"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:18px;">
        <div><label class="form-label">City</label><input class="form-input" id="coCity" value="${u?.addresses?.[0]?.city || 'Bangalore'}" placeholder="Bangalore"></div>
        <div><label class="form-label">State</label><input class="form-input" id="coState" value="${u?.addresses?.[0]?.state || 'Karnataka'}" placeholder="Karnataka"></div>
        <div><label class="form-label">Pincode</label><input class="form-input" id="coPin" value="${u?.addresses?.[0]?.pincode || '560038'}" placeholder="560038"></div>
      </div>
      
      <!-- Order Summary -->
      <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:16px;margin-bottom:18px;">
        <div style="font-weight:700;margin-bottom:8px;color:var(--midnight-blue);">Order Summary (${state.cart.length} items)</div>
        ${state.cart.map(i => `
          <div style="display:flex;justify-content:space-between;font-size:0.84rem;padding:4px 0;color:var(--text-secondary);">
            <span>${i.product.name} × ${i.qty} (${i.size})</span>
            <span>${formatPrice(i.product.basePrice * i.qty)}</span>
          </div>
        `).join('')}
        <div style="border-top:1px solid rgba(76,63,94,0.1);margin-top:8px;padding-top:8px;display:flex;justify-content:space-between;font-weight:800;font-size:1rem;color:var(--midnight-blue);">
          <span>Subtotal</span><span>${formatPrice(rawTotal)}</span>
        </div>
      </div>
      
      <button class="btn btn-primary btn-lg btn-block" id="proceedToPaymentBtn" onclick="proceedToPayment()">
        Proceed to Payment (${formatPrice(finalTotal)}) →
      </button>
    `;
  }

  else if (state.checkoutStep === 'payment') {
    el.innerHTML = `
      ${steps}
      <h3 style="font-family:var(--font-serif);font-size:1.3rem;color:var(--midnight-blue);margin-bottom:16px;">Choose Payment Mode</h3>
      
      <!-- Payment Method Selector -->
      <div class="payment-tab-selector">
        <button class="payment-tab-btn ${state.paymentMethod === 'upi' ? 'active' : ''}" onclick="setPaymentMethod('upi')">📱 UPI / QR</button>
        <button class="payment-tab-btn ${state.paymentMethod === 'card' ? 'active' : ''}" onclick="setPaymentMethod('card')">💳 Cards</button>
        <button class="payment-tab-btn ${state.paymentMethod === 'netbanking' ? 'active' : ''}" onclick="setPaymentMethod('netbanking')">🏦 Net Banking</button>
        <button class="payment-tab-btn ${state.paymentMethod === 'cod' ? 'active' : ''}" onclick="setPaymentMethod('cod')">📦 COD</button>
      </div>
      
      <!-- Payment Panel Details -->
      ${renderPaymentGatewayPanel(finalTotal)}
      
      <!-- Price Lock & Coupon -->
      <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:14px;margin-bottom:16px;">
        ${isFounding ? `
          <div style="display:flex;justify-content:space-between;color:var(--accent-emerald);font-weight:700;font-size:0.84rem;margin-bottom:6px;">
            <span>🏅 Founding Sleep Partner Price Lock (15% Off)</span>
            <span>− ${formatPrice(calculatedDiscount)}</span>
          </div>
        ` : `
          <div style="display:flex;gap:8px;margin-bottom:6px;">
            <input class="form-input" placeholder="Enter Coupon Code" value="${state.appliedCoupon || ''}" id="coCouponInput" style="flex:1;text-transform:uppercase;">
            <button class="btn btn-outline btn-sm" onclick="applyCheckoutCoupon()">Apply</button>
          </div>
          ${activeCouponObj ? `
            <div style="display:flex;justify-content:space-between;color:var(--accent-emerald);font-weight:700;font-size:0.82rem;margin-bottom:6px;">
              <span>✓ Coupon Applied: ${activeCouponObj.code} (${activeCouponObj.discountPct}% OFF)</span>
              <span>− ${formatPrice(calculatedDiscount)}</span>
            </div>
          ` : `
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">
              <span style="font-size:0.72rem;color:var(--text-muted);align-self:center;">Available:</span>
              ${availableCoupons.map(c => `
                <button type="button" onclick="applyDirectCoupon('${c.code}')" style="font-size:0.72rem;background:var(--bg-surface);border:1px dashed var(--champagne-gold);padding:3px 8px;border-radius:4px;font-weight:700;color:var(--text-primary);cursor:pointer;">
                  🎟️ ${c.code} (${c.discountPct}% OFF)
                </button>
              `).join('')}
            </div>
          `}
        `}
        <div style="display:flex;justify-content:space-between;font-weight:800;font-size:1.15rem;color:var(--midnight-blue);border-top:1px solid rgba(76,63,94,0.1);padding-top:8px;">
          <span>Total Payable</span>
          <span>${formatPrice(finalTotal)}</span>
        </div>
        <div style="font-size:0.72rem;color:var(--text-muted);margin-top:4px;">🔒 256-Bit Bank Grade SSL Encrypted Checkout</div>
      </div>
      
      <div style="display:flex;gap:10px;">
        <button class="btn btn-outline btn-sm" onclick="backToCheckoutDetails()">← Back</button>
        <button class="btn btn-gold btn-lg btn-block" onclick="executePaymentGateway(${finalTotal})">✓ Authorize & Pay ${formatPrice(finalTotal)}</button>
      </div>
    `;
  }

  else if (state.checkoutStep === 'success') {
    const isNewFounding = state.foundingCount <= FOUNDING_PARTNER_LIMIT;
    const partnerNum = state.user?.foundingNumber || (isNewFounding ? state.foundingCount : null);
    const orderId = `VH-${Math.floor(100000 + Math.random() * 900000)}`;

    el.innerHTML = `
      ${steps}
      <div style="text-align:center;padding:12px 0;">
        <div class="success-check-circle">✓</div>
        <h2 style="font-family:var(--font-serif);font-size:1.8rem;color:var(--midnight-blue);margin-bottom:6px;">Payment Successful!</h2>
        <p style="color:var(--text-secondary);font-family:var(--font-serif);font-style:italic;margin-bottom:20px;">
          "Sleep isn't where the day ends. It is where tomorrow begins."
        </p>
        
        <!-- Founding Sleep Partner Recognition -->
        <div style="background:var(--champagne-gold-light);border:2px solid var(--champagne-gold-border);border-radius:var(--radius-md);padding:20px;max-width:380px;margin:0 auto 20px;">
          <div style="font-size:0.75rem;font-weight:700;letter-spacing:0.12em;color:var(--muted-violet);text-transform:uppercase;margin-bottom:4px;">
            ${partnerNum ? '🏅 Founding Sleep Partner' : '🌙 Verified Sleep Partner'}
          </div>
          <div style="font-family:var(--font-serif);font-size:2.2rem;font-weight:700;color:var(--midnight-blue);">
            ${partnerNum ? `#${partnerNum}` : 'Sleep Partner'}
          </div>
          <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
            Your status and order are permanently registered.
          </div>
          <button class="btn btn-gold btn-sm" style="margin-top:12px;" onclick="closeCheckout();openCertificateModal();">
            📜 View Official Certificate
          </button>
        </div>
        
        <div style="font-size:0.84rem;color:var(--text-muted);margin-bottom:20px;">
          Order ID: <strong style="color:var(--midnight-blue);">${orderId}</strong> · White-Glove delivery in 3–5 days
        </div>
        
        <div style="display:flex;flex-direction:column;gap:10px;max-width:300px;margin:0 auto;">
          <button class="btn btn-primary btn-block" onclick="closeCheckout();navigateTo('account');switchAccountPageTab('orders');">
            View Live Tracking in Account →
          </button>
          <button class="btn btn-outline btn-block" onclick="closeCheckout();goToPage('home')">
            Return to Home
          </button>
        </div>
      </div>
    `;
  }
}

function renderPaymentGatewayPanel(amount) {
  if (state.paymentMethod === 'upi') {
    return `
      <div class="upi-qr-container">
        <div class="upi-qr-box">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="var(--midnight-blue)">
            <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 4h4v4h-4v-4zm4-4h4v4h-4v-4z"/>
          </svg>
          <span style="font-size:0.65rem;color:var(--muted-violet);font-weight:700;margin-top:4px;">UPI QR Code</span>
        </div>
        <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:8px;">Scan with any UPI App or click to approve:</div>
        <div class="upi-apps-row">
          <span class="upi-app-chip" onclick="toast('GPay Intent Triggered')">Google Pay</span>
          <span class="upi-app-chip" onclick="toast('PhonePe Intent Triggered')">PhonePe</span>
          <span class="upi-app-chip" onclick="toast('Paytm Intent Triggered')">Paytm</span>
          <span class="upi-app-chip" onclick="toast('BHIM Intent Triggered')">BHIM</span>
        </div>
      </div>
    `;
  } else if (state.paymentMethod === 'card') {
    return `
      <div style="background:#fff;border:1px solid rgba(76,63,94,0.15);border-radius:var(--radius-sm);padding:18px;margin-bottom:16px;">
        <div style="margin-bottom:12px;">
          <label class="form-label">Card Number</label>
          <input class="form-input" placeholder="4242 •••• •••• 4242" id="pgCardNum" value="4242 8901 2345 6789">
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          <div><label class="form-label">Expiry</label><input class="form-input" placeholder="MM / YY" value="12/28"></div>
          <div><label class="form-label">CVV</label><input class="form-input" type="password" maxlength="3" placeholder="•••" value="888"></div>
        </div>
      </div>
    `;
  } else if (state.paymentMethod === 'netbanking') {
    return `
      <div class="bank-grid">
        <button class="bank-option-btn active">HDFC Bank</button>
        <button class="bank-option-btn">ICICI Bank</button>
        <button class="bank-option-btn">SBI</button>
        <button class="bank-option-btn">Axis Bank</button>
        <button class="bank-option-btn">Kotak</button>
        <button class="bank-option-btn">Other Banks</button>
      </div>
    `;
  } else if (state.paymentMethod === 'cod') {
    return `
      <div style="background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.15);padding:16px;border-radius:var(--radius-sm);margin-bottom:16px;font-size:0.84rem;color:var(--text-secondary);">
        📦 <strong>Cash on Delivery:</strong> Free white-glove setup. Pay via Cash or UPI at your doorstep upon unboxing.
      </div>
    `;
  }
}

function executePaymentGateway(amount) {
  if (state.paymentMethod === 'card') {
    openBankOtpModal(amount);
    return;
  }
  completeOrderProcess(amount);
}

function openBankOtpModal(amount) {
  const el = qs('#bankOtpContent');
  if (!el) return;

  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid rgba(76,63,94,0.1);">
      <div style="font-family:var(--font-serif);font-weight:700;color:var(--midnight-blue);">🔒 3D Secure 2.0 Auth</div>
      <div style="font-weight:700;color:var(--midnight-blue);">${formatPrice(amount)}</div>
    </div>
    <p style="font-size:0.84rem;color:var(--text-secondary);margin-bottom:14px;">
      A one-time password has been sent to your bank-registered mobile number.
    </p>
    <div style="margin-bottom:16px;">
      <label class="form-label">Enter Bank OTP</label>
      <input class="form-input" id="bankOtpInput" value="8942" style="font-size:1.2rem;letter-spacing:0.2em;text-align:center;">
    </div>
    <button class="btn btn-primary btn-block" onclick="
      document.getElementById('bankOtpModal').classList.remove('active');
      completeOrderProcess(${amount});
    ">Authorize & Complete Payment →</button>
  `;

  qs('#bankOtpModal')?.classList.add('active');
}

function completeOrderProcess(amount) {
  // 1. Increment live founding count
  if (state.foundingCount < FOUNDING_PARTNER_LIMIT) {
    state.foundingCount++;
    setStoredFoundingCount(state.foundingCount);
    const counterEl = qs('#foundingCounterNum');
    if (counterEl) counterEl.textContent = state.foundingCount.toLocaleString('en-IN');
  }

  // 2. Assign/Ensure user account exists and record order
  const orderId = `VH-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderObj = {
    id: orderId,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    status: 'Confirmed',
    step: 1,
    trackingId: `VH-TRK-${Math.floor(10000 + Math.random() * 90000)}`,
    items: state.cart.map(i => ({ name: `${i.product.name} (${i.size})`, price: i.product.basePrice, qty: i.qty })),
    total: amount,
    address: qs('#coAddress')?.value || 'MG Road, Bangalore'
  };

  if (!state.user) {
    state.user = {
      name: qs('#coName')?.value || 'Sleep Partner',
      phone: qs('#coPhone')?.value || '9876543210',
      email: qs('#coEmail')?.value || 'guest@velvethug.in',
      avatar: 'V',
      foundingNumber: state.foundingCount <= FOUNDING_PARTNER_LIMIT ? state.foundingCount : null,
      isFounding: state.foundingCount <= FOUNDING_PARTNER_LIMIT,
      isAmbassador: true,
      referralCode: `VELVET-${Math.floor(1000 + Math.random() * 9000)}`,
      referralStats: { count: 0, earned: 0, pending: 0 },
      orders: [orderObj],
      addresses: [{ id: 'a1', tag: 'Home', name: qs('#coName')?.value || 'Sleep Partner', phone: qs('#coPhone')?.value || '', line: qs('#coAddress')?.value || '', city: qs('#coCity')?.value || 'Bangalore', state: 'Karnataka', pincode: qs('#coPin')?.value || '560001', isDefault: true }],
      wishlist: []
    };
  } else {
    state.user.orders = state.user.orders || [];
    state.user.orders.unshift(orderObj);
    if (!state.user.foundingNumber && state.foundingCount <= FOUNDING_PARTNER_LIMIT) {
      state.user.foundingNumber = state.foundingCount;
      state.user.isFounding = true;
    }
  }

  saveStoredUser(state.user);
  updateHeaderUserUI();

  // 3. Sync to Admin Portal Store & Audit Trail (Real-time live reflection)
  try {
    const rawAdmin = localStorage.getItem('vh_admin_store_v1');
    const adminStore = rawAdmin ? JSON.parse(rawAdmin) : { orders: [], inventory: {} };
    adminStore.orders = adminStore.orders || [];

    const itemsSummary = (state.cart || []).map(i => `${i.product.name} (${i.size}) × ${i.qty}`).join(', ');

    const newAdminOrder = {
      id: orderId,
      customer: state.user.name,
      phone: `+91 ${state.user.phone}`,
      email: state.user.email || `${state.user.phone}@velvethug.in`,
      partnerNum: state.user.foundingNumber || 'Sleep Partner',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: itemsSummary || 'Velvet Hug Sleep System',
      amount: amount,
      paymentMode: state.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : (state.paymentMethod === 'upi' ? 'UPI (Google Pay / PhonePe)' : (state.paymentMethod === 'card' ? 'Credit/Debit Card (3D Secure)' : 'Net Banking')),
      paymentStatus: state.paymentMethod === 'cod' ? 'Pending Doorstep Verification' : 'Reconciled & Settled',
      deliveryStatus: 'Crafted in Lab',
      trackingId: orderObj.trackingId,
      address: qs('#coAddress')?.value || 'Indiranagar, Bangalore'
    };

    adminStore.orders.unshift(newAdminOrder);
    localStorage.setItem('vh_admin_store_v1', JSON.stringify(adminStore));

    // Log to immutable Audit Trail
    const rawAudit = localStorage.getItem('vh_admin_audit_logs');
    const auditLogs = rawAudit ? JSON.parse(rawAudit) : [];
    auditLogs.unshift({
      id: `aud_${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      user: 'E-Commerce Storefront',
      role: 'Customer Checkout',
      module: 'Orders',
      action: 'New Order Placed',
      details: `New order ${orderId} placed by ${state.user.name} (${itemsSummary}) totaling ₹${amount.toLocaleString('en-IN')}`,
      ip: '127.0.0.1 (Customer Client)'
    });
    localStorage.setItem('vh_admin_audit_logs', JSON.stringify(auditLogs.slice(0, 200)));
  } catch (e) {
    console.error('Error syncing order to admin store:', e);
  }

  // 4. Clear cart and persist
  state.cart = [];
  saveStoredCart(state.cart);
  updateCartBadge();

  // 5. Advance to success screen
  state.checkoutStep = 'success';
  renderCheckout();
  toast('🎉 Order Confirmed! You are now a Sleep Partner.');
}

function proceedToPayment() {
  const nameInput = qs('#coName');
  const phoneInput = qs('#coPhone');
  const name = nameInput?.value?.trim() || state.user?.name || 'Sleep Partner';
  const phone = phoneInput?.value?.trim() || state.user?.phone || '9876543210';
  
  if (!name || !phone) {
    toast('Please enter your name and phone number');
    return;
  }
  
  // Save temporary shipping details
  if (state.user) {
    state.user.name = name;
    state.user.phone = phone;
    const addr = qs('#coAddress')?.value?.trim();
    const city = qs('#coCity')?.value?.trim();
    const st = qs('#coState')?.value?.trim();
    const pin = qs('#coPin')?.value?.trim();
    if (addr && !state.user.addresses?.length) {
      state.user.addresses = [{ id: 'a1', tag: 'Home', name, phone, line: addr, city: city || 'Bangalore', state: st || 'Karnataka', pincode: pin || '560001', isDefault: true }];
    }
    saveStoredUser(state.user);
  }
  
  state.checkoutStep = 'payment';
  renderCheckout();
}

function backToCheckoutDetails() {
  state.checkoutStep = 'details';
  renderCheckout();
}

function applyCheckoutCoupon(customCode) {
  const val = (customCode || qs('#coCouponInput')?.value)?.trim().toUpperCase();
  if (!val) return;
  const rawTotal = getCartTotal();
  const coupons = getActiveCoupons();
  const match = coupons.find(c => c.code.toUpperCase() === val);
  
  if (match) {
    if (match.minOrder && rawTotal < match.minOrder) {
      toast(`Coupon ${val} requires minimum cart total of ₹${match.minOrder.toLocaleString('en-IN')}`);
      return;
    }
    state.appliedCoupon = val;
    toast(`✓ Coupon ${val} applied! (${match.discountPct}% OFF)`);
    renderCheckout();
  } else {
    toast(`Invalid coupon code. Available: ${coupons.map(c => c.code).slice(0, 3).join(', ')}`);
  }
}

window.applyDirectCoupon = function(code) {
  applyCheckoutCoupon(code);
};

// ────────────────────────────────────────────────────────────
// STOREFRONT MODAL HANDLERS: CORPORATE GIFTING, STORIES, REVIEWS
// ────────────────────────────────────────────────────────────

// 1. Corporate Gifting Modal
window.openCorporateGiftingModal = function() {
  qs('#corporateGiftingModal')?.classList.add('active');
};

window.closeCorporateGiftingModal = function() {
  qs('#corporateGiftingModal')?.classList.remove('active');
};

window.submitCorporateGiftingForm = function(e) {
  e.preventDefault();
  const company = qs('#corpCompanyName')?.value?.trim();
  const contactName = qs('#corpContactName')?.value?.trim();
  const email = qs('#corpEmail')?.value?.trim();
  const phone = qs('#corpPhone')?.value?.trim();
  const requirement = qs('#corpRequirement')?.value;
  const quantity = parseInt(qs('#corpQuantity')?.value || '50', 10);
  const budget = qs('#corpBudget')?.value?.trim() || '₹2,50,000';
  const notes = qs('#corpNotes')?.value?.trim() || 'Direct website inquiry';

  if (!company || !contactName || !phone) return;

  let store = {};
  try {
    const raw = localStorage.getItem('vh_admin_store_v1');
    if (raw) store = JSON.parse(raw);
  } catch (err) {}

  if (!store.crmLeads) store.crmLeads = [];

  const newLead = {
    id: `crm_${Date.now()}`,
    company,
    contactName,
    email,
    phone,
    requirement,
    quantity,
    dealValue: budget,
    status: 'New Enquiry',
    rep: 'Direct Website Lead',
    notes,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  };

  store.crmLeads.unshift(newLead);
  localStorage.setItem('vh_admin_store_v1', JSON.stringify(store));

  window.closeCorporateGiftingModal();
  toast(`✓ Corporate inquiry received for ${company}! Our B2B concierge will connect shortly.`);
};

// 2. Customer Sleep Story Submission Modal
window.openSubmitStoryModal = function() {
  qs('#submitStoryModal')?.classList.add('active');
};

window.closeSubmitStoryModal = function() {
  qs('#submitStoryModal')?.classList.remove('active');
};

window.submitCustomerStoryForm = function(e) {
  e.preventDefault();
  const author = qs('#storyCustName')?.value?.trim();
  const city = qs('#storyCustCity')?.value?.trim();
  const story = qs('#storyCustText')?.value?.trim();
  const mediaType = qs('#storyCustMediaType')?.value || 'WhatsApp Video Reel (0:45)';
  const consentDpdp = qs('#storyCustDpdp')?.checked;

  if (!author || !story) return;

  let store = {};
  try {
    const raw = localStorage.getItem('vh_admin_store_v1');
    if (raw) store = JSON.parse(raw);
  } catch (err) {}

  if (!store.storySubmissions) store.storySubmissions = [];

  const newSubmission = {
    id: `st_${Date.now()}`,
    author,
    city,
    partnerNum: state.user?.foundingNumber || Math.floor(100 + Math.random() * 400),
    mediaType,
    story,
    consentDpdp: !!consentDpdp,
    consentDate: new Date().toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    rewardStatus: 'Cash Reward ₹5,000 Eligible',
    status: 'Approved & Featured'
  };

  store.storySubmissions.unshift(newSubmission);
  localStorage.setItem('vh_admin_store_v1', JSON.stringify(store));

  window.closeSubmitStoryModal();
  toast(`🎉 Thank you ${author}! Your sleep story has been submitted for ₹5,000 reward.`);
};

// 3. Post-Delivery Verified Review Modal
window.openOrderReviewModal = function(orderId, prodName) {
  const modal = qs('#orderReviewModal');
  if (!modal) return;
  const label = qs('#orderReviewProductLabel');
  if (label) label.textContent = `Product: ${prodName}`;
  const idInput = qs('#orderReviewOrderId');
  if (idInput) idInput.value = orderId;
  const prodInput = qs('#orderReviewProductName');
  if (prodInput) prodInput.value = prodName;
  modal.classList.add('active');
};

window.closeOrderReviewModal = function() {
  qs('#orderReviewModal')?.classList.remove('active');
};

window.setReviewRating = function(rating) {
  const input = qs('#orderReviewRatingVal');
  if (input) input.value = rating;
  const starContainer = qs('#starRatingGroup');
  if (starContainer) {
    const stars = starContainer.querySelectorAll('span');
    stars.forEach((s, idx) => {
      s.textContent = idx < rating ? '★' : '☆';
    });
  }
};

window.submitOrderReviewForm = function(e) {
  e.preventDefault();
  const orderId = qs('#orderReviewOrderId')?.value;
  const prodName = qs('#orderReviewProductName')?.value || 'Velvet Hug Mattress';
  const rating = parseInt(qs('#orderReviewRatingVal')?.value || '5', 10);
  const comment = qs('#orderReviewText')?.value?.trim();
  const doctorRec = !!qs('#orderReviewDoctor')?.checked;

  if (!comment) return;

  let store = {};
  try {
    const raw = localStorage.getItem('vh_admin_store_v1');
    if (raw) store = JSON.parse(raw);
  } catch (err) {}

  if (!store.reviews) store.reviews = [];

  const authorName = state.user?.name || 'Verified Sleeper';
  const city = state.user?.addresses?.[0]?.city || 'India';

  const newReview = {
    id: `rev_${Date.now()}`,
    product: prodName,
    author: doctorRec ? `Dr. ${authorName}` : authorName,
    city,
    rating,
    date: 'Just now',
    comment,
    doctorRec,
    status: 'Approved'
  };

  store.reviews.unshift(newReview);
  localStorage.setItem('vh_admin_store_v1', JSON.stringify(store));

  // Mark order as reviewed
  if (state.user && state.user.orders) {
    const targetOrder = state.user.orders.find(o => o.id === orderId);
    if (targetOrder) targetOrder.hasReviewed = true;
    saveStoredUser(state.user);
  }

  window.closeOrderReviewModal();
  toast('⭐ Verified review published! Thank you for sharing your rest experience.');
  renderAccountTabContent('orders');
};

window.simulateDelivery = function(orderId) {
  if (state.user && state.user.orders) {
    const targetOrder = state.user.orders.find(o => o.id === orderId);
    if (targetOrder) {
      targetOrder.step = 4;
      targetOrder.status = 'Delivered';
      saveStoredUser(state.user);
      
      // Also update in admin store if exists
      try {
        const raw = localStorage.getItem('vh_admin_store_v1');
        if (raw) {
          const store = JSON.parse(raw);
          const adminOrder = (store.orders || []).find(o => o.id === orderId);
          if (adminOrder) {
            adminOrder.status = 'Delivered & Reconciled';
            adminOrder.step = 4;
            localStorage.setItem('vh_admin_store_v1', JSON.stringify(store));
          }
        }
      } catch (err) {}

      toast(`🚚 Order #${orderId} marked as Delivered!`);
      renderAccountTabContent('orders');
    }
  }
};

// Window Global Exports
window.state = state;
window.toast = toast;
window.proceedToPayment = proceedToPayment;
window.backToCheckoutDetails = backToCheckoutDetails;
window.applyCheckoutCoupon = applyCheckoutCoupon;
window.renderCheckout = renderCheckout;
window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;
window.setPaymentMethod = setPaymentMethod;
window.executePaymentGateway = executePaymentGateway;
window.completeOrderProcess = completeOrderProcess;
window.openBankOtpModal = openBankOtpModal;

// ────────────────────────────────────────────────────────────
// SLEEP QUIZ
// ────────────────────────────────────────────────────────────
function initQuiz() {
  qs('#quizBtn')?.addEventListener('click', openQuiz);
  qs('#quizModalClose')?.addEventListener('click', closeQuiz);
  qs('#quizModalBackdrop')?.addEventListener('click', e => {
    if (e.target === qs('#quizModalBackdrop')) closeQuiz();
  });
}

function openQuiz() {
  state.quizStep = 0;
  state.quizAnswers = {};
  renderQuizStep();
  qs('#quizModalBackdrop')?.classList.add('active');
}

function closeQuiz() {
  qs('#quizModalBackdrop')?.classList.remove('active');
}

function getActiveQuizQuestions() {
  try {
    const raw = localStorage.getItem('vh_quiz_questions');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return SLEEP_QUIZ;
}

function renderQuizStep() {
  const el = qs('#quizContent');
  if (!el) return;
  const questions = getActiveQuizQuestions();

  if (state.quizStep >= questions.length) {
    renderQuizResults();
    return;
  }
  const q = questions[state.quizStep];
  const pct = Math.round(((state.quizStep) / questions.length) * 100);
  el.innerHTML = `
    <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width:${pct}%"></div></div>
    <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:4px;">Question ${state.quizStep + 1} of ${questions.length}</div>
    <h3 style="font-family:var(--font-serif);font-size:1.25rem;font-weight:700;color:var(--midnight-blue);margin-bottom:4px;">${q.question}</h3>
    <p style="font-size:0.84rem;color:var(--text-secondary);margin-bottom:16px;">${q.sub || ''}</p>
    <div class="quiz-options-list">
      ${(q.options || []).map((opt, oIdx) => `
        <div class="quiz-option-card" data-qid="${q.id || state.quizStep}" data-oid="${opt.id || oIdx}">
          <div style="font-size:1.5rem;margin-bottom:8px;">${opt.emoji || '✨'}</div>
          <div class="quiz-option-title">${opt.label}</div>
          <div class="quiz-option-sub">${opt.sub || ''}</div>
        </div>
      `).join('')}
    </div>`;

  qsa('.quiz-option-card', el).forEach(card => {
    card.addEventListener('click', () => {
      state.quizAnswers[card.dataset.qid] = card.dataset.oid;
      state.quizStep++;
      renderQuizStep();
    });
  });
}

function renderQuizResults() {
  const el = qs('#quizContent');
  if (!el) return;
  const ans = state.quizAnswers;

  let budget = ans.q4;
  let health = ans.q5;

  let recommended = PRODUCTS.filter(p => p.category === 'mattresses');
  if (budget === 'essential') recommended = recommended.filter(p => p.basePrice <= 18000);
  else if (budget === 'comfort') recommended = recommended.filter(p => p.basePrice <= 35000);
  else if (budget === 'premium') recommended = recommended.filter(p => p.basePrice <= 65000);

  if (health === 'backpain') recommended = recommended.filter(p => p.doctorRecommended || p.tags?.includes('ortho'));
  if (health === 'hot') recommended = recommended.filter(p => p.tags?.includes('cooling') || p.materials?.includes('Natural Latex'));

  if (!recommended.length) recommended = PRODUCTS.filter(p => p.category === 'mattresses').slice(0, 3);
  recommended = recommended.slice(0, 3);

  el.innerHTML = `
    <div style="text-align:center;margin-bottom:20px;">
      <div style="font-size:2.5rem;margin-bottom:8px;">✨</div>
      <h3 style="font-family:var(--font-serif);font-size:1.35rem;color:var(--midnight-blue);margin-bottom:4px;">Your Tailored Sleep Recommendations</h3>
      <p style="font-size:0.86rem;color:var(--text-secondary);">Scientifically matched to your posture and comfort requirements.</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px;max-height:360px;overflow-y:auto;">
      ${recommended.map(p => `
        <div style="display:flex;align-items:center;gap:14px;background:var(--bg-secondary);border:1px solid rgba(76,63,94,0.1);border-radius:var(--radius-sm);padding:14px;cursor:pointer;" 
             onclick="closeQuiz();openPDP(getProductById('${p.id}'))">
          <img src="${p.image}" alt="${p.name}" style="width:70px;height:60px;object-fit:cover;border-radius:var(--radius-xs);"
               onerror="this.style.display='none'">
          <div style="flex:1;">
            <div style="font-family:var(--font-serif);font-weight:600;color:var(--midnight-blue);">${p.name}</div>
            <div style="font-size:0.78rem;color:var(--text-muted);">${p.collection}</div>
            <div style="font-size:0.88rem;font-weight:700;color:var(--midnight-blue);margin-top:3px;">${formatPrice(p.basePrice)}</div>
          </div>
          <span class="badge ${getBadgeClass(p.badge)}">${p.badgeLabel}</span>
        </div>
      `).join('')}
    </div>
    <div style="display:flex;gap:8px;margin-top:18px;">
      <button class="btn btn-outline btn-sm" onclick="state.quizStep=0;state.quizAnswers={};renderQuizStep()">Retake Quiz</button>
      <button class="btn btn-primary btn-sm btn-block" onclick="closeQuiz();goToPage('mattresses')">Browse All Mattresses</button>
    </div>`;
}

window.openQuiz = openQuiz;
window.closeQuiz = closeQuiz;

// ────────────────────────────────────────────────────────────
// DOCTOR RECOMMENDATIONS MODAL
// ────────────────────────────────────────────────────────────
function openDoctorModal(productId) {
  const product = getProductById(productId);
  const el = qs('#doctorModalContent');
  if (!el || !product) return;
  const doc = DOCTORS[Math.floor(Math.random() * DOCTORS.length)];
  el.innerHTML = `
    <button class="modal-close-icon" onclick="closeDoctorModal()">✕</button>
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
      <div class="doctor-avatar-wrap">🩺</div>
      <div>
        <div style="font-family:var(--font-serif);font-size:1.1rem;font-weight:600;color:var(--midnight-blue);">${doc.name}</div>
        <div style="font-size:0.82rem;color:var(--muted-violet);">${doc.specialty}</div>
        <div style="color:#F59E0B;font-size:0.8rem;">⭐ ${doc.rating}</div>
      </div>
    </div>
    <div style="background:var(--bg-secondary);border-left:3px solid var(--champagne-gold);padding:16px;border-radius:0 var(--radius-sm) var(--radius-sm) 0;margin-bottom:16px;">
      <p style="font-family:var(--font-serif);font-style:italic;color:var(--text-secondary);font-size:0.95rem;">"${doc.says}"</p>
    </div>
    <div style="font-size:0.84rem;color:var(--text-secondary);line-height:1.65;margin-bottom:16px;">
      The <strong>${product.name}</strong> is clinically validated for ${product.tags?.includes('ortho') ? 'orthopaedic support and spinal alignment' : 'healthy sleep posture'}.
    </div>
    <button class="btn btn-primary btn-block" onclick="closeDoctorModal();openPDP(getProductById('${productId}'))">View ${product.name}</button>`;
  qs('#doctorModalBackdrop')?.classList.add('active');
}

function closeDoctorModal() {
  qs('#doctorModalBackdrop')?.classList.remove('active');
}

window.openDoctorModal = openDoctorModal;
window.closeDoctorModal = closeDoctorModal;

// ────────────────────────────────────────────────────────────
// HOME PAGE INITIALIZATION
// ────────────────────────────────────────────────────────────
function initHomePage() {
  const hallEl = qs('#partnersHonorHall');
  if (hallEl) {
    hallEl.innerHTML = MOCK_FOUNDING_PARTNERS.map(p => `
      <div class="partner-honor-chip">
        <div class="partner-honor-num">#${p.num}</div>
        <div class="partner-honor-name">${p.name}</div>
        <div class="partner-honor-city">${p.city}</div>
      </div>
    `).join('');
  }
}

// ────────────────────────────────────────────────────────────
// CONSUMER THEME CONTROLLER (Dark / Light Mode)
// ────────────────────────────────────────────────────────────
function initConsumerTheme() {
  const savedTheme = localStorage.getItem('vh_consumer_theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-theme');
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.body.classList.remove('dark-theme');
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = qs('#themeToggleIcon');
  const isDark = document.body.classList.contains('dark-theme') || document.documentElement.getAttribute('data-theme') === 'dark';
  if (icon) icon.textContent = isDark ? '☀️' : '🌙';
}

window.toggleConsumerTheme = function() {
  const isDark = document.body.classList.contains('dark-theme') || document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    document.body.classList.remove('dark-theme');
    localStorage.setItem('vh_consumer_theme', 'light');
    toast('☀️ Light Mode activated');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-theme');
    localStorage.setItem('vh_consumer_theme', 'dark');
    toast('🌙 Dark Mode activated');
  }
  updateThemeIcon();
};

// ────────────────────────────────────────────────────────────
// MASTER INIT
// ────────────────────────────────────────────────────────────
function init() {
  initConsumerTheme();
  initPromoBanner();
  initNavigation();
  initSoundscape();
  initSearch();
  initCart();
  initCompare();
  initCheckout();
  initQuiz();
  initAuth();
  initFoundingCounter();
  initHomePage();

  // Initial category renders
  renderCategoryPage('mattresses');
  renderCategoryPage('pillows');
  renderCategoryPage('cushions');
  renderCategoryPage('bolsters');
  renderCategoryPage('accessories');

  // Initial route without pushing duplicate history
  const initialPage = window.location.hash.replace('#', '') || 'home';
  history.replaceState({ page: initialPage }, '', initialPage === 'home' ? '#' : `#${initialPage}`);
  navigateTo(initialPage, false);

  console.log('🛏️ Velvet Hug — Be Held, Every Night. Complete Application Ready.');
}

document.addEventListener('DOMContentLoaded', init);
