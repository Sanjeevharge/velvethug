// src/main.js — Velvet Hug Complete Application
// Multi-page SPA with router, cart, compare, checkout, payment gateway, quiz, soundscape, founding partner counter, OTP/Google auth, and customer account hub

import {
  PRODUCTS, CATEGORIES, FILTER_AXES, SLEEP_QUIZ, DOCTORS,
  MOCK_FOUNDING_PARTNERS, INITIAL_PARTNER_COUNT, FOUNDING_PARTNER_LIMIT,
  ACTIVE_PROMOS, MATTRESS_LAYERS, FABRIC_FEATURES,
  getProductsByCategory, searchProducts, formatPrice, getProductById,
  EMI_BANKS, EMI_FINTECH_PARTNERS, calculateEMI,
  RETURN_POLICY_DETAILS,
  checkPincodeDelivery, PINCODE_ZONES, MATTRESS_FILTER_SCHEMA, filterAndSortMattresses
} from './data/products.js';

import {
  getStoredReturns,
  saveStoredReturns
} from './data/adminStore.js';

import { soundEngine } from './components/Soundscape.js';

// ────────────────────────────────────────────────────────────
// PERSISTENT STATE & STORAGE HELPERS
// ────────────────────────────────────────────────────────────
const STORAGE_KEY_USER = 'vh_user_data';
const STORAGE_KEY_CART = 'vh_cart_data';
const STORAGE_KEY_FOUNDING = 'vh_founding_count';

function purgeLegacyMockUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_USER);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed && (
        parsed.name === 'Arjun Sharma' ||
        parsed.email === 'arjun.sharma@gmail.com' ||
        parsed.phone === '9876543210' ||
        parsed.phone === '+91 98765 43210' ||
        parsed.referralCode === 'VELVET-ARJUN212'
      )) {
        localStorage.removeItem(STORAGE_KEY_USER);
      }
    }
    const allUsersRaw = localStorage.getItem('vh_registered_users');
    if (allUsersRaw) {
      const allUsers = JSON.parse(allUsersRaw);
      let changed = false;
      for (const k of Object.keys(allUsers)) {
        const u = allUsers[k];
        if (u && (
          u.name === 'Arjun Sharma' ||
          u.email === 'arjun.sharma@gmail.com' ||
          u.phone === '9876543210' ||
          u.phone === '+91 98765 43210' ||
          u.referralCode === 'VELVET-ARJUN212'
        )) {
          delete allUsers[k];
          changed = true;
        }
      }
      if (changed) {
        localStorage.setItem('vh_registered_users', JSON.stringify(allUsers));
      }
    }
    const rawAdmin = localStorage.getItem('vh_admin_store_v1');
    if (rawAdmin) {
      const adminStore = JSON.parse(rawAdmin);
      if (adminStore.orders && Array.isArray(adminStore.orders)) {
        const filtered = adminStore.orders.filter(o => 
          o.customer !== 'Arjun Sharma' && 
          o.email !== 'arjun.sharma@gmail.com' && 
          o.phone !== '+91 9876543210' && 
          o.phone !== '+91 98765 43210'
        );
        if (filtered.length !== adminStore.orders.length) {
          adminStore.orders = filtered;
          localStorage.setItem('vh_admin_store_v1', JSON.stringify(adminStore));
        }
      }
    }
  } catch (e) {}
}
purgeLegacyMockUser();

function loadStoredUser() {
  purgeLegacyMockUser();
  try {
    const data = localStorage.getItem(STORAGE_KEY_USER);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed && (
        parsed.name === 'Arjun Sharma' ||
        parsed.email === 'arjun.sharma@gmail.com' ||
        parsed.phone === '9876543210' ||
        parsed.phone === '+91 98765 43210' ||
        parsed.referralCode === 'VELVET-ARJUN212'
      )) {
        localStorage.removeItem(STORAGE_KEY_USER);
        return null;
      }
      return parsed;
    }
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
  mattressFilters: { preset: 'all', sizes: [], firmness: [], materials: [], sleepNeeds: [], thickness: [], maxPrice: null },
  mattressSort: 'recommended',
  rememberedPincode: localStorage.getItem('vh_checked_pincode') || '600028',
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

