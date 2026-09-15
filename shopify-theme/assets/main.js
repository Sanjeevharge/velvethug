// Velvet Hug — Haute Sleep Architecture & Ergonomics
// Professional Royal Purple & Crisp White Interaction Engine

import { PRODUCTS, FILTER_OPTIONS, CATEGORIES, FESTIVAL_PROMOS, FOUNDING_PARTNERS_DATA, REST_AMBASSADORS_TIERS, CORPORATE_GIFTING_DATA } from './data/products.js';
import { QUIZ_QUESTIONS, calculateQuizRecommendation } from './data/quizQuestions.js';
import { MattressVisualizer3D } from './components/Visualizer3D.js';

// Application Global State
const state = {
  activeCategory: 'all',
  filters: {
    sizes: [],
    materials: [],
    firmness: [],
    tiers: [],
    ageGroups: [],
    packaging: []
  },
  compareList: [],
  cart: [
    {
      product: PRODUCTS[0], // Reserve+ Default
      size: 'Queen (78" x 60")',
      thickness: '12 Inches',
      quantity: 1
    }
  ],
  appliedCoupon: null,
  activePromo: FESTIVAL_PROMOS[0],
  quizCurrentStep: 0,
  quizAnswers: [],
  visualizerInstance: null,
  activePDPProduct: null,
  checkoutStep: 1,
  checkoutData: {
    name: 'Sanjeev Kumar',
    phone: '9876543210',
    email: 'sanjeev@example.com',
    address: 'Flat 402, Royal Palms Heights, Indiranagar',
    pincode: '560038',
    city: 'Bengaluru',
    state: 'Karnataka',
    paymentMethod: 'upi',
    upiId: 'sanjeev@okhdfcbank',
    emiBank: 'hdfc',
    emiTenure: 12
  }
};

// Initialize App on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initPromoBanner();
  initSearchEngine();
  initCategories();
  initFilterControls();
  renderProducts();
  init3DVisualizer();
  initPDPModal();
  initQuiz();
  initDoctorConsult();
  initFoundingCounter();
  initAmbassadors();
  initB2BPortals();
  initCartDrawer();
  initCheckoutFlow();
  initCompareDrawer();
  initCustomSizeModal();
  initWhatsAppWidget();
});

/* =========================================================================
   1. Dynamic Timed Promo Banner Engine
   ========================================================================= */