window.qs = qs;
window.qsa = qsa;

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
  
  // Consolidate cushions and bolsters under accessories category view
  if (page === 'cushions' || page === 'bolsters') {
    state.activeAccSubTab = page === 'cushions' ? 'Cushions' : 'Bolsters';
    page = 'accessories';
  }

  // Prevent duplicate navigation pushes to history, but re-render content if already on the page
  if (page === state.currentPage) {
    if (page === 'account') renderAccountPage();
    if (['mattresses', 'pillows', 'accessories'].includes(page)) renderCategoryPage(page);
    if (page === 'emi') renderEmiPage();
    if (page === 'returns') renderReturnsPage();
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

  // Carousel pause/resume on navigation
  if (page === 'home') {
    if (window._resumeHeroCarousel) window._resumeHeroCarousel();
  } else {
    if (window._pauseHeroCarousel) window._pauseHeroCarousel();
  }

  // If navigating to a category page, render its contents
  if (['mattresses', 'pillows', 'accessories'].includes(page)) {
    state.activeCategory = page;
    renderCategoryPage(page);
  }

  // If navigating to account page, render it
  if (page === 'account') {
    renderAccountPage();
  }

  // If navigating to EMI page, render it
  if (page === 'emi') {
    renderEmiPage();
  }

  // If navigating to Returns policy page, render it
  if (page === 'returns') {
    renderReturnsPage();
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
  const promoMsgEl = qs('#promoMessage');
  if (!counterEl) return;

  function update(count) {
    state.foundingCount = count;
    setStoredFoundingCount(state.foundingCount);
    if (counterEl) counterEl.textContent = state.foundingCount.toLocaleString('en-IN');
    const pct = Math.min(100, Math.round((state.foundingCount / 1000) * 100));
    if (fillEl) fillEl.style.width = pct + '%';
    if (labelEl) {
      if (state.foundingCount >= 1000) {
        labelEl.textContent = `All 1,000 Founding spots claimed! Now welcoming Sleep Partner #${state.foundingCount + 1}`;
      } else {
        const remaining = 1000 - state.foundingCount;
        labelEl.textContent = `${remaining} Founding spots remaining of 1,000`;
      }
    }
    if (promoMsgEl) {
      if (state.foundingCount <= 1000) {
        promoMsgEl.textContent = `First 1,000 Sleep Partners — 15% Lifetime Price Lock (${state.foundingCount} Claimed)`;
      } else {
        promoMsgEl.textContent = `Over ${state.foundingCount.toLocaleString('en-IN')} Rested Sleep Partners Across India — Code FOUNDING15`;
      }
    }
  }
  update(state.foundingCount);

  // Simulated live increment continues perpetually past 1000
  function liveIncrement() {
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

  // Global Cmd+K / Ctrl+K shortcut
  window.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchModal?.classList.add('active');
      setTimeout(() => searchInput?.focus(), 100);
    }
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

function getStoredWishlist() {
  try {
    const raw = localStorage.getItem('vh_wishlist');
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}
function setStoredWishlist(list) {
  try { localStorage.setItem('vh_wishlist', JSON.stringify(list)); } catch (e) {}
}

window.toggleWishlist = function(productId, btnEl) {
  let list = getStoredWishlist();
  const exists = list.includes(productId);
  if (exists) {
    list = list.filter(id => id !== productId);
    setStoredWishlist(list);
    if (btnEl) btnEl.classList.remove('active');
    toast('Removed from Sleep Wishlist');
  } else {
    list.push(productId);
    setStoredWishlist(list);
    if (btnEl) btnEl.classList.add('active');
    toast('❤️ Saved to Sleep Wishlist');
  }
};

window.isWishlisted = function(productId) {
  return getStoredWishlist().includes(productId);
};

function updateCartBadge() {
  const totalItems = state.cart.reduce((sum, i) => sum + i.qty, 0);
  const badge = qs('#cartBadge');
  if (badge) {
    badge.textContent = totalItems;
    badge.style.transform = 'scale(1.3)';
    setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
  }
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
  state.selectedPDPSize = (product.sizes && product.sizes.length > 0) ? product.sizes[0] : 'Standard';
  renderPDP(product);
  const modal = qs('#pdpModal');
  if (modal) {
    modal.classList.add('active');
    modal.scrollTo(0, 0);
  }
  document.body.style.overflow = 'hidden';
}

function closePDP() {
  qs('#pdpModal')?.classList.remove('active');
  state.pdpProduct = null;
  document.body.style.overflow = '';
}

function selectPDPSize(btn) {
  if (!btn || !state.pdpProduct) return;
  const size = btn.getAttribute('data-size');
  state.selectedPDPSize = size;

  // Update active state on size chip buttons
  const chips = qsa('.pdp-chip-btn', qs('#pdpSizeChips') || document);
  chips.forEach(c => c.classList.remove('active'));
  btn.classList.add('active');

  // Compute scaled prices using size multiplier
  const multiplier = getSizeMultiplier(size);
  const base = state.pdpProduct.basePrice;
  const mrp = state.pdpProduct.mrp;
  const currentPrice = Math.round(base * multiplier);
  const currentMrp = Math.round(mrp * multiplier);
  const currentDiscount = currentMrp - currentPrice;
  const discountPct = state.pdpProduct.discount || Math.round((currentDiscount / currentMrp) * 100);
  const emiMonthly = Math.round(currentPrice / 12);

  // Update DOM elements in PDP
  const currentPriceEl = qs('#pdpCurrentPrice');
  const mrpEl = qs('#pdpMrpPrice');
  const saveTextEl = qs('#pdpSaveText');
  const emiMonthlyEl = qs('#pdpEmiMonthlyVal');

  if (currentPriceEl) currentPriceEl.textContent = formatPrice(currentPrice);
  if (mrpEl) mrpEl.textContent = formatPrice(currentMrp);
  if (saveTextEl) saveTextEl.textContent = `Save ${formatPrice(currentDiscount)} (${discountPct}% off)`;
  if (emiMonthlyEl) emiMonthlyEl.textContent = `₹${emiMonthly.toLocaleString('en-IN')}/mo`;
}

function openEmiModalForCurrentPDP() {
  if (!state.pdpProduct) return;
  const size = state.selectedPDPSize || (state.pdpProduct.sizes && state.pdpProduct.sizes[0]) || 'Standard';
  const mult = getSizeMultiplier(size);
  const price = Math.round(state.pdpProduct.basePrice * mult);
  const title = `${state.pdpProduct.name} (${size})`;
  openEmiModal(price, title);
}

function addToCartFromPDP() {
  if (!state.pdpProduct) return;
  const size = state.selectedPDPSize || (state.pdpProduct.sizes && state.pdpProduct.sizes[0]) || 'Standard';
  const mult = getSizeMultiplier(size);
  const price = Math.round(state.pdpProduct.basePrice * mult);
  addToCart(state.pdpProduct.id, size, 1, price);
  closePDP();
}

function openCheckoutDirect() {
  if (state.pdpProduct) {
    const size = state.selectedPDPSize || (state.pdpProduct.sizes && state.pdpProduct.sizes[0]) || 'Standard';
    const mult = getSizeMultiplier(size);
    const price = Math.round(state.pdpProduct.basePrice * mult);
    addToCart(state.pdpProduct.id, size, 1, price);
  }
  closePDP();
  openCheckout();
}

function togglePdpPolicy() {
  const body = qs('#pdpPolicyDetails');
  const chevron = qs('#pdpPolicyChevron');
  if (!body) return;
  const isHidden = body.style.display === 'none' || !body.style.display;
  body.style.display = isHidden ? 'block' : 'none';
  if (chevron) chevron.textContent = isHidden ? '▲' : '▼';
}

window.openPDP = openPDP;
window.closePDP = closePDP;
window.selectPDPSize = selectPDPSize;
window.openEmiModalForCurrentPDP = openEmiModalForCurrentPDP;
window.addToCartFromPDP = addToCartFromPDP;
window.openCheckoutDirect = openCheckoutDirect;
window.togglePdpPolicy = togglePdpPolicy;

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
        ${product.doctorRecommended ? '<span class="badge badge-new" style="display:inline-flex;align-items:center;gap:4px;"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg> Doctor Recommended</span>' : ''}
      </div>
      <h2 style="font-family:var(--font-serif);font-size:1.7rem;font-weight:700;color:var(--text-primary);margin-bottom:4px;letter-spacing:-0.02em;">${product.name}</h2>
      <p style="font-family:var(--font-serif);font-style:italic;color:var(--text-secondary);margin-bottom:14px;">"${product.tagline}"</p>
      
      <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:14px;margin-bottom:16px;">
        <div style="display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;">
          <span style="font-size:1.7rem;font-weight:800;color:var(--text-primary);" id="pdpCurrentPrice">${formatPrice(product.basePrice)}</span>
          <span style="color:var(--text-muted);text-decoration:line-through;font-size:1rem;" id="pdpMrpPrice">${formatPrice(product.mrp)}</span>
          <span style="color:var(--accent-emerald);font-weight:700;font-size:0.86rem;" id="pdpSaveText">Save ${formatPrice(discountedAmt)} (${product.discount}% off)</span>
        </div>
        <div style="font-size:0.78rem;color:var(--text-muted);margin-top:4px;cursor:pointer;display:flex;align-items:center;gap:6px;" id="pdpEmiText" onclick="window.openEmiModalForCurrentPDP()">
          <span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" style="display:inline-block;vertical-align:-2px;margin-right:2px;"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg> No-cost EMI from <strong style="color:var(--midnight-blue);" id="pdpEmiMonthlyVal">₹${Math.round(product.basePrice / 12).toLocaleString('en-IN')}/mo</strong></span>
          <span style="color:var(--champagne-gold);font-weight:700;text-decoration:underline;">View All Plans →</span>
        </div>
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
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <label class="form-label" style="margin-bottom:0;">Firmness</label>
          <span style="font-size:0.82rem;font-weight:700;color:var(--midnight-blue);">${product.firmness} (${product.firmnessScore}/10)</span>
        </div>
        <div class="meter-bar-track firmness-track">
          <div class="meter-bar-fill" style="width:${product.firmnessScore * 10}%;height:100%;background:linear-gradient(90deg,var(--muted-violet),var(--midnight-blue));border-radius:999px;"></div>
          <div class="firmness-thumb" style="left:${product.firmnessScore * 10}%;"></div>
        </div>
      </div>` : ''}
      
      <!-- Action Buttons -->
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:20px;">
        <button class="btn btn-gold btn-lg btn-block" onclick="addToCartFromPDP()">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> Add to Cart
        </button>
        <button class="btn btn-outline btn-lg btn-block" onclick="closePDP();openCheckoutDirect()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Instant Buy Now
        </button>
      </div>
      
      <!-- Pincode Delivery Check -->
      <div style="margin-top:16px;">
        <label class="form-label" style="font-size:0.82rem;font-weight:700;color:var(--midnight-blue);display:flex;align-items:center;gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg> Check Delivery Speed &amp; White-Glove Installation (Dispatched from Chennai Hub)
        </label>
        <div style="display:flex;gap:8px;">
          <input class="form-input" placeholder="Enter 6-digit Indian Pincode (e.g. 600028)" maxlength="6" id="pdpPincodeInput" value="${state.rememberedPincode || '600028'}" style="flex:1;">
          <button class="btn btn-outline btn-sm" onclick="window.checkPincodeDeliveryUI(document.getElementById('pdpPincodeInput').value, 'pdpPincodeResult')">Check Speed</button>
        </div>
        <div id="pdpPincodeResult" style="margin-top:6px;"></div>
      </div>

      <!-- 100-Night Trial & Returns Accordion -->
      <div class="pdp-policy-box">
        <div class="pdp-policy-header" onclick="window.togglePdpPolicy()">
          <span style="font-weight:700;color:var(--midnight-blue);font-size:0.84rem;display:flex;align-items:center;gap:6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg> 100-Night Risk-Free Sleep Trial &amp; 10-Yr Warranty
          </span>
          <span id="pdpPolicyChevron" style="font-size:0.8rem;color:var(--text-muted);">▼</span>
        </div>
        <div id="pdpPolicyDetails" class="pdp-policy-body" style="display:none;">
          • <strong>100 Nights at Home:</strong> Sleep for 30 nights to let your spine adapt. Full refund if not in love.<br>
          • <strong>Zero Reverse Shipping Fees:</strong> 100% free white-glove reverse pickup from your bedroom.<br>
          • <strong>1-Time Firmness Exchange:</strong> Switch to softer or firmer feel free of charge anytime.<br>
          <a href="javascript:void(0)" onclick="closePDP();goToPage('returns')" style="color:var(--champagne-gold);font-weight:700;margin-top:4px;display:inline-block;">Read Full 100-Night Return Terms →</a>
        </div>
      </div>
    </div>
  `;

  // Auto-run pincode evaluation on render
  setTimeout(() => {
    window.checkPincodeDeliveryUI(state.rememberedPincode || '600028', 'pdpPincodeResult');
  }, 50);
}

window.checkPincodeDeliveryUI = function(inputVal, resultContainerId) {
  const resultEl = qs(`#${resultContainerId}`);
  if (!resultEl) return;
  const res = checkPincodeDelivery(inputVal);
  if (!res.valid) {
    resultEl.innerHTML = `<div style="color:#EF4444;font-size:0.8rem;padding:6px 0;display:flex;align-items:center;gap:6px;"><span>⚠️</span> ${res.message}</div>`;
    return;
  }

  localStorage.setItem('vh_checked_pincode', res.pincode);
  state.rememberedPincode = res.pincode;

  resultEl.innerHTML = `
    <div class="pincode-card-rich">
      <div class="pincode-header-row">
        <span class="pincode-speed-badge">⚡ ${res.speedTag}</span>
        <span style="font-size:0.75rem;color:var(--text-muted);font-weight:600;">PIN: ${res.pincode} (${res.region})</span>
      </div>
      <div class="pincode-eta-date">Estimated Arrival: ${res.estimatedDateText}</div>
      <div style="font-size:0.78rem;color:var(--text-secondary);margin-bottom:4px;">
        Fulfilled via <strong>${res.partner}</strong>
      </div>
      <div style="font-size:0.74rem;color:var(--muted-violet);margin-bottom:6px;display:flex;align-items:center;gap:4px;">
        <span>🏭 Origin Hub:</span> <strong>${res.originWarehouse || 'Velvet Hug Central Mother Warehouse, Chennai'}</strong>
      </div>
      <div style="font-size:0.75rem;color:var(--text-secondary);line-height:1.4;">
        ${res.specialNote}
      </div>
      <div class="pincode-feature-grid">
        <div class="pincode-feature-chip"><span>✓</span> Free White-Glove Room Unboxing</div>
        <div class="pincode-feature-chip"><span>✓</span> 100-Night Risk-Free Trial</div>
        <div class="pincode-feature-chip"><span>✓</span> Zero Reverse Shipping Fee</div>
        ${res.codAvailable ? '<div class="pincode-feature-chip"><span>✓</span> COD Available</div>' : ''}
      </div>
    </div>
  `;
};

// ────────────────────────────────────────────────────────────
// ENHANCED MATTRESS MULTI-AXIS FILTERING SYSTEM
// ────────────────────────────────────────────────────────────
function getPresetIconSvg(id) {
  const map = {
    all: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
    bestseller: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
    ortho: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>`,
    latex: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
    cooling: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="2" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/></svg>`,
    budget: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`,
    luxury: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M11 3 8 9l4 12 4-12-3-6"/><path d="M2 9h20"/></svg>`
  };
  return map[id] || '';
}

function renderMattressFilters() {
  const container = qs('#mattressFiltersContainer');
  if (!container) return;

  const schema = MATTRESS_FILTER_SCHEMA;
  const activeFilters = state.mattressFilters || { preset: 'all', sizes: [], firmness: [], materials: [], sleepNeeds: [], thickness: [], maxPrice: null };

  container.innerHTML = `
    <!-- Top Row: Quick Preset Pills & Sorting Dropdown -->
    <div class="filter-presets-row">
      <div class="preset-pills-list">
        <span style="font-size:0.78rem;font-weight:700;color:var(--midnight-blue);text-transform:uppercase;letter-spacing:0.06em;">Quick Views:</span>
        ${schema.presets.map(p => `
          <button class="filter-preset-pill ${activeFilters.preset === p.id ? 'active' : ''}" onclick="window.setMattressPreset('${p.id}')">
            ${getPresetIconSvg(p.id)} <span>${p.label}</span>
          </button>
        `).join('')}
      </div>
      <div class="filter-sort-controls">
        <label style="font-size:0.78rem;font-weight:600;color:var(--text-secondary);">Sort By:</label>
        <select class="filter-sort-select" id="mattressSortSelect" onchange="window.setMattressSort(this.value)">
          <option value="recommended" ${state.mattressSort === 'recommended' ? 'selected' : ''}>Recommended &amp; Best Sellers</option>
          <option value="price-low" ${state.mattressSort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
          <option value="price-high" ${state.mattressSort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
          <option value="rating" ${state.mattressSort === 'rating' ? 'selected' : ''}>Customer Rating (4.8+★)</option>
          <option value="firmness-soft" ${state.mattressSort === 'firmness-soft' ? 'selected' : ''}>Firmness: Softest First</option>
          <option value="firmness-firm" ${state.mattressSort === 'firmness-firm' ? 'selected' : ''}>Firmness: Firmest First</option>
        </select>
        <button class="clear-filters-btn" onclick="window.resetMattressFilters()">Clear All</button>
      </div>
    </div>

    <!-- Multi-Axis Filter Grid -->
    <div class="mattress-filter-axes-grid">
      <!-- Axis 1: Size -->
      <div class="filter-axis-card">
        <div class="filter-axis-title">
          <span style="display:inline-flex;align-items:center;gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 3 9 15"/><path d="M12 3H3v18h18v-9"/><path d="M16 3h5v5"/><path d="M14 15l-4 4"/></svg> Size Dimensions</span>
          <span style="font-size:0.72rem;color:var(--champagne-gold);">${activeFilters.sizes.length ? `${activeFilters.sizes.length} selected` : ''}</span>
        </div>
        <div class="filter-axis-options">
          ${schema.sizes.map(s => `
            <label class="filter-check-item">
              <input type="checkbox" ${activeFilters.sizes.includes(s) ? 'checked' : ''} onchange="window.toggleMattressFilterOption('sizes', '${s}')">
              <span>${s}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Axis 2: Firmness -->
      <div class="filter-axis-card">
        <div class="filter-axis-title">
          <span style="display:inline-flex;align-items:center;gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/></svg> Firmness Level</span>
          <span style="font-size:0.72rem;color:var(--champagne-gold);">${activeFilters.firmness.length ? `${activeFilters.firmness.length} selected` : ''}</span>
        </div>
        <div class="filter-axis-options">
          ${schema.firmnessLevels.map(f => `
            <label class="filter-check-item">
              <input type="checkbox" ${activeFilters.firmness.includes(f.key) ? 'checked' : ''} onchange="window.toggleMattressFilterOption('firmness', '${f.key}')">
              <span>${f.label}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Axis 3: Materials & Core -->
      <div class="filter-axis-card">
        <div class="filter-axis-title">
          <span style="display:inline-flex;align-items:center;gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/></svg> Core Material</span>
          <span style="font-size:0.72rem;color:var(--champagne-gold);">${activeFilters.materials.length ? `${activeFilters.materials.length} selected` : ''}</span>
        </div>
        <div class="filter-axis-options">
          ${schema.materials.map(m => `
            <label class="filter-check-item">
              <input type="checkbox" ${activeFilters.materials.includes(m.key) ? 'checked' : ''} onchange="window.toggleMattressFilterOption('materials', '${m.key}')">
              <span>${m.label}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Axis 4: Sleep Needs & Health -->
      <div class="filter-axis-card">
        <div class="filter-axis-title">
          <span style="display:inline-flex;align-items:center;gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg> Sleep Need / Ergonomics</span>
          <span style="font-size:0.72rem;color:var(--champagne-gold);">${activeFilters.sleepNeeds.length ? `${activeFilters.sleepNeeds.length} selected` : ''}</span>
        </div>
        <div class="filter-axis-options">
          ${schema.sleepNeeds.map(sn => `
            <label class="filter-check-item">
              <input type="checkbox" ${activeFilters.sleepNeeds.includes(sn) ? 'checked' : ''} onchange="window.toggleMattressFilterOption('sleepNeeds', '${sn}')">
              <span>${sn}</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Axis 5: Height / Thickness -->
      <div class="filter-axis-card">
        <div class="filter-axis-title">
          <span style="display:inline-flex;align-items:center;gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg> Height (Thickness)</span>
          <span style="font-size:0.72rem;color:var(--champagne-gold);">${activeFilters.thickness.length ? `${activeFilters.thickness.length} selected` : ''}</span>
        </div>
        <div class="filter-axis-options">
          ${schema.thicknessInches.map(t => `
            <label class="filter-check-item">
              <input type="checkbox" ${activeFilters.thickness.includes(t) ? 'checked' : ''} onchange="window.toggleMattressFilterOption('thickness', ${t})">
              <span>${t}-Inch (${Math.round(t * 2.54)} cm)</span>
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Axis 6: Price Budget Slider -->
      <div class="filter-axis-card">
        <div class="filter-axis-title">
          <span style="display:inline-flex;align-items:center;gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg> Max Budget</span>
          <span style="font-size:0.72rem;font-weight:700;color:var(--midnight-blue);" id="filterPriceDisplay">${activeFilters.maxPrice ? formatPrice(activeFilters.maxPrice) : 'Any Price'}</span>
        </div>
        <div style="padding:6px 0;">
          <input type="range" min="7000" max="120000" step="1000" value="${activeFilters.maxPrice || 120000}" id="filterPriceRange" style="width:100%;accent-color:var(--midnight-blue);cursor:pointer;" oninput="window.setMattressMaxPrice(this.value)">
          <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:var(--text-muted);margin-top:4px;">
            <span>₹7,000</span>
            <span>₹1,20,000+</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Apply filter & render products
  applyMattressFilters();
}

function applyMattressFilters() {
  const filteredProducts = filterAndSortMattresses(PRODUCTS, state.mattressFilters, state.mattressSort);
  const totalMattresses = PRODUCTS.filter(p => p.category === 'mattresses').length;
  
  // Render Active Chips Bar
  const chipsRow = qs('#mattressActiveChipsRow');
  if (chipsRow) {
    const f = state.mattressFilters;
    const hasActiveFilters = f.preset !== 'all' || f.sizes.length || f.firmness.length || f.materials.length || f.sleepNeeds.length || f.thickness.length || f.maxPrice;

    if (hasActiveFilters) {
      chipsRow.style.display = 'block';
      let chipsHtml = `<div class="active-filters-chips-bar">
        <span class="filter-results-counter">Showing <strong>${filteredProducts.length}</strong> of ${totalMattresses} Mattresses</span>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-left:auto;">`;

      if (f.preset !== 'all') {
        chipsHtml += `<button class="active-chip-tag" onclick="window.setMattressPreset('all')">View: ${f.preset} ✕</button>`;
      }
      f.sizes.forEach(s => {
        chipsHtml += `<button class="active-chip-tag" onclick="window.toggleMattressFilterOption('sizes', '${s}')">Size: ${s} ✕</button>`;
      });
      f.firmness.forEach(frm => {
        chipsHtml += `<button class="active-chip-tag" onclick="window.toggleMattressFilterOption('firmness', '${frm}')">Firmness: ${frm} ✕</button>`;
      });
      f.materials.forEach(m => {
        chipsHtml += `<button class="active-chip-tag" onclick="window.toggleMattressFilterOption('materials', '${m}')">Material: ${m} ✕</button>`;
      });
      f.sleepNeeds.forEach(sn => {
        chipsHtml += `<button class="active-chip-tag" onclick="window.toggleMattressFilterOption('sleepNeeds', '${sn}')">Need: ${sn} ✕</button>`;
      });
      f.thickness.forEach(th => {
        chipsHtml += `<button class="active-chip-tag" onclick="window.toggleMattressFilterOption('thickness', ${th})">Thickness: ${th}" ✕</button>`;
      });
      if (f.maxPrice) {
        chipsHtml += `<button class="active-chip-tag" onclick="window.setMattressMaxPrice(null)">Under ${formatPrice(f.maxPrice)} ✕</button>`;
      }

      chipsHtml += `<button class="clear-filters-btn" style="margin-left:6px;" onclick="window.resetMattressFilters()">Clear All</button></div></div>`;
      chipsRow.innerHTML = chipsHtml;
    } else {
      chipsRow.style.display = 'none';
      chipsRow.innerHTML = '';
    }
  }

  const container = qs('#mattressProductsGrid') || qs('#view-mattresses .products-grid');
  if (container) {
    renderProductCards(filteredProducts, container);
  }
}

window.setMattressPreset = function(presetId) {
  state.mattressFilters.preset = presetId;
  renderMattressFilters();
};

window.setMattressSort = function(sortValue) {
  state.mattressSort = sortValue;
  applyMattressFilters();
};

window.toggleMattressFilterOption = function(axisKey, value) {
  state.mattressFilters[axisKey] = state.mattressFilters[axisKey] || [];
  const idx = state.mattressFilters[axisKey].indexOf(value);
  if (idx > -1) {
    state.mattressFilters[axisKey].splice(idx, 1);
  } else {
    state.mattressFilters[axisKey].push(value);
  }
  renderMattressFilters();
};

window.setMattressMaxPrice = function(val) {
  const num = parseInt(val, 10);
  state.mattressFilters.maxPrice = (num && num < 120000) ? num : null;
  const disp = qs('#filterPriceDisplay');
  if (disp) disp.textContent = state.mattressFilters.maxPrice ? formatPrice(state.mattressFilters.maxPrice) : 'Any Price';
  applyMattressFilters();
};

window.resetMattressFilters = function() {
  state.mattressFilters = { preset: 'all', sizes: [], firmness: [], materials: [], sleepNeeds: [], thickness: [], maxPrice: null };
  state.mattressSort = 'recommended';
  renderMattressFilters();
};

function renderFilterBar(category) {
  if (category === 'mattresses') {
    renderMattressFilters();
  }
}

function resetFilters() {
  window.resetMattressFilters();
}

window.clearFilterAxis = function(axisKey) {
  state.mattressFilters[axisKey] = [];
  renderMattressFilters();
};
window.resetFilters = resetFilters;

// ────────────────────────────────────────────────────────────
// ENHANCED SCROLL EFFECTS & INTERACTIVE MICRO-ANIMATIONS
// ────────────────────────────────────────────────────────────
function initScrollEffects() {
  // 1. Scroll Progress Bar at top of viewport
  const progressBar = qs('#scrollProgressBar');
  const backToTopBtn = qs('#floatingBackToTop');
  const header = qs('.site-header');

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // A. Progress Bar
    if (progressBar && docHeight > 0) {
      const pct = (scrollTop / docHeight) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    }

    // B. Floating Back to Top Button
    if (backToTopBtn) {
      if (scrollTop > 260) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // C. Header Dynamic Elevation Blur
    if (header) {
      if (scrollTop > 30) {
        header.classList.add('scrolled-elevated');
      } else {
        header.classList.remove('scrolled-elevated');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. High-Performance IntersectionObserver for Scroll Reveals
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // If element contains counters, animate them
        entry.target.querySelectorAll('.counter-animate').forEach(animateNumberCounter);
        if (entry.target.classList.contains('counter-animate')) {
          animateNumberCounter(entry.target);
        }
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Observe all reveal elements
  qsa('.reveal-on-scroll, .reveal-fade, .reveal-scale, .stagger-parent, .product-card, .eco-card, .review-card').forEach(el => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });

  // 3. Interactive 3D Card Hover Tilt Micro-Motion
  document.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.card-interactive-tilt, .partner-honor-chip, .soundscape-floating-pill');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
  });

  document.addEventListener('mouseleave', (e) => {
    const card = e.target.closest('.card-interactive-tilt, .partner-honor-chip, .soundscape-floating-pill');
    if (card) {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    }
  }, true);
}

function animateNumberCounter(el) {
  if (el.dataset.animated === 'true') return;
  el.dataset.animated = 'true';
  const target = parseInt(el.dataset.target || el.textContent.replace(/\D/g, ''), 10);
  if (!target || isNaN(target)) return;
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1200;
  const start = 0;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * ease);
    el.textContent = `${prefix}${current.toLocaleString('en-IN')}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  requestAnimationFrame(step);
}

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
        ${p.doctorRecommended ? '<span class="badge badge-new" style="font-size:0.64rem;display:inline-flex;align-items:center;gap:3px;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg> Dr. Rec</span>' : ''}
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
          <div class="meter-header"><span>Firmness</span><span style="font-weight:700;color:var(--midnight-blue);">${p.firmness} (${p.firmnessScore}/10)</span></div>
          <div class="meter-bar-track firmness-track"><div class="meter-bar-fill" style="width:${p.firmnessScore * 10}%"></div><div class="firmness-thumb" style="left:${p.firmnessScore * 10}%;"></div></div>
        </div>` : ''}
        
        ${p.doctorRecommended ? `
        <div class="card-doctor-pill" style="cursor:pointer;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline-block;vertical-align:-1px;margin-right:4px;"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg> Recommended by Sleep Doctors
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
        ${p.emi ? `<div class="card-emi-text" style="cursor:pointer;" onclick="event.stopPropagation();window.openEmiModal(${p.basePrice}, '${p.name.replace(/'/g, "\\'")}')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" style="display:inline-block;vertical-align:-2px;margin-right:3px;"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg> No-Cost EMI: <strong>${p.emi}</strong> <span style="color:var(--champagne-gold);font-weight:700;">(Plans →)</span></div>` : '<div style="height:16px;"></div>'}
        
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
  const tabs = ['All Accessories', 'Cushions', 'Bolsters', 'Mattress Protectors', 'Pillow Covers', 'Sleep Sanctuary'];
  if (!state.activeAccSubTab) state.activeAccSubTab = 'All Accessories';
  tabContainer.innerHTML = tabs.map(t => `
    <button class="acc-sub-tab ${t === state.activeAccSubTab ? 'active' : ''}" data-subtab="${t}">${t}</button>
  `).join('');

  function applyFilter(subtab) {
    state.activeAccSubTab = subtab;
    tabContainer.querySelectorAll('.acc-sub-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.subtab === subtab);
    });
    const container = qs('#view-accessories .products-grid');
    if (container) {
      let products = getProductsByCategory('accessories', {});
      if (subtab === 'Cushions') {
        products = products.filter(p => p.category === 'cushions' || p.tags?.includes('cushion'));
      } else if (subtab === 'Bolsters') {
        products = products.filter(p => p.category === 'bolsters' || p.tags?.includes('bolster'));
      } else if (subtab === 'Mattress Protectors') {
        products = products.filter(p => p.tags?.includes('protector'));
      } else if (subtab === 'Pillow Covers') {
        products = products.filter(p => p.tags?.includes('pillowcase') || p.category === 'pillows');
      } else if (subtab === 'Sleep Sanctuary') {
        products = products.filter(p => p.tags?.includes('aromatherapy') || p.tags?.includes('sleep-mask'));
      }
      renderProductCards(products, container);
    }
  }

  tabContainer.querySelectorAll('.acc-sub-tab').forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.subtab));
  });

  applyFilter(state.activeAccSubTab);
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

  // Google Login step toggle
  qs('#googleLoginBtn')?.addEventListener('click', () => {
    const currentName = qs('#loginNameInput')?.value?.trim();
    const currentEmail = qs('#loginEmailInput')?.value?.trim();
    const currentPhone = qs('#loginPhoneInput')?.value?.trim();

    if (qs('#googleNameInput')) qs('#googleNameInput').value = currentName || '';
    if (qs('#googleEmailInput')) qs('#googleEmailInput').value = currentEmail || '';
    if (qs('#googlePhoneInput')) qs('#googlePhoneInput').value = currentPhone || '';

    if (qs('#otpPhoneStep')) qs('#otpPhoneStep').style.display = 'none';
    if (qs('#otpVerifyStep')) qs('#otpVerifyStep').style.display = 'none';
    if (qs('#googleAccountStep')) qs('#googleAccountStep').style.display = 'block';
  });

  qs('#backFromGoogleBtn')?.addEventListener('click', () => {
    if (qs('#googleAccountStep')) qs('#googleAccountStep').style.display = 'none';
    if (qs('#otpPhoneStep')) qs('#otpPhoneStep').style.display = 'block';
  });

  qs('#confirmGoogleLoginBtn')?.addEventListener('click', () => {
    const name = qs('#googleNameInput')?.value?.trim();
    const email = qs('#googleEmailInput')?.value?.trim();
    const phone = qs('#googlePhoneInput')?.value?.trim();

    if (!name) {
      toast('Please enter your full name');
      return;
    }
    if (!email || !email.includes('@')) {
      toast('Please enter a valid Google email address');
      return;
    }

    let userOrders = [];
    try {
      const rawAdmin = localStorage.getItem('vh_admin_store_v1');
      if (rawAdmin) {
        const adminStore = JSON.parse(rawAdmin);
        userOrders = (adminStore.orders || []).filter(o => 
          (email && o.email && o.email.toLowerCase() === email.toLowerCase()) ||
          (phone && o.phone && o.phone.replace(/\D/g, '').endsWith(phone.slice(-10)))
        );
      }
    } catch (e) {}

    let existingUser = null;
    try {
      const allUsersRaw = localStorage.getItem('vh_registered_users');
      const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : {};
      existingUser = allUsers[email] || (phone ? allUsers[phone] : null);
    } catch (e) {}

    if (existingUser) {
      existingUser.name = name;
      existingUser.email = email;
      if (phone) existingUser.phone = phone;
      if (userOrders.length && (!existingUser.orders || !existingUser.orders.length)) {
        existingUser.orders = userOrders;
      }
      state.user = existingUser;
    } else {
      state.user = {
        name: name,
        email: email,
        phone: phone || '',
        avatar: name[0].toUpperCase(),
        foundingNumber: state.foundingCount <= FOUNDING_PARTNER_LIMIT ? state.foundingCount : null,
        isFounding: state.foundingCount <= FOUNDING_PARTNER_LIMIT,
        isAmbassador: false,
        referralCode: `VELVET-${email.split('@')[0].toUpperCase().slice(0, 5)}${Math.floor(100 + Math.random() * 900)}`,
        referralStats: { count: 0, earned: 0, pending: 0 },
        orders: userOrders,
        addresses: [],
        wishlist: []
      };
    }

    saveStoredUser(state.user);
    try {
      const allUsersRaw = localStorage.getItem('vh_registered_users');
      const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : {};
      allUsers[email] = state.user;
      if (phone) allUsers[phone] = state.user;
      localStorage.setItem('vh_registered_users', JSON.stringify(allUsers));
    } catch (e) {}

    updateHeaderUserUI();
    qs('#loginModal')?.classList.remove('active');
    
    if (qs('#googleAccountStep')) qs('#googleAccountStep').style.display = 'none';
    if (qs('#otpPhoneStep')) qs('#otpPhoneStep').style.display = 'block';

    if (qs('#googleNameInput')) qs('#googleNameInput').value = '';
    if (qs('#googleEmailInput')) qs('#googleEmailInput').value = '';
    if (qs('#googlePhoneInput')) qs('#googlePhoneInput').value = '';

    renderAccountPage();
    navigateTo('account');
    toast(`✓ Signed in as ${state.user.name}`);
  });

  // Phone OTP Flow
  qs('#sendOtpBtn')?.addEventListener('click', () => {
    const phone = qs('#loginPhoneInput')?.value?.trim();
    const name  = qs('#loginNameInput')?.value?.trim();
    const email = qs('#loginEmailInput')?.value?.trim();

    if (!phone || phone.length < 10) {
      toast('Please enter a valid 10-digit mobile number');
      return;
    }

    state.pendingLogin = {
      name: name || 'Sleep Partner',
      email: email || '',
      phone: phone
    };

    state.simulatedOtp = (Math.floor(1000 + Math.random() * 9000)).toString();
    if (qs('#otpTargetPhone')) qs('#otpTargetPhone').textContent = `+91 ${phone.slice(0,5)} •••••`;
    if (qs('#simulatedCode')) qs('#simulatedCode').textContent = state.simulatedOtp;
    if (qs('#otpPhoneStep')) qs('#otpPhoneStep').style.display = 'none';
    if (qs('#otpVerifyStep')) qs('#otpVerifyStep').style.display = 'block';
    startOtpCountdown();
    toast(`📲 Verification code sent to +91 ${phone}`);
  });

  qs('#autoFillOtpBtn')?.addEventListener('click', () => {
    const code = state.simulatedOtp;
    if (qs('#otp1')) qs('#otp1').value = code[0] || '1';
    if (qs('#otp2')) qs('#otp2').value = code[1] || '2';
    if (qs('#otp3')) qs('#otp3').value = code[2] || '3';
    if (qs('#otp4')) qs('#otp4').value = code[3] || '4';
  });

  qs('#changePhoneBtn')?.addEventListener('click', () => {
    if (qs('#otpVerifyStep')) qs('#otpVerifyStep').style.display = 'none';
    if (qs('#otpPhoneStep')) qs('#otpPhoneStep').style.display = 'block';
  });

  qs('#verifyOtpBtn')?.addEventListener('click', () => {
    const p = state.pendingLogin || {};
    const phone = qs('#loginPhoneInput')?.value?.trim() || p.phone;
    const name  = qs('#loginNameInput')?.value?.trim() || p.name || 'Sleep Partner';
    const email = qs('#loginEmailInput')?.value?.trim() || p.email || '';

    if (!phone || phone.length < 10) {
      toast('Please enter your 10-digit mobile number');
      return;
    }

    let userOrders = [];
    try {
      const rawAdmin = localStorage.getItem('vh_admin_store_v1');
      if (rawAdmin) {
        const adminStore = JSON.parse(rawAdmin);
        userOrders = (adminStore.orders || []).filter(o => 
          (o.phone && o.phone.replace(/\D/g, '').endsWith(phone.slice(-10))) ||
          (email && o.email && o.email.toLowerCase() === email.toLowerCase())
        );
      }
    } catch (e) {}

    let existingUser = null;
    try {
      const allUsersRaw = localStorage.getItem('vh_registered_users');
      const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : {};
      existingUser = allUsers[phone] || (email ? allUsers[email] : null);
    } catch (e) {}

    if (existingUser) {
      if (name && name !== 'Sleep Partner') existingUser.name = name;
      if (email) existingUser.email = email;
      existingUser.phone = phone;
      if (userOrders.length && (!existingUser.orders || !existingUser.orders.length)) {
        existingUser.orders = userOrders;
      }
      state.user = existingUser;
    } else {
      state.user = {
        name: name,
        phone: phone,
        email: email,
        avatar: (name || 'S')[0].toUpperCase(),
        foundingNumber: state.foundingCount <= FOUNDING_PARTNER_LIMIT ? state.foundingCount : null,
        isFounding: state.foundingCount <= FOUNDING_PARTNER_LIMIT,
        isAmbassador: false,
        referralCode: `VELVET-${phone.slice(-4)}`,
        referralStats: { count: 0, earned: 0, pending: 0 },
        orders: userOrders,
        addresses: [],
        wishlist: []
      };
    }

    saveStoredUser(state.user);
    try {
      const allUsersRaw = localStorage.getItem('vh_registered_users');
      const allUsers = allUsersRaw ? JSON.parse(allUsersRaw) : {};
      allUsers[phone] = state.user;
      if (email) allUsers[email] = state.user;
      localStorage.setItem('vh_registered_users', JSON.stringify(allUsers));
    } catch (e) {}

    updateHeaderUserUI();
    qs('#loginModal')?.classList.remove('active');

    if (qs('#otpVerifyStep')) qs('#otpVerifyStep').style.display = 'none';
    if (qs('#otpPhoneStep')) qs('#otpPhoneStep').style.display = 'block';
    if (qs('#loginPhoneInput')) qs('#loginPhoneInput').value = '';
    if (qs('#loginNameInput')) qs('#loginNameInput').value = '';
    if (qs('#loginEmailInput')) qs('#loginEmailInput').value = '';

    renderAccountPage();
    navigateTo('account');
    toast(`✓ Welcome, ${state.user.name}!`);
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span style="position:absolute;top:3px;right:3px;width:8px;height:8px;border-radius:50%;background:#10B981;box-shadow:0 0 0 2px var(--bg-surface, #141F3D);" title="Logged in as ${state.user.name}"></span>
    `;
    btn.title = `Signed in: ${state.user.name} (#${state.user.foundingNumber || 'Sleep Partner'})`;
  } else {
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    btn.title = 'My Account & Profile';
  }
}

function openLoginModal() {
  const otpVerify  = qs('#otpVerifyStep');
  const otpPhone   = qs('#otpPhoneStep');
  const googleStep = qs('#googleAccountStep');
  if (otpVerify)  otpVerify.style.display  = 'none';
  if (googleStep) googleStep.style.display = 'none';
  if (otpPhone)   otpPhone.style.display   = 'block';

  if (qs('#loginPhoneInput')) qs('#loginPhoneInput').value = '';
  if (qs('#loginNameInput'))  qs('#loginNameInput').value = '';
  if (qs('#loginEmailInput')) qs('#loginEmailInput').value = '';
  if (qs('#googleNameInput'))  qs('#googleNameInput').value = '';
  if (qs('#googleEmailInput')) qs('#googleEmailInput').value = '';
  if (qs('#googlePhoneInput')) qs('#googlePhoneInput').value = '';
  ['otp1','otp2','otp3','otp4'].forEach(id => { if (qs(`#${id}`)) qs(`#${id}`).value = ''; });
  state.pendingLogin = null;

  qs('#loginModal')?.classList.add('active');
}
window.openLoginModal = openLoginModal;

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
  const num = u.foundingNumber || u.partnerNumber;
  let foundingBadge = '<span class="badge-chip sleep-partner">🌙 Sleep Partner</span>';
  if (num) {
    if (num <= 1000) {
      foundingBadge = `<span class="badge-chip founding">🏅 Founding Sleep Partner #${String(num).padStart(3, '0')}</span>`;
    } else {
      foundingBadge = `<span class="badge-chip sleep-partner">🌙 Sleep Partner #${num}</span>`;
    }
  }
  const ambassadorBadge = (u.isAmbassador || (u.referralStats && u.referralStats.count > 0)) ? `<span class="badge-chip ambassador">🌿 Rest Ambassador</span>` : '';
  const vipBadge = `<span class="badge-chip sleep-partner">⚡ VIP First Access</span>`;

  el.innerHTML = `
    <button class="modal-close-icon" onclick="document.getElementById('accountModal').classList.remove('active')">✕</button>
    
    <!-- Profile Header -->
    <div class="account-profile-header">
      <div class="account-user-meta">
        <div class="account-user-avatar">${u.avatar || u.name[0] || 'V'}</div>
        <div>
          <div style="font-family:var(--font-serif);font-size:1.35rem;font-weight:700;color:var(--text-primary);">${u.name}</div>
          <div style="font-size:0.82rem;color:var(--text-muted);">${[u.email, u.phone ? `+91 ${u.phone}` : ''].filter(Boolean).join(' · ')}</div>
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
      
      <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap;">
        <a href="https://wa.me/?text=Hey!%20I%20got%20the%20Velvet%20Hug%20mattress%20and%20it%20has%20transformed%20my%20sleep.%20Get%2010%25%20off%20with%20my%20link:%20https://velvethug.in/ref/${u.referralCode}" target="_blank" class="btn btn-primary btn-sm">
          Share to WhatsApp 💬
        </a>
        <button class="btn btn-gold btn-sm" onclick="window.simulateReferralTest()">
          Simulate Friend Referral (+₹1,000) 🌿
        </button>
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
  state.pendingLogin = null;
  saveStoredUser(null);
  updateHeaderUserUI();
  closeAccountModal();

  if (qs('#loginPhoneInput')) qs('#loginPhoneInput').value = '';
  if (qs('#loginNameInput')) qs('#loginNameInput').value = '';
  if (qs('#loginEmailInput')) qs('#loginEmailInput').value = '';
  if (qs('#googleNameInput')) qs('#googleNameInput').value = '';
  if (qs('#googleEmailInput')) qs('#googleEmailInput').value = '';
  if (qs('#googlePhoneInput')) qs('#googlePhoneInput').value = '';
  ['otp1','otp2','otp3','otp4'].forEach(id => { if (qs(`#${id}`)) qs(`#${id}`).value = ''; });

  renderAccountPage();
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
    if (titleEl)  titleEl.textContent    = 'Sleep Partner Hub';
    if (subEl)    subEl.textContent      = 'Your orders, profile and all things Velvet Hug.';
    return;
  }

  if (guest)    guest.style.display    = 'none';
  if (loggedIn) loggedIn.style.display = 'block';

  const u = state.user;

  // Header
  if (titleEl) titleEl.textContent = u.name || 'Sleep Partner';
  if (subEl) {
    const contactParts = [u.email, u.phone ? `+91 ${u.phone}` : ''].filter(Boolean);
    subEl.textContent = contactParts.length ? contactParts.join(' · ') : 'Sleep Partner Account';
  }

  const avatarEl = qs('#acctAvatar');
  if (avatarEl) avatarEl.textContent = u.avatar || u.name?.[0]?.toUpperCase() || 'V';

  const nameEl = qs('#acctName');
  if (nameEl)  nameEl.textContent = u.name || 'Sleep Partner';

  const contactEl = qs('#acctContact');
  if (contactEl) {
    const contactParts = [u.email, u.phone ? `+91 ${u.phone}` : ''].filter(Boolean);
    contactEl.textContent = contactParts.length ? contactParts.join(' · ') : '—';
  }

  const badgesEl = qs('#acctBadges');
  if (badgesEl) {
    let badgeHTML = '';
    const num = u.foundingNumber || u.partnerNumber;
    if (num) {
      if (num <= 1000) {
        badgeHTML += `<span class="badge badge-founding">🏅 Founding Sleep Partner #${String(num).padStart(3, '0')}</span>`;
      } else {
        badgeHTML += `<span class="badge badge-founding">🏅 Sleep Partner #${num}</span>`;
      }
    } else {
      badgeHTML += `<span class="badge badge-founding">🌙 Sleep Partner</span>`;
    }
    if (u.isAmbassador || (u.referralStats && u.referralStats.count > 0)) {
      badgeHTML += `<span class="badge badge-new" style="margin-left:6px;">🌿 Rest Ambassador</span>`;
    }
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

          <!-- 100-Night Trial & Renewal Actions -->
          <div style="display:flex;gap:10px;margin-top:14px;padding-top:12px;border-top:1px dashed rgba(76,63,94,0.15);flex-wrap:wrap;">
            <button class="btn btn-outline btn-sm" onclick="window.openReturnRequestModal()">🌙 100-Night Return / Exchange</button>
          </div>
        </div>
      </div>
    `;
    }).join('') + `
      <!-- Active Return Tickets with Live Super Admin Sync & Photo Evidence Upload -->
      ${(() => {
        const storedReturns = getStoredReturns();
        const userReturns = (u.returnTickets || []).map(r => {
          const live = storedReturns.find(s => s.rmaId === r.rmaId);
          return live ? { ...r, ...live } : r;
        });

        if (!userReturns.length) return '';

        return `
          <div style="margin-top:28px;background:var(--bg-surface);border:1px solid rgba(76,63,94,0.14);border-radius:var(--radius-md);padding:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
              <h4 style="font-family:var(--font-serif);font-size:1.15rem;color:var(--midnight-blue);margin:0;">Active Return &amp; Exchange Tickets</h4>
              <span style="font-size:0.75rem;color:var(--text-muted);">Syncing live with Super Admin Portal</span>
            </div>
            ${userReturns.map(r => `
              <div style="background:var(--bg-secondary);padding:16px;border-radius:var(--radius-sm);margin-bottom:14px;border-left:4px solid var(--champagne-gold);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;flex-wrap:wrap;gap:8px;">
                  <strong style="font-family:monospace;font-size:0.92rem;color:var(--midnight-blue);">${r.rmaId}</strong>
                  <span class="badge ${
                    (r.status || '').includes('Completed') ? 'badge-founding' :
                    (r.status || '').includes('Approved') ? 'badge-new' :
                    (r.status || '').includes('Evidence') ? 'badge-founding' :
                    (r.status || '').includes('Assigned') ? 'badge-founding' : 'badge-new'
                  }">${r.status}</span>
                </div>
                <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:4px;">
                  Item: <strong>${r.item || 'Velvet Hug Dual-Comfort Mattress'}</strong> · Type: <strong>${r.type || 'Exchange'}</strong> · Reason: ${r.reason || 'Comfort preference'}
                </div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">
                  Pickup Address: ${r.pickupAddress || r.address || 'Registered Address'} · Slot: ${r.slot || 'Pending Dispatch'}
                </div>
                ${r.evidenceUrl ? `
                  <div style="margin-top:8px;font-size:0.75rem;">
                    <a href="${r.evidenceUrl}" target="_blank" style="color:var(--champagne-gold);text-decoration:underline;">📷 View Inspection Photo Evidence</a>
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        `;
      })()}
    `;
  } else if (_accountPageTab === 'profile') {
    el.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
        <!-- Personal Details -->
        <div style="background:var(--bg-surface);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-lg);padding:24px;">
          <div style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:var(--midnight-blue);margin-bottom:16px;">Personal Details</div>
          <div style="margin-bottom:14px;">
            <label class="form-label">Full Name</label>
            <input class="form-input" id="profileName" value="${u.name || ''}" placeholder="Your Name">
          </div>
          <div style="margin-bottom:14px;">
            <label class="form-label">Email Address</label>
            <input class="form-input" id="profileEmail" value="${u.email || ''}" placeholder="your@email.com">
          </div>
          <div style="margin-bottom:20px;">
            <label class="form-label">Phone Number (+91)</label>
            <input class="form-input" id="profilePhone" value="${u.phone || ''}" placeholder="10-digit mobile number">
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
          <button class="btn btn-gold btn-sm" onclick="openCertificateModal()">🏅 Certificate</button>
          <button class="btn btn-outline-light btn-sm" onclick="switchAccountPageTab('orders')">View Orders</button>
        </div>
      </div>` : ''}

      <!-- Referral Panel -->
      <div style="background:var(--bg-surface);border:1px solid rgba(76,63,94,0.12);border-radius:var(--radius-lg);padding:24px;margin-top:24px;">
        <div style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:var(--midnight-blue);margin-bottom:8px;">🤝 Rest Ambassador - Refer &amp; Earn</div>
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
  const u = state.user || { name: 'Sleep Partner', foundingNumber: 212, isFounding: true };
  const el = qs('#certificateContent');
  if (!el) return;

  const num = u.foundingNumber || 212;
  const isFounding = num <= 1000;
  const title = isFounding ? 'Founding Sleep Partner' : 'Sleep Partner';
  const displayNum = isFounding ? `#${String(num).padStart(3, '0')}` : `#${num}`;
  const desc = isFounding
    ? 'As one of the first 1,000 customers to trust Velvet Hug with their rest, this numbered status and 15% lifetime price lock are permanently tied to your name.'
    : 'Honoured member of the Velvet Hug sleep community. Thank you for resting with us.';

  el.innerHTML = `
    <button class="modal-close-icon" onclick="document.getElementById('certificateModal').classList.remove('active')">&times;</button>
    <div class="certificate-seal">🏅</div>
    <div style="font-size:0.75rem;letter-spacing:0.18em;font-weight:700;color:var(--muted-violet);text-transform:uppercase;margin-bottom:8px;">Certificate of Honour</div>
    <h2 style="font-family:var(--font-serif);font-size:1.8rem;color:var(--midnight-blue);margin-bottom:8px;">${title}</h2>
    <div style="font-family:var(--font-serif);font-size:2.8rem;font-weight:700;color:var(--midnight-blue);margin:8px 0;">${displayNum}</div>
    <p style="font-family:var(--font-serif);font-style:italic;font-size:1.1rem;color:var(--muted-violet);margin-bottom:16px;">
      Awarded to <strong>${u.name}</strong>
    </p>
    <p style="font-size:0.84rem;color:var(--text-secondary);max-width:440px;margin:0 auto 24px;line-height:1.6;">
      ${desc}
    </p>
    <div style="display:flex;justify-content:space-around;border-top:1px solid rgba(76,63,94,0.15);padding-top:16px;margin-bottom:24px;font-size:0.75rem;color:var(--text-muted);">
      <div>Verified by<br><strong style="color:var(--midnight-blue);">Velvet Hug Sleep Labs</strong></div>
      <div>Issued<br><strong style="color:var(--midnight-blue);">Batch 2026</strong></div>
    </div>
    <div style="display:flex;gap:12px;justify-content:center;">
      <button class="btn btn-gold btn-sm" onclick="window.print();toast('🖨️ Printing certificate...')">Print / Save PDF</button>
      <button class="btn btn-outline btn-sm" onclick="navigator.clipboard?.writeText(window.location.href);toast('Badge link copied for sharing!')">Share Badge</button>
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
        <div><label class="form-label">Full Name</label><input class="form-input" id="coName" value="${u?.name || ''}" placeholder="Your Full Name"></div>
        <div><label class="form-label">Phone Number (+91)</label><input class="form-input" id="coPhone" value="${u?.phone || ''}" placeholder="10-digit mobile number"></div>
      </div>
      <div style="margin-bottom:12px;"><label class="form-label">Email for Order & Digital Badge</label><input class="form-input" id="coEmail" value="${u?.email || ''}" placeholder="your.email@example.com"></div>
      <div style="margin-bottom:12px;"><label class="form-label">Complete Street Address</label><input class="form-input" id="coAddress" value="${u?.addresses?.[0]?.line || ''}" placeholder="House / Flat No, Building, Street"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:8px;">
        <div><label class="form-label">City</label><input class="form-input" id="coCity" value="${u?.addresses?.[0]?.city || 'Chennai'}" placeholder="Chennai"></div>
        <div><label class="form-label">State</label><input class="form-input" id="coState" value="${u?.addresses?.[0]?.state || 'Tamil Nadu'}" placeholder="Tamil Nadu"></div>
        <div><label class="form-label">Pincode</label><input class="form-input" id="coPin" value="${u?.addresses?.[0]?.pincode || state.rememberedPincode || '600028'}" placeholder="600028" oninput="window.updateCheckoutPincodeSpeed(this.value)"></div>
      </div>
      <div id="checkoutPincodeSpeedBadge" style="margin-bottom:14px;">
        <span style="font-size:0.78rem;color:#059669;font-weight:700;display:inline-flex;align-items:center;gap:5px;background:rgba(16,185,129,0.1);padding:4px 10px;border-radius:4px;">
          ⚡ Same-Day / Next-Day Delivery &amp; Free White-Glove Unboxing Active (Dispatched from Chennai Mother Hub)
        </span>
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
        <button class="payment-tab-btn ${state.paymentMethod === 'upi' ? 'active' : ''}" onclick="setPaymentMethod('upi')" style="display:inline-flex;align-items:center;justify-content:center;gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
          <span>UPI / QR</span>
        </button>
        <button class="payment-tab-btn ${state.paymentMethod === 'emi' ? 'active' : ''}" onclick="setPaymentMethod('emi')" style="display:inline-flex;align-items:center;justify-content:center;gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          <span>No-Cost EMI</span>
        </button>
        <button class="payment-tab-btn ${state.paymentMethod === 'card' ? 'active' : ''}" onclick="setPaymentMethod('card')" style="display:inline-flex;align-items:center;justify-content:center;gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          <span>Cards</span>
        </button>
        <button class="payment-tab-btn ${state.paymentMethod === 'netbanking' ? 'active' : ''}" onclick="setPaymentMethod('netbanking')" style="display:inline-flex;align-items:center;justify-content:center;gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/></svg>
          <span>Net Banking</span>
        </button>
        <button class="payment-tab-btn ${state.paymentMethod === 'cod' ? 'active' : ''}" onclick="setPaymentMethod('cod')" style="display:inline-flex;align-items:center;justify-content:center;gap:6px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
          <span>COD</span>
        </button>
      </div>
      
      <!-- Payment Panel Details -->
      ${renderPaymentGatewayPanel(finalTotal)}
      
      <!-- Price Lock & Coupon -->
      <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:14px;margin-bottom:16px;">
        ${isFounding ? `
          <div style="display:flex;justify-content:space-between;color:var(--accent-emerald);font-weight:700;font-size:0.84rem;margin-bottom:6px;">
            <span style="display:inline-flex;align-items:center;gap:6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
              <span>Founding Sleep Partner Price Lock (15% Off)</span>
            </span>
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
                  🏷️ ${c.code} (${c.discountPct}% OFF)
                </button>
              `).join('')}
            </div>
          `}
        `}
        <div style="display:flex;justify-content:space-between;font-weight:800;font-size:1.15rem;color:var(--midnight-blue);border-top:1px solid rgba(76,63,94,0.1);padding-top:8px;">
          <span>Total Payable</span>
          <span>${formatPrice(finalTotal)}</span>
        </div>
        <div style="font-size:0.72rem;color:var(--text-muted);margin-top:4px;display:flex;align-items:center;gap:4px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span>256-Bit Bank Grade SSL Encrypted Checkout</span>
        </div>
      </div>
      
      <div style="display:flex;gap:10px;">
        <button class="btn btn-outline btn-sm" onclick="backToCheckoutDetails()">← Back</button>
        <button class="btn btn-gold btn-lg btn-block" onclick="executePaymentGateway(${finalTotal})" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Authorize &amp; Pay ${formatPrice(finalTotal)}</span>
        </button>
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
          <div style="font-size:0.75rem;font-weight:700;letter-spacing:0.12em;color:var(--muted-violet);text-transform:uppercase;margin-bottom:4px;display:flex;align-items:center;justify-content:center;gap:6px;">
            ${partnerNum ? `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
              <span>Founding Sleep Partner</span>
            ` : `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              <span>Verified Sleep Partner</span>
            `}
          </div>
          <div style="font-family:var(--font-serif);font-size:2.2rem;font-weight:700;color:var(--midnight-blue);">
            ${partnerNum ? `#${partnerNum}` : 'Sleep Partner'}
          </div>
          <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:4px;">
            Your status and order are permanently registered.
          </div>
          <button class="btn btn-gold btn-sm" style="margin-top:12px;display:inline-flex;align-items:center;gap:6px;" onclick="closeCheckout();openCertificateModal();">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
            <span>View Official Certificate</span>
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
  } else if (state.paymentMethod === 'emi') {
    const selectedBank = state.checkoutEmiBank || 'hdfc';
    const bankObj = EMI_BANKS.find(b => b.id === selectedBank) || EMI_BANKS[0];
    const tenureList = selectedBank === 'bajaj'
      ? [3, 6, 9, 12, 18, 24].map(m => ({ months: m, isNoCost: true, annualRate: 0 }))
      : bankObj.tenures;

    return `
      <div style="background:#fff;border:1px solid rgba(76,63,94,0.15);border-radius:var(--radius-sm);padding:18px;margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <div style="font-size:0.84rem;font-weight:700;color:var(--midnight-blue);">1. Select Bank / Issuer:</div>
          <span class="emi-badge-nocost">0% Processing Fee</span>
        </div>
        <div class="emi-bank-tabs-row" style="margin-bottom:14px;">
          ${EMI_BANKS.map(b => `
            <button type="button" class="emi-bank-tab-btn ${b.id === selectedBank ? 'active' : ''}" onclick="window.setCheckoutEmiBank('${b.id}')">
              <span>${b.logo}</span> <span>${b.name}</span>
            </button>
          `).join('')}
          <button type="button" class="emi-bank-tab-btn ${selectedBank === 'bajaj' ? 'active' : ''}" onclick="window.setCheckoutEmiBank('bajaj')">
            <span>⚡</span> <span>Bajaj Finserv Insta Card</span>
          </button>
        </div>

        <div style="font-size:0.8rem;font-weight:700;color:var(--midnight-blue);margin-bottom:8px;">2. Select Tenure Plan:</div>
        <div style="display:flex;flex-direction:column;gap:8px;max-height:220px;overflow-y:auto;margin-bottom:16px;">
          ${tenureList.map((t, idx) => {
            const monthly = t.isNoCost ? Math.round(amount / t.months) : calculateEMI(amount, t.annualRate, t.months);
            const isDefault = (state.checkoutEmiTenure ? state.checkoutEmiTenure === t.months : idx === 1);
            return `
              <label style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border:1px solid ${isDefault ? 'var(--champagne-gold)' : 'rgba(76,63,94,0.12)'};background:${isDefault ? 'var(--champagne-gold-light)' : 'var(--bg-surface)'};border-radius:6px;cursor:pointer;">
                <div style="display:flex;align-items:center;gap:10px;">
                  <input type="radio" name="coEmiTenure" value="${t.months}" ${isDefault ? 'checked' : ''} onchange="window.setCheckoutEmiTenure(${t.months})">
                  <div>
                    <strong style="color:var(--midnight-blue);font-size:0.88rem;">${t.months} Months</strong>
                    ${t.isNoCost ? '<span class="emi-badge-nocost" style="margin-left:6px;">No Cost EMI</span>' : `<span style="font-size:0.72rem;color:var(--text-muted);margin-left:6px;">(${t.annualRate}% p.a.)</span>`}
                  </div>
                </div>
                <div style="text-align:right;">
                  <div style="font-weight:800;color:var(--midnight-blue);font-size:0.95rem;">₹${monthly.toLocaleString('en-IN')}/mo</div>
                  <div style="font-size:0.72rem;color:var(--text-muted);">Total: ₹${(monthly * t.months).toLocaleString('en-IN')}</div>
                </div>
              </label>
            `;
          }).join('')}
        </div>

        <div>
          <label class="form-label">${selectedBank === 'bajaj' ? 'Bajaj Finserv 16-Digit Card / Registered Mobile' : 'Credit / Debit Card Number for EMI'}</label>
          <input class="form-input" placeholder="${selectedBank === 'bajaj' ? '4030 •••• •••• 9921' : '4242 •••• •••• 4242'}" id="pgEmiCardNum" value="${selectedBank === 'bajaj' ? '4030 8901 2345 9921' : '4242 8901 2345 6789'}">
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

window.setCheckoutEmiBank = function(bankId) {
  state.checkoutEmiBank = bankId;
  const bankObj = EMI_BANKS.find(b => b.id === bankId);
  state.checkoutEmiTenure = (bankId === 'bajaj' ? 6 : (bankObj?.tenures[1]?.months || 6));
  renderCheckout();
};

window.setCheckoutEmiTenure = function(months) {
  state.checkoutEmiTenure = months;
  renderCheckout();
};

window.updateCheckoutPincodeSpeed = function(pin) {
  const badge = qs('#checkoutPincodeSpeedBadge');
  if (!badge) return;
  const res = checkPincodeDelivery(pin);
  if (res.valid) {
    badge.innerHTML = `
      <span style="font-size:0.78rem;color:#059669;font-weight:700;display:inline-flex;align-items:center;gap:5px;background:rgba(16,185,129,0.1);padding:4px 10px;border-radius:4px;">
        ⚡ ${res.speedTag} (${res.estimatedDateText}) · Fulfilled via ${res.partner}
      </span>
    `;
  } else {
    badge.innerHTML = `<span style="font-size:0.75rem;color:var(--text-muted);">Enter valid 6-digit pincode for delivery timeline</span>`;
  }
};

function executePaymentGateway(amount) {
  if (state.paymentMethod === 'card' || state.paymentMethod === 'emi') {
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
  // 1. Increment live counter (continuous, does not reset or stop at 1000)
  state.foundingCount++;
  setStoredFoundingCount(state.foundingCount);
  const counterEl = qs('#foundingCounterNum');
  if (counterEl) counterEl.textContent = state.foundingCount.toLocaleString('en-IN');
  const labelEl = qs('#foundingCounterLabel');
  if (labelEl) {
    if (state.foundingCount >= 1000) {
      labelEl.textContent = `All 1,000 Founding spots claimed! Now welcoming Sleep Partner #${state.foundingCount}`;
    } else {
      labelEl.textContent = `${1000 - state.foundingCount} Founding spots remaining of 1,000`;
    }
  }

  // 2. Assign/Ensure user account exists and record order
  const orderId = 'VH-' + Math.floor(100000 + Math.random() * 900000);
  const isFoundingBuyer = state.foundingCount <= 1000;
  const partnerNum = state.foundingCount;

  const orderObj = {
    id: orderId,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    status: 'Confirmed',
    step: 1,
    trackingId: 'VH-TRK-' + Math.floor(10000 + Math.random() * 90000),
    items: state.cart.map(i => ({ name: `${i.product.name} (${i.size})`, price: i.product.basePrice, qty: i.qty })),
    total: amount,
    address: qs('#coAddress')?.value || 'MG Road, Bangalore',
    partnerNumber: partnerNum,
    isFounding: isFoundingBuyer
  };

  if (!state.user) {
    const coName = qs('#coName')?.value?.trim() || 'Sleep Partner';
    const coPhone = qs('#coPhone')?.value?.trim() || '';
    const coEmail = qs('#coEmail')?.value?.trim() || '';
    state.user = {
      name: coName,
      phone: coPhone,
      email: coEmail,
      avatar: coName[0]?.toUpperCase() || 'V',
      foundingNumber: partnerNum,
      isFounding: isFoundingBuyer,
      isAmbassador: false,
      referralCode: 'VELVET-' + Math.floor(1000 + Math.random() * 9000),
      referralStats: { count: 0, earned: 0, pending: 0 },
      orders: [orderObj],
      addresses: [{ id: 'a1', tag: 'Home', name: coName, phone: coPhone, line: qs('#coAddress')?.value?.trim() || '', city: qs('#coCity')?.value?.trim() || 'Bangalore', state: 'Karnataka', pincode: qs('#coPin')?.value?.trim() || '560001', isDefault: true }],
      wishlist: []
    };
  } else {
    state.user.orders = state.user.orders || [];
    state.user.orders.unshift(orderObj);
    if (!state.user.foundingNumber) {
      state.user.foundingNumber = partnerNum;
      state.user.isFounding = isFoundingBuyer;
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
      phone: state.user.phone ? `+91 ${state.user.phone}` : 'Unspecified',
      email: state.user.email || '',
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
  const name = nameInput?.value?.trim() || state.user?.name || '';
  const phone = phoneInput?.value?.trim() || state.user?.phone || '';
  
  if (!name || !phone || phone.length < 10) {
    toast('Please enter your full name and 10-digit mobile number');
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

// 1. Business & Bulk Enquiries Direct Routing (WhatsApp & Email with Subashini)
window.openCorporateInquiry = function() {
  qs('#corporateInquiryModal')?.classList.add('active');
};
window.closeCorporateInquiry = function() {
  qs('#corporateInquiryModal')?.classList.remove('active');
};
window.openCorporateGiftingModal = window.openCorporateInquiry;
window.closeCorporateGiftingModal = window.closeCorporateInquiry;

window.routeToWhatsAppInquiry = function() {
  const company = qs('#corpInqCompany')?.value?.trim() || 'My Business';
  const qty = qs('#corpInqQty')?.value?.trim() || 'Bulk';
  const product = qs('#corpInqProduct')?.value || 'Mattresses / Sleep Suites';
  const msg = "Hi Subashini, I am reaching out regarding a Business & Bulk Enquiry for Velvet Hug.\n\nOrganization: " + company + "\nRequirement: " + product + "\nEstimated Qty: " + qty + " units\n\nPlease share a custom proposal.";
  const text = encodeURIComponent(msg);
  window.open("https://wa.me/919880011223?text=" + text, '_blank');
  window.closeCorporateInquiry();
};

window.routeToEmailInquiry = function() {
  const company = qs('#corpInqCompany')?.value?.trim() || 'My Business';
  const qty = qs('#corpInqQty')?.value?.trim() || 'Bulk';
  const product = qs('#corpInqProduct')?.value || 'Mattresses / Sleep Suites';
  const subject = encodeURIComponent("Business & Bulk Enquiry: " + company + " - Velvet Hug");
  const body = encodeURIComponent("Hi Subashini,\n\nI would like to discuss a business / bulk order for Velvet Hug.\n\nOrganization: " + company + "\nRequirement: " + product + "\nEstimated Quantity: " + qty + " units\n\nPlease let me know your case-by-case corporate pricing.\n\nWarm regards,\n" + company);
  window.location.href = "mailto:subashini@velvethug.in?subject=" + subject + "&body=" + body;
  window.closeCorporateInquiry();
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
// EMI & FINANCIAL SCHEMES CONTROLLER
// ────────────────────────────────────────────────────────────
let _standaloneEmiBank = 'hdfc';
let _modalEmiBank = 'hdfc';
let _modalEmiPrincipal = 28000;

export function renderEmiPage() {
  // 1. Render Standalone Calculator Bank Tabs
  const tabsContainer = qs('#standaloneEmiBankTabs');
  if (tabsContainer) {
    tabsContainer.innerHTML = EMI_BANKS.map(b => `
      <button type="button" class="emi-bank-tab-btn ${b.id === _standaloneEmiBank ? 'active' : ''}" onclick="window.selectStandaloneEmiBank('${b.id}')">
        <span>${b.logo}</span> <span>${b.name}</span>
      </button>
    `).join('');
  }

  // 2. Render FinTech Grid
  const fintechContainer = qs('#emiFintechList');
  if (fintechContainer) {
    fintechContainer.innerHTML = EMI_FINTECH_PARTNERS.map(f => `
      <div class="emi-fintech-card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;">
          <div style="font-size:1.6rem;">${f.logo}</div>
          <span class="badge badge-founding" style="font-size:0.68rem;">${f.tag}</span>
        </div>
        <div style="font-family:var(--font-serif);font-size:1.1rem;font-weight:700;color:var(--midnight-blue);margin-bottom:4px;">${f.name}</div>
        <div style="font-size:0.75rem;color:var(--muted-violet);font-weight:600;margin-bottom:8px;">${f.type}</div>
        <p style="font-size:0.8rem;color:var(--text-secondary);line-height:1.5;margin-bottom:14px;">${f.desc}</p>
        <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(76,63,94,0.08);padding-top:10px;">
          <span style="font-size:0.74rem;color:var(--text-muted);">Tenures: ${f.tenures.join(', ')} Months</span>
          <button class="btn btn-outline btn-sm" style="font-size:0.75rem;padding:4px 10px;" onclick="window.openEmiModal(28000, '${f.name} Plan')">Check Limit →</button>
        </div>
      </div>
    `).join('');
  }

  updateStandaloneEmiCalc();
}

export function selectStandaloneEmiBank(bankId) {
  _standaloneEmiBank = bankId;
  renderEmiPage();
}

export function updateStandaloneEmiCalc() {
  const inputEl = qs('#standaloneEmiAmount');
  const tableEl = qs('#standaloneEmiResultsTable');
  if (!tableEl) return;
  const principal = parseFloat(inputEl?.value) || 28000;
  const bankObj = EMI_BANKS.find(b => b.id === _standaloneEmiBank) || EMI_BANKS[0];

  tableEl.innerHTML = `
    <div style="overflow-x:auto;">
      <table class="emi-table-wrap">
        <thead>
          <tr>
            <th>Tenure Plan</th>
            <th>Monthly Installment</th>
            <th>Bank Interest Rate</th>
            <th>Velvet Hug Upfront Subsidy</th>
            <th>Total Cost to You</th>
          </tr>
        </thead>
        <tbody>
          ${bankObj.tenures.map(t => {
            const monthly = t.isNoCost ? Math.round(principal / t.months) : calculateEMI(principal, t.annualRate, t.months);
            const standardCost = calculateEMI(principal, t.annualRate, t.months) * t.months;
            const subsidy = t.isNoCost ? (standardCost - principal) : 0;
            const totalCost = monthly * t.months;
            return `
              <tr>
                <td>
                  <strong>${t.months} Months</strong>
                  ${t.isNoCost ? '<span class="emi-badge-nocost" style="margin-left:6px;">No-Cost</span>' : ''}
                </td>
                <td style="font-family:var(--font-serif);font-size:1.05rem;font-weight:700;color:var(--midnight-blue);">
                  ₹${monthly.toLocaleString('en-IN')}<span style="font-size:0.72rem;font-weight:400;color:var(--text-muted);">/mo</span>
                </td>
                <td>${t.annualRate}% p.a.</td>
                <td style="color:var(--accent-emerald);font-weight:600;">${subsidy > 0 ? '− ₹' + Math.round(subsidy).toLocaleString('en-IN') : '₹0'}</td>
                <td style="font-weight:700;">₹${totalCost.toLocaleString('en-IN')}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    </div>
  `;
}

export function openEmiModal(principal = 28000, title = 'Product Plan') {
  _modalEmiPrincipal = principal;
  const modal = qs('#emiCalculatorModal');
  const titleEl = qs('#modalEmiProductTitle');
  const principalEl = qs('#modalEmiPrincipalDisplay');
  if (titleEl) titleEl.textContent = `Selected: ${title}`;
  if (principalEl) principalEl.textContent = formatPrice(principal);

  renderModalEmiTabs();
  renderModalEmiTable();

  if (modal) modal.classList.add('active');
}

export function closeEmiModal() {
  qs('#emiCalculatorModal')?.classList.remove('active');
}

function renderModalEmiTabs() {
  const tabs = qs('#modalEmiBankTabs');
  if (!tabs) return;
  tabs.innerHTML = EMI_BANKS.map(b => `
    <button type="button" class="emi-bank-tab-btn ${b.id === _modalEmiBank ? 'active' : ''}" onclick="window.selectModalEmiBank('${b.id}')">
      <span>${b.logo}</span> <span>${b.name}</span>
    </button>
  `).join('');
}

export function selectModalEmiBank(bankId) {
  _modalEmiBank = bankId;
  renderModalEmiTabs();
  renderModalEmiTable();
}

function renderModalEmiTable() {
  const tbody = qs('#modalEmiTenureTableBody');
  if (!tbody) return;
  const bankObj = EMI_BANKS.find(b => b.id === _modalEmiBank) || EMI_BANKS[0];
  const principal = _modalEmiPrincipal;

  tbody.innerHTML = bankObj.tenures.map(t => {
    const monthly = t.isNoCost ? Math.round(principal / t.months) : calculateEMI(principal, t.annualRate, t.months);
    const standardCost = calculateEMI(principal, t.annualRate, t.months) * t.months;
    const subsidy = t.isNoCost ? (standardCost - principal) : 0;
    const totalCost = monthly * t.months;

    return `
      <tr>
        <td>
          <strong>${t.months} Months</strong>
          ${t.isNoCost ? '<span class="emi-badge-nocost" style="margin-left:6px;">No Cost</span>' : ''}
        </td>
        <td style="font-weight:700;color:var(--midnight-blue);">₹${monthly.toLocaleString('en-IN')}/mo</td>
        <td>${t.annualRate}% p.a.</td>
        <td style="color:var(--accent-emerald);font-weight:600;">${subsidy > 0 ? '− ₹' + Math.round(subsidy).toLocaleString('en-IN') : '₹0'}</td>
        <td style="font-weight:700;">₹${totalCost.toLocaleString('en-IN')}</td>
      </tr>
    `;
  }).join('');
}

window.selectStandaloneEmiBank = selectStandaloneEmiBank;
window.updateStandaloneEmiCalc = updateStandaloneEmiCalc;
window.openEmiModal = openEmiModal;
window.closeEmiModal = closeEmiModal;
window.selectModalEmiBank = selectModalEmiBank;

// ────────────────────────────────────────────────────────────
// RETURN & EXCHANGE POLICIES CONTROLLER
// ────────────────────────────────────────────────────────────
export function renderReturnsPage() {
  // Dynamic refresh for returns view if needed
  console.log('✓ 100-Night Trial & Returns View Active');
}

export function openReturnRequestModal() {
  const select = qs('#returnOrderSelect');
  if (select && state.user?.orders?.length) {
    select.innerHTML = `
      <option value="">Choose Order...</option>
      ${state.user.orders.map(o => `<option value="${o.id}">Order #${o.id} (${(o.items||[]).map(i=>i.name||i).join(', ')})</option>`).join('')}
      <option value="custom">Other Order (Enter Order ID)</option>
    `;
  }
  qs('#returnRequestModal')?.classList.add('active');
}

export function closeReturnRequestModal() {
  qs('#returnRequestModal')?.classList.remove('active');
}

export function submitReturnForm(e) {
  e.preventDefault();
  const orderId = qs('#returnOrderSelect')?.value || 'VH-890214';
  const type = qs('#returnRequestType')?.value || 'Firmness Exchange';
  const reason = qs('#returnReason')?.value || 'Spine requires firmer support';
  const address = qs('#returnPickupAddress')?.value || 'Bangalore';

  const rmaId = `VH-RET-${Math.floor(10000 + Math.random() * 90000)}`;

  const returnTicket = {
    rmaId,
    orderId,
    customerName: state.user?.name || 'Sleep Partner',
    customerPhone: state.user?.phone || '',
    item: 'Velvet Hug Dual-Comfort Queen (8-Inch)',
    type,
    reason,
    address,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    requestDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    trialDaysUsed: 42,
    amount: 32999,
    status: 'Pending Super Admin Approval',
    assignedPerson: null,
    evidencePhotos: [],
    defectDescription: '',
    step: 1
  };

  // 1. Save into global returns store for Super Admin
  const globalReturns = getStoredReturns();
  globalReturns.unshift(returnTicket);
  saveStoredReturns(globalReturns);

  // 2. Save into customer user state
  if (!state.user) {
    state.user = {
      name: 'Sleep Partner',
      phone: '',
      email: '',
      avatar: 'S',
      orders: [],
      returnTickets: [returnTicket],
      serviceTickets: []
    };
  } else {
    state.user.returnTickets = state.user.returnTickets || [];
    state.user.returnTickets.unshift(returnTicket);
  }

  saveStoredUser(state.user);
  closeReturnRequestModal();
  toast(`✓ Return RMA ${rmaId} submitted! Sent to Super Admin for verification.`);
  navigateTo('account');
  switchAccountPageTab('orders');
}

window.openReturnRequestModal = openReturnRequestModal;
window.closeReturnRequestModal = closeReturnRequestModal;
window.submitReturnForm = submitReturnForm;

// ────────────────────────────────────────────────────────────
// CUSTOMER EVIDENCE UPLOADER FOR 100-NIGHT RETURNS
// ────────────────────────────────────────────────────────────
window._evidenceTempPhotos = {};

window.handleEvidencePhotoSelect = function(input, id, type) {
  const files = input.files;
  if (!files || !files.length) return;

  window._evidenceTempPhotos[id] = window._evidenceTempPhotos[id] || [];

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      window._evidenceTempPhotos[id].push(e.target.result);
      const previewBox = qs(`#${type === 'return' ? 'return' : 'service'}PhotoPreview_${id}`);
      if (previewBox) {
        previewBox.innerHTML = window._evidenceTempPhotos[id].map(imgSrc => `
          <img src="${imgSrc}" alt="Evidence Preview" style="width:70px;height:70px;object-fit:cover;border-radius:6px;border:1px solid var(--champagne-gold);">
        `).join('');
      }
    };
    reader.readAsDataURL(file);
  });
};

window.attachSampleInspectionPhoto = function(id, type) {
  window._evidenceTempPhotos[id] = window._evidenceTempPhotos[id] || [];
  const rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200"><rect width="320" height="200" fill="#141F3D"/><rect x="12" y="12" width="296" height="176" rx="8" fill="#1A274E" stroke="#D4AF37" stroke-width="2" stroke-dasharray="6,4"/><text x="160" y="85" text-anchor="middle" fill="#D4AF37" font-family="sans-serif" font-size="28">📸</text><text x="160" y="125" text-anchor="middle" fill="#FDFBF7" font-family="sans-serif" font-size="13" font-weight="bold">Inspection Photo Evidence</text><text x="160" y="150" text-anchor="middle" fill="#C4BCD0" font-family="sans-serif" font-size="11">Ticket: ${id} · QA Certified</text></svg>`;
  const samplePhoto = `data:image/svg+xml;utf8,${encodeURIComponent(rawSvg)}`;
  
  window._evidenceTempPhotos[id].push(samplePhoto);
  const previewBox = qs(`#${type === 'return' ? 'return' : 'service'}PhotoPreview_${id}`);
  if (previewBox) {
    previewBox.innerHTML = window._evidenceTempPhotos[id].map(imgSrc => `
      <img src="${imgSrc}" alt="Evidence Preview" style="width:70px;height:70px;object-fit:cover;border-radius:6px;border:1px solid var(--champagne-gold);">
    `).join('');
  }
  toast('✓ Sample mattress inspection photo attached!');
};

window.submitReturnEvidence = function(rmaId) {
  const desc = qs(`#returnDefectDesc_${rmaId}`)?.value.trim() || 'Customer provided defect description and photos.';
  const photos = window._evidenceTempPhotos[rmaId] || [];

  if (!photos.length && !desc) {
    toast('Please describe the issue or attach at least 1 photo.');
    return;
  }

  // 1. Update global returns data
  const globalReturns = getStoredReturns();
  const r = globalReturns.find(item => item.rmaId === rmaId);
  if (r) {
    r.evidencePhotos = photos.length ? photos : (r.evidencePhotos || []);
    r.defectDescription = desc;
    r.status = 'Evidence Submitted — Inspection Scheduled';
    r.timeline = r.timeline || [];
    r.timeline.push({
      stage: 'Customer Evidence Received',
      timestamp: new Date().toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      note: `Defect Details: "${desc}". Photos attached: ${photos.length}.`
    });
    saveStoredReturns(globalReturns);
  }

  // 2. Update user state
  if (state.user && state.user.returnTickets) {
    const userTicket = state.user.returnTickets.find(t => t.rmaId === rmaId);
    if (userTicket) {
      userTicket.evidencePhotos = photos.length ? photos : (userTicket.evidencePhotos || []);
      userTicket.defectDescription = desc;
      userTicket.status = 'Evidence Submitted — Inspection Scheduled';
      saveStoredUser(state.user);
    }
  }

  toast('✓ Defect photos & issue description submitted! Reflected in Returns RMA page.');
  renderAccountPage();
};

function openDoctorModal(productId) {
  const product = getProductById(productId);
  const el = qs('#doctorModalContent');
  if (!el || !product) return;
  const doc = DOCTORS[Math.floor(Math.random() * DOCTORS.length)];
  el.innerHTML = `
    <button class="modal-close-icon" onclick="closeDoctorModal()">✕</button>
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
      <div class="doctor-avatar-wrap" style="width:48px;height:48px;border-radius:50%;background:rgba(76,63,94,0.1);display:flex;align-items:center;justify-content:center;color:var(--midnight-blue);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>
      </div>
      <div>
        <div style="font-family:var(--font-serif);font-size:1.1rem;font-weight:600;color:var(--midnight-blue);">${doc.name}</div>
        <div style="font-size:0.82rem;color:var(--muted-violet);">${doc.specialty}</div>
        <div style="color:#F59E0B;font-size:0.8rem;display:flex;align-items:center;gap:4px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span>${doc.rating}</span>
        </div>
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
// INTERACTIVE HERO CAROUSEL CONTROLLER (5 SLIDES)
// ────────────────────────────────────────────────────────────
let heroCarouselState = {
  currentIndex: 0,
  totalSlides: 5,
  timer: null,
  intervalMs: 5500,
  isPaused: false,
  touchStartX: 0,
  touchEndX: 0
};

function initHeroCarousel() {
  const carouselEl = qs('#heroCarousel');
  const track = qs('#heroCarouselTrack');
  const prevBtn = qs('#heroPrevBtn');
  const nextBtn = qs('#heroNextBtn');
  const dotsContainer = qs('#heroCarouselDots');
  const counterEl = qs('#heroSlideCounter');

  if (!carouselEl || !track) return;

  const slides = qsa('.hero-carousel-slide', track);
  const dots = dotsContainer ? qsa('.hero-dot-bar', dotsContainer) : [];
  heroCarouselState.totalSlides = slides.length || 5;

  function updateSlide(index) {
    if (index < 0) {
      index = heroCarouselState.totalSlides - 1;
    } else if (index >= heroCarouselState.totalSlides) {
      index = 0;
    }
    heroCarouselState.currentIndex = index;

    // Shift track: each slide is 20% width of a 500% track
    const shiftPercent = index * 20;
    track.style.transform = `translateX(-${shiftPercent}%)`;

    // Active classes on slides
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });

    // Active state on dots
    dots.forEach((dot, idx) => {
      const isActive = idx === index;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update slide counter
    if (counterEl) {
      counterEl.textContent = `0${index + 1} / 0${heroCarouselState.totalSlides}`;
    }

    restartAutoSlide();
  }

  function nextSlide() {
    updateSlide(heroCarouselState.currentIndex + 1);
  }

  function prevSlide() {
    updateSlide(heroCarouselState.currentIndex - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    heroCarouselState.timer = setInterval(() => {
      if (!heroCarouselState.isPaused && state.currentPage === 'home') {
        nextSlide();
      }
    }, heroCarouselState.intervalMs);
  }

  function stopAutoSlide() {
    if (heroCarouselState.timer) {
      clearInterval(heroCarouselState.timer);
      heroCarouselState.timer = null;
    }
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // Navigation Arrows
  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.stopPropagation();
      prevSlide();
    };
  }
  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      nextSlide();
    };
  }

  // Dots / Bar click
  dots.forEach((dot, idx) => {
    dot.onclick = (e) => {
      e.stopPropagation();
      updateSlide(idx);
    };
  });

  // Pause on hover
  carouselEl.addEventListener('mouseenter', () => {
    heroCarouselState.isPaused = true;
  });
  carouselEl.addEventListener('mouseleave', () => {
    heroCarouselState.isPaused = false;
  });

  // Touch Swipe detection
  carouselEl.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      heroCarouselState.touchStartX = e.touches[0].screenX;
      heroCarouselState.isPaused = true;
    }
  }, { passive: true });

  carouselEl.addEventListener('touchend', (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      heroCarouselState.touchEndX = e.changedTouches[0].screenX;
      heroCarouselState.isPaused = false;
      const diff = heroCarouselState.touchEndX - heroCarouselState.touchStartX;
      if (diff > 45) {
        prevSlide();
      } else if (diff < -45) {
        nextSlide();
      }
    }
  }, { passive: true });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (state.currentPage !== 'home') return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Global hooks
  window._resumeHeroCarousel = () => {
    heroCarouselState.isPaused = false;
    startAutoSlide();
  };
  window._pauseHeroCarousel = () => {
    heroCarouselState.isPaused = true;
    stopAutoSlide();
  };
  window.goToHeroSlide = updateSlide;

  // Initialize first slide and timer
  updateSlide(0);
}

// ────────────────────────────────────────────────────────────
// PROMOTIONAL MODAL POPUP AD CONTROLLER
// ────────────────────────────────────────────────────────────
let promoAdCountdownInterval = null;

function initPromoAd() {
  const modal = qs('#promoAdModal');
  if (!modal) return;

  // Countdown timer in modal
  const countdownEl = qs('#promoAdCountdown');
  if (countdownEl) {
    const targetEnd = Date.now() + (3 * 86400000) + (14 * 3600000) + (22 * 60000);
    function updateCountdown() {
      const remaining = targetEnd - Date.now();
      if (remaining <= 0) {
        countdownEl.textContent = 'Ending Soon';
        return;
      }
      const days = Math.floor(remaining / 86400000);
      const hours = Math.floor((remaining % 86400000) / 3600000);
      const minutes = Math.floor((remaining % 3600000) / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      countdownEl.textContent = `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
    }
    updateCountdown();
    if (promoAdCountdownInterval) clearInterval(promoAdCountdownInterval);
    promoAdCountdownInterval = setInterval(updateCountdown, 1000);
  }

  // Backdrop click dismisses
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closePromoAd();
    }
  });

  // Esc key dismisses
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closePromoAd();
    }
  });

  // Auto trigger after 2 seconds on home page if not seen in session
  const seen = sessionStorage.getItem('vh_promo_ad_seen');
  if (!seen) {
    setTimeout(() => {
      if (state.currentPage === 'home') {
        openPromoAd();
      }
    }, 2000);
  }
}