function initPromoBanner() {
  const bannerWrap = document.getElementById('promoTopbar');
  if (!bannerWrap) return;

  const promo = state.activePromo;
  if (!promo || !promo.isActive) {
    bannerWrap.style.display = 'none';
    return;
  }

  function updateCountdown() {
    const end = new Date(promo.endDate).getTime();
    const now = new Date().getTime();
    const diff = end - now;

    if (diff <= 0) {
      const timerEl = document.getElementById('promoCountdown');
      if (timerEl) timerEl.textContent = 'Offer Expiring Soon';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const timerEl = document.getElementById('promoCountdown');
    if (timerEl) {
      timerEl.innerHTML = `${days}d : ${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(2, '0')}s`;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  window.copyPromoCoupon = function(code) {
    navigator.clipboard.writeText(code);
    applyCouponCode(code);
    showToast(`Coupon "${code}" applied. 40% Festive Discount active.`);
  };

  window.closePromoBanner = function() {
    bannerWrap.style.display = 'none';
  };
}

/* =========================================================================
   2. Instant Search Engine & Search Modal
   ========================================================================= */
function initSearchEngine() {
  window.openSearchModal = function() {
    const modal = document.getElementById('searchModal');
    if (modal) {
      modal.classList.add('active');
      const input = document.getElementById('searchModalInput');
      if (input) {
        input.focus();
        searchProducts(input.value);
      }
    }
  };

  window.closeSearchModal = function() {
    const modal = document.getElementById('searchModal');
    if (modal) modal.classList.remove('active');
  };

  window.searchProducts = function(query) {
    const container = document.getElementById('searchResultsContainer');
    if (!container) return;

    const q = (query || '').toLowerCase().trim();
    if (!q) {
      const popular = PRODUCTS.slice(0, 4);
      container.innerHTML = popular.map(p => renderSearchResultItem(p)).join('');
      return;
    }

    const results = PRODUCTS.filter(p => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.materials && p.materials.some(m => m.toLowerCase().includes(q))) ||
        (p.tier && p.tier.toLowerCase().includes(q)) ||
        (p.firmness && p.firmness.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
      );
    });

    if (results.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:30px; color:#786C8D;">
          <p>No mattresses matching "<strong>${query}</strong>"</p>
          <button class="btn btn-outline" style="margin-top:10px;" onclick="searchProducts('')">View All Models</button>
        </div>
      `;
      return;
    }

    container.innerHTML = results.map(p => renderSearchResultItem(p)).join('');
  };

  function renderSearchResultItem(product) {
    return `
      <div class="search-result-item" onclick="openProductDetail('${product.id}'); closeSearchModal();">
        <img src="${product.heroImage}" class="search-result-img" alt="${product.title}" />
        <div>
          <h4 style="font-size:0.95rem; margin-bottom:2px; color:var(--purple-950);">${product.title}</h4>
          <div style="font-size:0.78rem; color:var(--purple-600);">${product.height || 'Luxury Profile'} · ${product.firmness}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-weight:700; color:var(--purple-950); font-size:1.05rem;">₹${product.price.toLocaleString('en-IN')}</div>
          <span class="badge-purple" style="font-size:0.65rem;">View</span>
        </div>
      </div>
    `;
  }
}

/* =========================================================================
   3. Category Showcase Rails
   ========================================================================= */
function initCategories() {
  const coreGrid = document.getElementById('coreCategoriesGrid');
  const accGrid = document.getElementById('accCategoriesGrid');

  if (coreGrid) {
    coreGrid.innerHTML = CATEGORIES.CORE.map(cat => `
      <div class="category-card" onclick="filterByCategory('${cat.id}')">
        <div class="category-card-icon">
          ${getCategorySVG(cat.icon)}
        </div>
        <h4 class="category-card-title">${cat.name}</h4>
        <span class="category-card-count">${cat.desc}</span>
      </div>
    `).join('');
  }

  if (accGrid) {
    accGrid.innerHTML = CATEGORIES.ACCESSORIES.map(acc => `
      <div class="category-card" onclick="filterByCategory('${acc.slug}')">
        <div class="category-card-icon" style="width:44px; height:44px;">
          ${getCategorySVG(acc.icon)}
        </div>
        <h5 class="category-card-title" style="font-size:0.92rem;">${acc.name}</h5>
        <span class="category-card-count">${acc.count} Items</span>
      </div>
    `).join('');
  }

  window.filterByCategory = function(catId) {
    state.activeCategory = catId;
    const catTitle = document.getElementById('catalogHeading');
    if (catTitle) {
      catTitle.textContent = catId === 'all' ? 'All Sleep Products' : `Category: ${catId.replace('-', ' ').toUpperCase()}`;
    }
    renderProducts();
    const catalogEl = document.getElementById('productsSection');
    if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
  };
}

function getCategorySVG(iconName) {
  return `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/></svg>`;
}

/* =========================================================================
   4. 6-Axis Combinable Mattress Filter Engine (AND-Logic)
   ========================================================================= */
function initFilterControls() {
  const filterContainer = document.getElementById('filterAxesGrid');
  if (!filterContainer) return;

  filterContainer.innerHTML = `
    <!-- Axis 1: Size -->
    <div class="filter-axis-box">
      <div class="filter-axis-label">
        <span>1. Size Profile</span>
        <button class="custom-size-btn" onclick="openCustomSizeModal()">Custom Size Calculator</button>
      </div>
      <div class="filter-chips-grid">
        ${FILTER_OPTIONS.sizes.map(s => `
          <button class="filter-chip ${state.filters.sizes.includes(s.id) ? 'active' : ''}" 
                  onclick="toggleFilter('sizes', '${s.id}', this)">
            ${s.label}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Axis 2: Material -->
    <div class="filter-axis-box">
      <div class="filter-axis-label">
        <span>2. Material Composition</span>
      </div>
      <div class="filter-chips-grid">
        ${FILTER_OPTIONS.materials.map(m => `
          <button class="filter-chip ${state.filters.materials.includes(m.id) ? 'active' : ''}" 
                  onclick="toggleFilter('materials', '${m.id}', this)">
            ${m.label}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Axis 3: Firmness -->
    <div class="filter-axis-box">
      <div class="filter-axis-label">
        <span>3. Firmness Rating</span>
      </div>
      <div class="filter-chips-grid">
        ${FILTER_OPTIONS.firmness.map(f => `
          <button class="filter-chip ${state.filters.firmness.includes(f.id) ? 'active' : ''}" 
                  onclick="toggleFilter('firmness', '${f.id}', this)">
            ${f.label}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Axis 4: Product Tier / Height -->
    <div class="filter-axis-box">
      <div class="filter-axis-label">
        <span>4. Product Tier</span>
      </div>
      <div class="filter-chips-grid">
        ${FILTER_OPTIONS.tiers.map(t => `
          <button class="filter-chip ${state.filters.tiers.includes(t.id) ? 'active' : ''}" 
                  onclick="toggleFilter('tiers', '${t.id}', this)">
            ${t.label}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Axis 5: Age Group -->
    <div class="filter-axis-box">
      <div class="filter-axis-label">
        <span>5. Life Stage</span>
      </div>
      <div class="filter-chips-grid">
        ${FILTER_OPTIONS.ageGroups.map(a => `
          <button class="filter-chip ${state.filters.ageGroups.includes(a.id) ? 'active' : ''}" 
                  onclick="toggleFilter('ageGroups', '${a.id}', this)">
            ${a.label}
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Axis 6: Packaging -->
    <div class="filter-axis-box">
      <div class="filter-axis-label">
        <span>6. Delivery Packaging</span>
      </div>
      <div class="filter-chips-grid">
        ${FILTER_OPTIONS.packaging.map(p => `
          <button class="filter-chip ${state.filters.packaging.includes(p.id) ? 'active' : ''}" 
                  onclick="toggleFilter('packaging', '${p.id}', this)">
            ${p.label}
          </button>
        `).join('')}
      </div>
    </div>
  `;

  window.toggleFilter = function(axis, value, buttonEl) {
    const list = state.filters[axis];
    const index = list.indexOf(value);
    if (index > -1) {
      list.splice(index, 1);
      buttonEl.classList.remove('active');
    } else {
      list.push(value);
      buttonEl.classList.add('active');
    }
    renderProducts();
  };

  window.clearAllFilters = function() {
    state.activeCategory = 'all';
    Object.keys(state.filters).forEach(k => state.filters[k] = []);
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    renderProducts();
  };
}

/* =========================================================================
   5. Products Grid Rendering with Compare & 3D Badges
   ========================================================================= */
function renderProducts() {
  const container = document.getElementById('productsGridContainer');
  const countEl = document.getElementById('filteredCountBadge');
  if (!container) return;

  const filtered = PRODUCTS.filter(p => {
    if (state.activeCategory !== 'all') {
      if (p.category !== state.activeCategory && p.accessoryType !== state.activeCategory) {
        return false;
      }
    }

    if (state.filters.sizes.length > 0) {
      if (!p.sizes || !p.sizes.some(s => state.filters.sizes.includes(s))) return false;
    }

    if (state.filters.materials.length > 0) {
      if (!p.materials || !p.materials.some(m => state.filters.materials.includes(m))) return false;
    }

    if (state.filters.firmness.length > 0) {
      if (!state.filters.firmness.includes(p.firmness)) return false;
    }

    if (state.filters.tiers.length > 0) {
      if (!state.filters.tiers.includes(p.tier)) return false;
    }

    if (state.filters.ageGroups.length > 0) {
      if (!p.ageGroups || !p.ageGroups.some(a => state.filters.ageGroups.includes(a))) return false;
    }

    if (state.filters.packaging.length > 0) {
      if (!p.packaging || !p.packaging.some(pkg => state.filters.packaging.includes(pkg))) return false;
    }

    return true;
  });

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} Models`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:60px 20px; background:var(--purple-50); border-radius:16px; border:1px solid var(--purple-200);">
        <h3 style="margin-bottom:12px; color:var(--purple-950);">No exact mattress matched all selected criteria</h3>
        <p style="margin-bottom:24px; color:var(--text-secondary);">Try clearing one or two filter criteria or consult our spine specialist on WhatsApp.</p>
        <button class="btn btn-primary" onclick="clearAllFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(product => {
    const isCompared = state.compareList.some(c => c.id === product.id);
    const emiMonthly = Math.round(product.price / 12).toLocaleString('en-IN');

    return `
      <div class="product-card" id="card-${product.id}">
        <div class="card-badge-container">
          ${product.badge ? `<span class="badge-purple-solid">${product.badge}</span>` : ''}
          ${product.isFestivalDeal ? `<span class="badge-purple">Festive Special</span>` : ''}
        </div>

        <div class="product-card-media" onclick="openProductDetail('${product.id}')">
          <img src="${product.heroImage}" alt="${product.title}" loading="lazy" />
          <button class="card-floating-3d-btn" onclick="event.stopPropagation(); inspectIn3D('${product.id}')">
            <span>3D Layer View</span>
          </button>
        </div>

        <div class="product-card-body">
          <div class="card-tier-height">
            <span>${product.height ? `${product.height} Height` : 'Velvet Hug'}</span>
            <span>★ ${product.rating} (${product.reviewCount})</span>
          </div>

          <h3 class="card-product-title" onclick="openProductDetail('${product.id}')">${product.title}</h3>
          
          ${product.firmnessScore ? `
            <div class="card-firmness-meter">
              <div class="meter-header">
                <span>Firmness: <strong>${product.firmness}</strong></span>
                <span>${product.firmnessScore}/10</span>
              </div>
              <div class="meter-bar-track">
                <div class="meter-bar-fill" style="width: ${product.firmnessScore * 10}%"></div>
              </div>
            </div>
          ` : ''}

          ${product.doctorEndorsement && product.doctorEndorsement.endorsed ? `
            <div class="card-doctor-pill" onclick="openDoctorModal('${product.id}')">
              <span>Doctor Endorsed · Consult on WhatsApp</span>
            </div>
          ` : ''}

          <div class="card-price-row">
            <span class="card-current-price">₹${product.price.toLocaleString('en-IN')}</span>
            <span class="card-original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>
            <span class="card-discount-tag">${product.discountPercentage}% OFF</span>
          </div>

          <div class="card-emi-text">
            No Cost EMI from <strong>₹${emiMonthly}/mo</strong> · 100 Nights Trial
          </div>

          <div class="card-footer-actions">
            <label class="compare-checkbox-label" title="Compare side by side">
              <input type="checkbox" ${isCompared ? 'checked' : ''} onchange="toggleCompareItem('${product.id}', this.checked)" />
              <span>Compare</span>
            </label>
            <button class="btn btn-primary" onclick="quickAddToCart('${product.id}')">
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* =========================================================================
   6. Comprehensive Product Detail Modal (PDP)
   ========================================================================= */
function initPDPModal() {
  window.openProductDetail = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    state.activePDPProduct = product;
    const modal = document.getElementById('pdpModal');
    const body = document.getElementById('pdpModalBody');
    if (!modal || !body) return;

    const emiMonthly = Math.round(product.price / 12).toLocaleString('en-IN');

    body.innerHTML = `
      <div class="pdp-modal-content">
        <button class="modal-close-icon" onclick="closeProductDetail()">&times;</button>
        
        <!-- Left: Visuals & 3D -->
        <div>
          <div class="pdp-gallery-main">
            <img id="pdpMainImage" src="${product.heroImage}" alt="${product.title}" />
          </div>
          <div style="display:flex; gap:10px; margin-bottom:16px;">
            <button class="btn btn-secondary" style="width:100%; padding:10px;" onclick="closeProductDetail(); inspectIn3D('${product.id}');">
              Inspect 3D Anatomical Layers
            </button>
          </div>

          ${product.doctorEndorsement?.endorsed ? `
            <div style="background:var(--accent-emerald-light); border:1px solid rgba(5,150,105,0.25); border-radius:10px; padding:14px; margin-top:14px;">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; color:var(--accent-emerald); font-weight:700; font-size:0.85rem;">
                <span>Clinical Recommendation · ${product.doctorEndorsement.doctorName}</span>
              </div>
              <p style="font-size:0.8rem; color:#2E1065; font-style:italic; margin-bottom:8px;">
                "${product.doctorEndorsement.quote}"
              </p>
              <button class="btn btn-whatsapp" style="width:100%; padding:8px; font-size:0.8rem;" onclick="openDoctorModal('${product.id}')">
                Ask Dr. Verma on WhatsApp
              </button>
            </div>
          ` : ''}
        </div>

        <!-- Right: Specs & Purchasing -->
        <div>
          <div class="card-badge-container" style="position:static; margin-bottom:8px;">
            ${product.badge ? `<span class="badge-purple-solid">${product.badge}</span>` : ''}
            <span class="badge-emerald">100 Nights Trial</span>
          </div>

          <h2 style="font-size:1.6rem; color:var(--purple-950); margin-bottom:4px;">${product.title}</h2>
          <div style="color:var(--purple-600); font-size:0.85rem; margin-bottom:12px; font-weight:600;">${product.tagline || ''}</div>

          <div class="card-price-row" style="margin-bottom:12px;">
            <span class="card-current-price" style="font-size:1.6rem;">₹${product.price.toLocaleString('en-IN')}</span>
            <span class="card-original-price" style="font-size:1.1rem;">₹${product.originalPrice.toLocaleString('en-IN')}</span>
            <span class="card-discount-tag" style="font-size:0.9rem;">${product.discountPercentage}% OFF</span>
          </div>

          <!-- Dimension Selector -->
          <div class="pdp-option-group">
            <div class="pdp-option-title">
              <span>Select Dimension:</span>
              <a href="javascript:void(0)" onclick="openCustomSizeModal()" style="color:var(--purple-700); font-size:0.78rem; text-decoration:underline;">Custom Dimensions?</a>
            </div>
            <div class="pdp-size-chips">
              ${(product.sizes || ['Queen (78" x 60")']).map((s, i) => `
                <button class="pdp-chip-btn ${i === 0 ? 'active' : ''}" onclick="selectPDPSize(this, '${s}')">${s}</button>
              `).join('')}
            </div>
          </div>

          <!-- Delivery PIN Code Checker -->
          <div style="background:var(--purple-50); padding:12px; border-radius:8px; border:1px solid var(--purple-100); margin-bottom:16px;">
            <div style="font-size:0.78rem; color:var(--purple-950); font-weight:600; margin-bottom:4px;">Check Express Delivery (19,000+ PIN Codes):</div>
            <div style="display:flex; gap:6px;">
              <input type="text" id="pdpPincodeInput" placeholder="Enter PIN (e.g. 560038)" value="560038" maxlength="6" style="padding:6px 10px; font-size:0.82rem; flex-grow:1;" />
              <button class="btn btn-outline" style="padding:6px 12px; font-size:0.78rem;" onclick="checkPDPPincode()">Verify</button>
            </div>
            <div id="pdpPincodeStatus" style="font-size:0.75rem; color:var(--accent-emerald); margin-top:4px;">
              Free Express Delivery in 3 Days to Bengaluru (560038)
            </div>
          </div>

          <!-- No-Cost EMI Card -->
          <div style="background:var(--purple-50); border:1px solid var(--purple-200); border-radius:8px; padding:10px 14px; margin-bottom:20px;">
            <div style="font-size:0.82rem; font-weight:700; color:var(--purple-900); margin-bottom:2px;">No Cost EMI Available</div>
            <div style="font-size:0.78rem; color:var(--text-secondary);">
              From <strong>₹${emiMonthly}/month</strong> on HDFC, ICICI, SBI & Bajaj Finserv cards.
            </div>
          </div>

          <!-- Actions -->
          <div style="display:flex; gap:10px;">
            <button class="btn btn-secondary" style="flex:1; padding:12px;" onclick="quickAddToCart('${product.id}'); closeProductDetail();">
              Add to Bag
            </button>
            <button class="btn btn-primary" style="flex:1; padding:12px;" onclick="quickBuyNow('${product.id}')">
              Instant Buy Now
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  };

  window.closeProductDetail = function() {
    const modal = document.getElementById('pdpModal');
    if (modal) modal.classList.remove('active');
  };

  window.selectPDPSize = function(btn, size) {
    document.querySelectorAll('.pdp-chip-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    showToast(`Selected size: ${size}`);
  };

  window.checkPDPPincode = function() {
    const input = document.getElementById('pdpPincodeInput');
    const status = document.getElementById('pdpPincodeStatus');
    if (!input || !status) return;

    if (input.value.trim().length === 6) {
      status.innerHTML = `<span style="color:var(--accent-emerald);">Free Express Delivery in 3-4 Days to PIN ${input.value}</span>`;
    } else {
      status.innerHTML = `<span style="color:#DC2626;">Please enter a valid 6-digit PIN code</span>`;
    }
  };

  window.quickBuyNow = function(productId) {
    quickAddToCart(productId);
    closeProductDetail();
    closeCartDrawer();
    openCheckoutModal();
  };
}

/* =========================================================================
   7. 3D Visualizer Controller
   ========================================================================= */
function init3DVisualizer() {
  const canvasEl = document.getElementById('mattress3dCanvas');
  if (!canvasEl) return;

  state.visualizerInstance = new MattressVisualizer3D('mattress3dCanvas', {
    mattress: PRODUCTS[0]
  });

  window.set3DViewMode = function(mode) {
    document.querySelectorAll('.btn-view-mode').forEach(b => b.classList.remove('active'));
    if (event && event.currentTarget) event.currentTarget.classList.add('active');

    if (state.visualizerInstance) {
      if (mode === 'exploded') {
        state.visualizerInstance.setExplodedMode(true);
      } else {
        state.visualizerInstance.setExplodedMode(false);
      }
    }
  };

  window.toggle3DRotation = function() {
    const btn = document.getElementById('btnToggleRotate');
    if (state.visualizerInstance) {
      const newState = !state.visualizerInstance.autoRotate;
      state.visualizerInstance.setAutoRotate(newState);
      if (btn) btn.classList.toggle('active', newState);
    }
  };

  window.inspectIn3D = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const vizSection = document.getElementById('3dVisualizerSection');
    if (vizSection) {
      vizSection.scrollIntoView({ behavior: 'smooth' });
      if (state.visualizerInstance) {
        state.visualizerInstance.setExplodedMode(true);
      }
      showToast(`Inspecting ${product.title} in 3D exploded view.`);
    }
  };
}

/* =========================================================================
   8. 30-Second Sleep Diagnostic Quiz Flow
   ========================================================================= */
function initQuiz() {
  window.openQuizModal = function() {
    state.quizCurrentStep = 0;
    state.quizAnswers = [];
    const modal = document.getElementById('quizModal');
    if (modal) modal.classList.add('active');
    renderQuizStep();
  };

  window.closeQuizModal = function() {
    const modal = document.getElementById('quizModal');
    if (modal) modal.classList.remove('active');
  };

  function renderQuizStep() {
    const content = document.getElementById('quizModalBody');
    if (!content) return;

    if (state.quizCurrentStep >= QUIZ_QUESTIONS.length) {
      const recommendation = calculateQuizRecommendation(state.quizAnswers);
      const product = PRODUCTS.find(p => p.id === recommendation.productId) || PRODUCTS[0];

      content.innerHTML = `
        <div style="text-align:center; padding:10px 0;">
          <span class="badge-purple-solid" style="margin-bottom:12px;">Diagnostic Complete</span>
          <h2 style="font-size:1.8rem; color:var(--purple-950); margin-bottom:6px;">Your Ideal Match: ${recommendation.tierName}</h2>
          <p style="color:var(--text-secondary); margin-bottom:20px; font-size:0.95rem;">${recommendation.whyRecommended}</p>
          
          <div style="background:var(--purple-50); border:1px solid var(--purple-200); border-radius:12px; padding:16px; display:flex; gap:16px; align-items:center; text-align:left; margin-bottom:20px;">
            <img src="${product.heroImage}" style="width:100px; height:85px; object-fit:cover; border-radius:8px;" />
            <div>
              <h4 style="font-size:1.05rem; color:var(--purple-950); margin-bottom:2px;">${product.title}</h4>
              <div style="color:var(--purple-800); font-weight:800; font-size:1.1rem; margin-bottom:4px;">₹${product.price.toLocaleString('en-IN')} <span style="font-size:0.8rem; color:#786C8D; text-decoration:line-through;">₹${product.originalPrice.toLocaleString('en-IN')}</span></div>
              <p style="font-size:0.75rem; color:var(--purple-700);">${recommendation.doctorNote}</p>
            </div>
          </div>

          <div style="display:flex; gap:10px; justify-content:center;">
            <button class="btn btn-primary" onclick="quickAddToCart('${product.id}'); closeQuizModal();">
              Add to Bag (₹${product.price.toLocaleString('en-IN')})
            </button>
            <button class="btn btn-outline" onclick="openQuizModal()">Retake Diagnostic</button>
          </div>
        </div>
      `;
      return;
    }

    const q = QUIZ_QUESTIONS[state.quizCurrentStep];
    const progressPercent = ((state.quizCurrentStep + 1) / QUIZ_QUESTIONS.length) * 100;

    content.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <span style="font-size:0.78rem; color:var(--purple-700); font-weight:700;">QUESTION ${state.quizCurrentStep + 1} OF ${QUIZ_QUESTIONS.length}</span>
        <span style="font-size:0.78rem; color:var(--text-muted);">Haute Sleep Science</span>
      </div>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width: ${progressPercent}%"></div>
      </div>

      <h3 style="font-size:1.35rem; color:var(--purple-950); margin-bottom:4px;">${q.question}</h3>
      <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:16px;">${q.subtitle}</p>

      <div class="quiz-options-list">
        ${q.options.map(opt => `
          <div class="quiz-option-card" onclick="selectQuizOption('${opt.id}')">
            <span class="quiz-option-title">${opt.label}</span>
            <span class="quiz-option-sub">${opt.desc}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  window.selectQuizOption = function(optionId) {
    state.quizAnswers[state.quizCurrentStep] = optionId;
    state.quizCurrentStep++;
    renderQuizStep();
  };
}

/* =========================================================================
   9. Doctor Consultation WhatsApp
   ========================================================================= */
function initDoctorConsult() {
  window.openDoctorModal = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
    const modal = document.getElementById('doctorModal');
    if (!modal) return;

    document.getElementById('doctorProductTitle').textContent = product.title;
    document.getElementById('doctorQuoteText').textContent = product.doctorEndorsement?.quote || 'Velvet Hug ergonomic mattress ensures maximum spinal decompression during sleep.';

    const message = encodeURIComponent(`Hello Dr. Alok Verma, I am exploring the Velvet Hug "${product.title}" on velvethug.in for my back posture. Could you advise if this is suitable for my sleep needs?`);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919876543210&text=${message}`;

    document.getElementById('btnDoctorWhatsApp').onclick = function() {
      window.open(whatsappUrl, '_blank');
    };

    modal.classList.add('active');
  };

  window.closeDoctorModal = function() {
    const modal = document.getElementById('doctorModal');
    if (modal) modal.classList.remove('active');
  };
}

/* =========================================================================
   10. Founding Sleep Partner Live Counter & Ambassadors
   ========================================================================= */
function initFoundingCounter() {
  const counterEl = document.getElementById('foundingPartnerCount');
  if (counterEl) {
    let current = 0;
    const target = FOUNDING_PARTNERS_DATA.currentCount;
    const interval = setInterval(() => {
      current += Math.ceil((target - current) / 10);
      counterEl.textContent = `${current} / 1,000`;
      if (current >= target) {
        counterEl.textContent = `${target} / 1,000 Claimed`;
        clearInterval(interval);
      }
    }, 40);
  }

  window.applyFoundingPartner = function() {
    showToast('Application received for Founding Sleep Partner Circle (#848).');
  };
}

function initAmbassadors() {
  const container = document.getElementById('ambassadorsGrid');
  if (!container) return;

  container.innerHTML = REST_AMBASSADORS_TIERS.map(t => `
    <div style="background:#FFFFFF; border:1px solid var(--purple-100); border-radius:12px; padding:22px; display:flex; flex-direction:column; box-shadow:var(--shadow-card);">
      <div style="margin-bottom:12px;">
        <span class="badge-purple">${t.referralsNeeded}</span>
        <h4 style="margin-top:8px; font-size:1.1rem; color:var(--purple-950);">${t.tier}</h4>
      </div>
      <div style="font-size:1.05rem; font-weight:700; color:var(--purple-800); margin:8px 0 4px;">${t.reward}</div>
      <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:16px;">${t.perk}</p>
      <button class="btn btn-outline" style="margin-top:auto; width:100%;" onclick="openReferralModal()">
        Join Ambassador Circle
      </button>
    </div>
  `).join('');

  window.openReferralModal = function() {
    const code = 'HUG' + Math.floor(1000 + Math.random() * 9000);
    const link = `https://velvethug.in?ref=${code}`;
    const shareText = encodeURIComponent(`I upgraded to Velvet Hug ergonomic mattress. Use my referral link for an extra ₹2,000 discount: ${link}`);
    window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
  };
}

/* =========================================================================
   11. B2B Corporate Gifting & Institutional Orders
   ========================================================================= */
function initB2BPortals() {
  window.openCorporateGiftingModal = function() {
    const modal = document.getElementById('corporateGiftingModal');
    if (modal) modal.classList.add('active');
  };

  window.closeCorporateGiftingModal = function() {
    const modal = document.getElementById('corporateGiftingModal');
    if (modal) modal.classList.remove('active');
  };

  window.submitB2BQuote = function(e) {
    if (e) e.preventDefault();
    showToast('Corporate quotation inquiry received. A Sleep Executive will respond within 2 hours.');
    closeCorporateGiftingModal();
  };
}

/* =========================================================================
   12. Cart Drawer & Coupon Engine
   ========================================================================= */
function initCartDrawer() {
  window.openCartDrawer = function() {
    renderCart();
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (backdrop) backdrop.classList.add('open');
  };

  window.closeCartDrawer = function() {
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (backdrop) backdrop.classList.remove('open');
  };

  window.quickAddToCart = function(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = state.cart.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({
        product: product,
        size: 'Queen (78" x 60")',
        thickness: product.height || '8 Inches',
        quantity: 1
      });
    }

    updateCartBadge();
    openCartDrawer();
    showToast(`Added ${product.title} to bag`);
  };

  window.updateCartQuantity = function(productId, change) {
    const item = state.cart.find(i => i.product.id === productId);
    if (!item) return;
    item.quantity += change;
    if (item.quantity <= 0) {
      state.cart = state.cart.filter(i => i.product.id !== productId);
    }
    renderCart();
    updateCartBadge();
  };

  window.applyCartCoupon = function() {
    const input = document.getElementById('cartCouponInput');
    if (!input) return;
    const code = input.value.trim().toUpperCase();
    if (code === 'FESTIVE40' || code === 'MONSOON15') {
      applyCouponCode(code);
      showToast(`Coupon ${code} applied successfully!`);
    } else {
      showToast('Invalid coupon code. Try "FESTIVE40"');
    }
  };

  function applyCouponCode(code) {
    state.appliedCoupon = code;
    renderCart();
  }

  function updateCartBadge() {
    const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartBadgeCount');
    if (badge) badge.textContent = count;
  }

  function renderCart() {
    const container = document.getElementById('cartItemsContainer');
    const totalEl = document.getElementById('cartTotalDisplay');
    const emiEl = document.getElementById('cartEmiDisplay');
    const discountRow = document.getElementById('cartDiscountRow');
    if (!container) return;

    if (state.cart.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:60px 20px; color:var(--text-muted);">
          <p style="font-size:1rem; margin-bottom:14px;">Your Velvet Hug bag is empty</p>
          <button class="btn btn-primary" onclick="closeCartDrawer()">Explore Mattresses</button>
        </div>
      `;
      if (totalEl) totalEl.textContent = '₹0';
      if (emiEl) emiEl.textContent = '₹0/mo';
      return;
    }

    let subtotal = 0;

    container.innerHTML = state.cart.map(item => {
      const itemTotal = item.product.price * item.quantity;
      subtotal += itemTotal;

      return `
        <div class="cart-item-row">
          <img src="${item.product.heroImage}" class="cart-item-img" alt="${item.product.title}" />
          <div>
            <h4 class="cart-item-title">${item.product.title}</h4>
            <div class="cart-item-meta">${item.size} · 10-Yr Warranty</div>
            <div class="cart-item-price">₹${itemTotal.toLocaleString('en-IN')}</div>
          </div>
          <div style="display:flex; align-items:center; gap:6px; background:#FFFFFF; border:1px solid var(--purple-200); padding:2px 6px; border-radius:4px;">
            <button onclick="updateCartQuantity('${item.product.id}', -1)" style="background:transparent; color:var(--purple-950); font-weight:700; font-size:0.9rem;">-</button>
            <span style="font-weight:700; font-size:0.85rem;">${item.quantity}</span>
            <button onclick="updateCartQuantity('${item.product.id}', 1)" style="background:transparent; color:var(--purple-950); font-weight:700; font-size:0.9rem;">+</button>
          </div>
        </div>
      `;
    }).join('');

    let discount = 0;
    if (state.appliedCoupon === 'FESTIVE40') {
      discount = Math.round(subtotal * 0.4);
    } else if (state.appliedCoupon === 'MONSOON15') {
      discount = Math.round(subtotal * 0.15);
    }

    const finalTotal = Math.max(0, subtotal - discount);

    if (discountRow) {
      if (discount > 0) {
        discountRow.style.display = 'flex';
        discountRow.innerHTML = `
          <span>Festive Savings (${state.appliedCoupon})</span>
          <span style="color:var(--accent-emerald);">-₹${discount.toLocaleString('en-IN')}</span>
        `;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (totalEl) totalEl.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
    if (emiEl) emiEl.textContent = `₹${Math.round(finalTotal / 12).toLocaleString('en-IN')}/mo`;
  }

  window.checkPinCode = function() {
    const input = document.getElementById('cartPincodeInput');
    const status = document.getElementById('pincodeStatus');
    if (!input || !status) return;

    const val = input.value.trim();
    if (val.length === 6 && !isNaN(val)) {
      status.innerHTML = `<span style="color:var(--accent-emerald);">Free Express White-Glove Delivery to ${val} in 3-4 Days</span>`;
    } else {
      status.innerHTML = `<span style="color:#DC2626;">Please enter a valid 6-digit Indian PIN code</span>`;
    }
  };

  updateCartBadge();
}

/* =========================================================================
   13. End-to-End India Checkout Flow
   ========================================================================= */
function initCheckoutFlow() {
  window.openCheckoutModal = function() {
    closeCartDrawer();
    state.checkoutStep = 1;
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.add('active');
    renderCheckoutStep();
  };

  window.closeCheckoutModal = function() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('active');
  };

  function renderCheckoutStep() {
    const body = document.getElementById('checkoutModalBody');
    if (!body) return;

    let subtotal = state.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    let discount = state.appliedCoupon === 'FESTIVE40' ? Math.round(subtotal * 0.4) : (state.appliedCoupon === 'MONSOON15' ? Math.round(subtotal * 0.15) : 0);
    let finalTotal = Math.max(0, subtotal - discount);

    if (state.checkoutStep === 1) {
      body.innerHTML = `
        <div class="checkout-steps-bar">
          <div class="checkout-step-pill active"><span class="checkout-step-num">1</span> Shipping Details</div>
          <div class="checkout-step-pill"><span class="checkout-step-num">2</span> Payment & EMI</div>
          <div class="checkout-step-pill"><span class="checkout-step-num">3</span> Confirmation</div>
        </div>

        <h3 style="font-size:1.3rem; color:var(--purple-950); margin-bottom:16px;">Delivery & Installation Address</h3>
        
        <form onsubmit="proceedToPaymentStep(event)" style="display:flex; flex-direction:column; gap:12px;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">Full Name</label>
              <input type="text" id="chkName" required value="${state.checkoutData.name}" style="width:100%;" />
            </div>
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">Mobile Number</label>
              <input type="tel" id="chkPhone" required value="${state.checkoutData.phone}" maxlength="10" style="width:100%;" />
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">Email Address</label>
              <input type="email" id="chkEmail" required value="${state.checkoutData.email}" style="width:100%;" />
            </div>
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">6-Digit PIN Code</label>
              <input type="text" id="chkPin" required value="${state.checkoutData.pincode}" maxlength="6" style="width:100%;" />
            </div>
          </div>

          <div>
            <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">Street Address / Apartment</label>
            <input type="text" id="chkAddr" required value="${state.checkoutData.address}" style="width:100%;" />
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">City</label>
              <input type="text" id="chkCity" required value="${state.checkoutData.city}" style="width:100%;" />
            </div>
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">State</label>
              <input type="text" id="chkState" required value="${state.checkoutData.state}" style="width:100%;" />
            </div>
          </div>

          <div style="background:var(--purple-50); padding:12px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
            <div>
              <div style="font-size:0.8rem; color:var(--text-muted);">Total Payable:</div>
              <div style="font-size:1.2rem; font-weight:800; color:var(--purple-950);">₹${finalTotal.toLocaleString('en-IN')}</div>
            </div>
            <button type="submit" class="btn btn-primary">
              Continue to Payment →
            </button>
          </div>
        </form>
      `;
    } else if (state.checkoutStep === 2) {
      body.innerHTML = `
        <div class="checkout-steps-bar">
          <div class="checkout-step-pill"><span class="checkout-step-num">✓</span> Shipping</div>
          <div class="checkout-step-pill active"><span class="checkout-step-num">2</span> Payment & EMI</div>
          <div class="checkout-step-pill"><span class="checkout-step-num">3</span> Confirmation</div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:16px;">
          <h3 style="font-size:1.3rem; color:var(--purple-950); margin:0;">Razorpay Secure Payment</h3>
          <span style="font-size:1.15rem; font-weight:800; color:var(--purple-800);">₹${finalTotal.toLocaleString('en-IN')}</span>
        </div>

        <div class="payment-tab-selector">
          <button class="payment-tab-btn ${state.checkoutData.paymentMethod === 'upi' ? 'active' : ''}" onclick="selectPaymentMethod('upi')">
            UPI / QR
          </button>
          <button class="payment-tab-btn ${state.checkoutData.paymentMethod === 'card' ? 'active' : ''}" onclick="selectPaymentMethod('card')">
            Cards & EMI
          </button>
          <button class="payment-tab-btn ${state.checkoutData.paymentMethod === 'netbanking' ? 'active' : ''}" onclick="selectPaymentMethod('netbanking')">
            NetBanking
          </button>
          <button class="payment-tab-btn ${state.checkoutData.paymentMethod === 'cod' ? 'active' : ''}" onclick="selectPaymentMethod('cod')">
            Cash on Delivery
          </button>
        </div>

        <div id="paymentMethodFormContainer">
          ${renderPaymentMethodContent(finalTotal)}
        </div>
      `;
    } else if (state.checkoutStep === 3) {
      const orderId = 'VH-IN-' + Math.floor(100000 + Math.random() * 900000);

      body.innerHTML = `
        <div class="order-success-card">
          <div class="success-check-circle">✓</div>
          <span class="badge-purple-solid">Order Confirmed</span>
          <h2 style="font-size:1.8rem; color:var(--purple-950); margin:10px 0 4px;">Thank you, ${state.checkoutData.name}</h2>
          <p style="color:var(--text-secondary); font-size:0.95rem; margin-bottom:18px;">
            Your order <strong>#${orderId}</strong> has been received and scheduled for handcrafted fabrication.
          </p>

          <div style="background:var(--purple-50); border:1px solid var(--purple-200); border-radius:12px; padding:18px; text-align:left; max-width:520px; margin:0 auto 20px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.85rem;">
              <span style="color:var(--text-muted);">Delivery Address:</span>
              <span style="color:var(--purple-950); font-weight:600;">${state.checkoutData.address}, ${state.checkoutData.city}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:6px; font-size:0.85rem;">
              <span style="color:var(--text-muted);">Payment Method:</span>
              <span style="color:var(--purple-800); font-weight:700;">${state.checkoutData.paymentMethod.toUpperCase()} (₹${finalTotal.toLocaleString('en-IN')})</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
              <span style="color:var(--text-muted);">Estimated Delivery:</span>
              <span style="color:var(--accent-emerald); font-weight:700;">3-4 Days Express White-Glove</span>
            </div>
          </div>

          <div style="display:flex; gap:10px; justify-content:center;">
            <button class="btn btn-whatsapp" onclick="simulateWhatsAppAlert('${orderId}')">
              Receive WhatsApp Tracking Updates
            </button>
            <button class="btn btn-primary" onclick="closeCheckoutModal()">
              Continue Shopping
            </button>
          </div>
        </div>
      `;

      if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
      }
    }
  }

  function renderPaymentMethodContent(finalTotal) {
    if (state.checkoutData.paymentMethod === 'upi') {
      return `
        <div style="text-align:center; padding:10px 0;">
          <div class="upi-qr-box">
            <div style="font-weight:700; font-size:0.95rem; margin-bottom:6px; color:var(--purple-950);">Scan UPI QR Code</div>
            <div style="background:var(--purple-950); width:130px; height:130px; margin:0 auto 10px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:monospace; border-radius:6px; font-size:0.75rem;">
              [ UPI QR ]
            </div>
            <div style="font-size:0.72rem; color:var(--text-muted);">GPay · PhonePe · Paytm · BHIM</div>
          </div>

          <button class="btn btn-primary" style="width:100%; max-width:340px; padding:12px;" onclick="completeSimulatedOrder()">
            Simulate Instant UPI Approval (₹${finalTotal.toLocaleString('en-IN')})
          </button>
        </div>
      `;
    } else if (state.checkoutData.paymentMethod === 'card') {
      return `
        <div style="display:flex; flex-direction:column; gap:10px;">
          <div>
            <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">Card Number</label>
            <input type="text" value="4532 •••• •••• 8842" style="width:100%;" />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">Expiry (MM/YY)</label>
              <input type="text" value="08/29" style="width:100%;" />
            </div>
            <div>
              <label style="font-size:0.78rem; color:var(--purple-950); font-weight:600;">CVV</label>
              <input type="password" value="882" style="width:100%;" />
            </div>
          </div>

          <div style="background:var(--purple-50); border:1px solid var(--purple-200); padding:10px; border-radius:8px;">
            <div style="font-size:0.8rem; font-weight:700; color:var(--purple-950); margin-bottom:4px;">No-Cost EMI Plan:</div>
            <select onchange="updateEMITenure(this.value)" style="width:100%; font-size:0.82rem;">
              <option value="12">12 Months (0% Interest) — ₹${Math.round(finalTotal/12).toLocaleString('en-IN')}/mo (HDFC / ICICI)</option>
              <option value="6">6 Months (0% Interest) — ₹${Math.round(finalTotal/6).toLocaleString('en-IN')}/mo (SBI)</option>
              <option value="3">3 Months (0% Interest) — ₹${Math.round(finalTotal/3).toLocaleString('en-IN')}/mo (Bajaj Finserv)</option>
            </select>
          </div>

          <button class="btn btn-primary" style="width:100%; padding:12px; margin-top:6px;" onclick="completeSimulatedOrder()">
            Authorize Card Payment (₹${finalTotal.toLocaleString('en-IN')})
          </button>
        </div>
      `;
    } else if (state.checkoutData.paymentMethod === 'cod') {
      return `
        <div style="text-align:center; padding:16px 0;">
          <h4 style="font-size:1.05rem; color:var(--purple-950); margin-bottom:4px;">Cash / UPI on Delivery</h4>
          <p style="font-size:0.82rem; color:var(--text-secondary); max-width:380px; margin:0 auto 16px;">
            Pay with cash or scan the courier executive's UPI QR code upon arrival at your doorstep.
          </p>
          <button class="btn btn-primary" style="width:100%; max-width:340px; padding:12px;" onclick="completeSimulatedOrder()">
            Confirm Order with Cash on Delivery
          </button>
        </div>
      `;
    } else {
      return `
        <div style="text-align:center; padding:16px 0;">
          <h4 style="font-size:1.05rem; color:var(--purple-950); margin-bottom:12px;">Select NetBanking Institution:</h4>
          <select style="width:100%; max-width:340px; margin-bottom:16px; font-size:0.85rem;">
            <option>HDFC Bank</option>
            <option>ICICI Bank</option>
            <option>State Bank of India</option>
            <option>Axis Bank</option>
            <option>Kotak Mahindra Bank</option>
          </select>
          <button class="btn btn-primary" style="width:100%; max-width:340px; padding:12px;" onclick="completeSimulatedOrder()">
            Proceed to Bank Gateway
          </button>
        </div>
      `;
    }
  }

  window.proceedToPaymentStep = function(e) {
    if (e) e.preventDefault();
    state.checkoutData.name = document.getElementById('chkName').value;
    state.checkoutData.phone = document.getElementById('chkPhone').value;
    state.checkoutData.email = document.getElementById('chkEmail').value;
    state.checkoutData.pincode = document.getElementById('chkPin').value;
    state.checkoutData.address = document.getElementById('chkAddr').value;
    state.checkoutData.city = document.getElementById('chkCity').value;
    state.checkoutData.state = document.getElementById('chkState').value;
    state.checkoutStep = 2;
    renderCheckoutStep();
  };

  window.selectPaymentMethod = function(method) {
    state.checkoutData.paymentMethod = method;
    renderCheckoutStep();
  };

  window.updateEMITenure = function(tenure) {
    state.checkoutData.emiTenure = parseInt(tenure) || 12;
  };

  window.completeSimulatedOrder = function() {
    state.checkoutStep = 3;
    renderCheckoutStep();
  };

  window.simulateWhatsAppAlert = function(orderId) {
    const text = encodeURIComponent(`Hi Velvet Hug, please send tracking updates for order #${orderId} to my WhatsApp.`);
    window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${text}`, '_blank');
  };
}

/* =========================================================================
   14. Compare Matrix Drawer
   ========================================================================= */
function initCompareDrawer() {
  window.toggleCompareItem = function(productId, isChecked) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    if (isChecked) {
      if (state.compareList.length >= 4) {
        showToast('You can compare up to 4 mattresses at a time.');
        return;
      }
      if (!state.compareList.some(p => p.id === productId)) {
        state.compareList.push(product);
      }
    } else {
      state.compareList = state.compareList.filter(p => p.id !== productId);
    }

    updateCompareFloatingBar();
  };

  function updateCompareFloatingBar() {
    const bar = document.getElementById('compareFloatingBar');
    const text = document.getElementById('compareBarText');
    if (!bar || !text) return;

    if (state.compareList.length > 0) {
      bar.classList.add('visible');
      text.textContent = `Compare (${state.compareList.length}) Mattresses`;
    } else {
      bar.classList.remove('visible');
    }
  }

  window.openCompareModal = function() {
    const modal = document.getElementById('compareModal');
    const body = document.getElementById('compareModalTableContainer');
    if (!modal || !body) return;

    if (state.compareList.length < 2) {
      showToast('Select at least 2 mattresses to compare.');
      return;
    }

    body.innerHTML = `
      <table class="compare-table">
        <thead>
          <tr>
            <th>Specification</th>
            ${state.compareList.map(p => `
              <th style="min-width:180px;">
                <div style="font-size:0.95rem; color:var(--purple-950); margin-bottom:2px;">${p.title}</div>
                <div style="color:var(--purple-800); font-size:1.05rem; font-weight:800;">₹${p.price.toLocaleString('en-IN')}</div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Profile Height</strong></td>
            ${state.compareList.map(p => `<td>${p.height || '8 Inches'}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Firmness & Rating</strong></td>
            ${state.compareList.map(p => `<td>${p.firmness} (${p.firmnessScore}/10)</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Core Materials</strong></td>
            ${state.compareList.map(p => `<td>${p.materials ? p.materials.join(' + ') : 'Hybrid'}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Motion Isolation</strong></td>
            ${state.compareList.map(p => `<td>${p.tier === 'ReservePlus' || p.tier === 'Reserve' ? 'Zero Partner Motion' : 'High Isolation'}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Spine Support Alignment</strong></td>
            ${state.compareList.map(p => `<td>${p.doctorEndorsement?.endorsed ? 'Doctor Endorsed' : '5-Zone Ergonomic'}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>In-Home Trial</strong></td>
            ${state.compareList.map(p => `<td>100 Nights Risk-Free</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Warranty</strong></td>
            ${state.compareList.map(p => `<td>${p.specs?.warranty || '10 Years'}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Action</strong></td>
            ${state.compareList.map(p => `
              <td>
                <button class="btn btn-primary" style="padding:6px 12px; font-size:0.8rem;" onclick="quickAddToCart('${p.id}')">
                  Add to Bag
                </button>
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    `;

    modal.classList.add('active');
  };

  window.closeCompareModal = function() {
    const modal = document.getElementById('compareModal');
    if (modal) modal.classList.remove('active');
  };
}

/* =========================================================================
   15. Custom Mattress Size Calculator Modal
   ========================================================================= */
function initCustomSizeModal() {
  window.openCustomSizeModal = function() {
    const modal = document.getElementById('customSizeModal');
    if (modal) modal.classList.add('active');
  };

  window.closeCustomSizeModal = function() {
    const modal = document.getElementById('customSizeModal');
    if (modal) modal.classList.remove('active');
  };

  window.calculateCustomSizePrice = function() {
    const length = parseFloat(document.getElementById('customLengthInput').value) || 78;
    const width = parseFloat(document.getElementById('customWidthInput').value) || 60;
    const height = parseFloat(document.getElementById('customHeightInput').value) || 8;

    const sqInches = length * width;
    const estimatedPrice = Math.round((sqInches * 4.8 * (height / 8)) / 100) * 100;

    const display = document.getElementById('customSizeEstimatedPrice');
    if (display) {
      display.textContent = `₹${estimatedPrice.toLocaleString('en-IN')}`;
    }
  };
}

/* =========================================================================
   16. WhatsApp Floating Concierge
   ========================================================================= */
function initWhatsAppWidget() {
  window.openGeneralWhatsApp = function() {
    const text = encodeURIComponent('Hello Velvet Hug! I would like sleep assistance regarding your mattresses on velvethug.in.');
    window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${text}`, '_blank');
  };

  window.openStorySubmissionWhatsApp = function() {
    const text = encodeURIComponent('Hello Velvet Hug! I would like to submit my Velvet Hug mattress video/photo story for the Rest Rewards.');
    window.open(`https://api.whatsapp.com/send?phone=919876543210&text=${text}`, '_blank');
  };
}

/* =========================================================================
   17. Global Toast Notification Utility
   ========================================================================= */
function showToast(message) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.style.cssText = `
      position: fixed;
      top: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: var(--purple-950);
      border: 1px solid var(--purple-400);
      color: #FFFFFF;
      padding: 10px 22px;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(40,12,61,0.3);
      z-index: 9999;
      opacity: 0;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(-20px)';
  }, 3200);
}