function openPromoAd() {
  const modal = qs('#promoAdModal');
  if (!modal) return;
  modal.style.display = 'flex';
  requestAnimationFrame(() => {
    modal.classList.add('show');
  });
}

function closePromoAd(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const modal = qs('#promoAdModal');
  if (!modal) return;
  modal.classList.remove('show');
  sessionStorage.setItem('vh_promo_ad_seen', 'true');
  setTimeout(() => {
    if (!modal.classList.contains('show')) {
      modal.style.display = 'none';
    }
  }, 350);
}

function claimPromoAd() {
  closePromoAd();
  copyPromoCode('DIWALI30', false);
  toast('🎉 Voucher DIWALI30 applied! Enjoy 30% OFF.');
  goToPage('mattresses');
}

function copyPromoCode(code = 'DIWALI30', showToastMessage = true) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).catch(() => {});
  }
  const btnText = qs('#promoCopyBtnText');
  if (btnText) {
    const originalText = btnText.textContent;
    btnText.textContent = 'Copied! ✓';
    setTimeout(() => {
      btnText.textContent = originalText;
    }, 2000);
  }
  if (showToastMessage) {
    toast(`🏷️ Coupon code "${code}" copied to clipboard!`);
  }
}

window.openPromoAd = openPromoAd;
window.closePromoAd = closePromoAd;
window.claimPromoAd = claimPromoAd;
window.copyPromoCode = copyPromoCode;

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
  if (icon) {
    icon.innerHTML = isDark
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  }
}

window.toggleConsumerTheme = function() {
  const isDark = document.body.classList.contains('dark-theme') || document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    document.body.classList.remove('dark-theme');
    localStorage.setItem('vh_consumer_theme', 'light');
    toast('Light Mode activated');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-theme');
    localStorage.setItem('vh_consumer_theme', 'dark');
    toast('Dark Mode activated');
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
  initHeroCarousel();
  initPromoAd();
  initScrollEffects();

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

// REST AMBASSADOR SIMULATION HELPER
window.simulateReferralTest = function() {
  if (!state.user) {
    toast('Please log in or place an order first to track referrals.');
    return;
  }
  state.user.referralStats = state.user.referralStats || { count: 0, earned: 0, pending: 0 };
  state.user.referralStats.count++;
  state.user.referralStats.earned += 1000;
  state.user.isAmbassador = true;
  saveStoredUser(state.user);
  toast('ðŸŽ‰ Referral tracked! +â‚¹1,000 earned! ðŸŒ¿ Rest Ambassador badge activated on your profile.');
  renderAccountModal();
  renderAccountPage();
};
