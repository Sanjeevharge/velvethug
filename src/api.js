// src/api.js — Velvet Hug High-Speed PostgreSQL Client API
// Communicates with the Express REST Backend & PostgreSQL Engine
// Zero localStorage for business entities; provides strict ACID checkout and real-time retrieval

const BASE_URL = window.location.origin;

class VelvetHugAPI {
  constructor() {
    this.token = this.getCookie('vh_sess_tok') || null;
    this.adminToken = this.getCookie('vh_admin_tok') || null;
  }

  // Cookie helpers for secure token persistence without localStorage dependency
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  setCookie(name, value, days = 30) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Strict`;
  }

  deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }

  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    if (this.adminToken && endpoint.startsWith('/api/company')) {
      headers['Authorization'] = `Bearer ${this.adminToken}`;
    }

    const config = {
      ...options,
      headers
    };

    const start = performance.now();
    try {
      const response = await fetch(url, config);
      const latency = (performance.now() - start).toFixed(2);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: Failed to fetch from backend`);
      }

      data._clientLatencyMs = latency;
      return data;
    } catch (err) {
      console.error(`[API Error] ${options.method || 'GET'} ${endpoint}:`, err.message);
      throw err;
    }
  }

  // 1. Health & ACID Engine Diagnostics
  async health() {
    return this.request('/api/health');
  }

  // 2. Catalog & Storefront Queries (Cached in PostgreSQL memory with sub-millisecond lookups)
  async getProducts(params = {}) {
    const qs = new URLSearchParams(params).toString();
    return this.request(`/api/catalog/products${qs ? '?' + qs : ''}`);
  }

  async getProduct(id) {
    return this.request(`/api/catalog/products/${encodeURIComponent(id)}`);
  }

  async getCategories() {
    return this.request('/api/catalog/categories');
  }

  async getDoctors() {
    return this.request('/api/catalog/doctors');
  }

  async getPromos() {
    return this.request('/api/catalog/promos');
  }

  async getQuizQuestions() {
    return this.request('/api/catalog/quiz');
  }

  async getFoundingPartnerStats() {
    return this.request('/api/catalog/founding-count');
  }

  // 3. User & Customer Operations
  async loginOrRegister(payload) {
    const res = await this.request('/api/user/auth/login-or-register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    if (res.token) {
      this.token = res.token;
      this.setCookie('vh_sess_tok', res.token);
    }
    return res;
  }

  async getSession() {
    if (!this.token) return { success: false, error: 'Not authenticated' };
    return this.request('/api/user/session');
  }

  logout() {
    this.token = null;
    this.deleteCookie('vh_sess_tok');
  }

  // 4. Cart Operations
  async getCart(sessionId) {
    return this.request(`/api/user/cart?sessionId=${encodeURIComponent(sessionId)}`);
  }

  async addToCart(payload) {
    return this.request('/api/user/cart', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async removeCartItem(cartItemId) {
    return this.request(`/api/user/cart/${cartItemId}`, {
      method: 'DELETE'
    });
  }

  async clearCart(sessionId) {
    return this.request(`/api/user/cart?sessionId=${encodeURIComponent(sessionId)}`, {
      method: 'DELETE'
    });
  }

  // 5. Checkout (ACID Transaction)
  async checkout(orderPayload) {
    return this.request('/api/user/checkout', {
      method: 'POST',
      body: JSON.stringify(orderPayload)
    });
  }

  async getUserOrders(query = {}) {
    const qs = new URLSearchParams(query).toString();
    return this.request(`/api/user/orders${qs ? '?' + qs : ''}`);
  }

  async submitReturn(payload) {
    return this.request('/api/user/returns', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async submitQuizDiagnosis(payload) {
    return this.request('/api/user/quiz/submit', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  // 6. Company Admin Operations
  async companyLogin(email, password, twoFactorCode) {
    const res = await this.request('/api/company/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, twoFactorCode })
    });
    if (res.token) {
      this.adminToken = res.token;
      this.setCookie('vh_admin_tok', res.token);
    }
    return res;
  }

  async getCompanyStats() {
    return this.request('/api/company/stats');
  }

  async getCompanyInventory() {
    return this.request('/api/company/inventory');
  }

  async updateCompanyInventory(id, payload) {
    return this.request(`/api/company/inventory/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
  }

  async getCompanyOrders() {
    return this.request('/api/company/orders');
  }

  async updateCompanyOrderStatus(orderId, payload) {
    return this.request(`/api/company/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
  }

  async getCompanyReturns() {
    return this.request('/api/company/returns');
  }

  async updateCompanyReturnStatus(rmaId, payload) {
    return this.request(`/api/company/returns/${rmaId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
  }

  async getCompanyAuditLogs() {
    return this.request('/api/company/audit-logs');
  }

  async createCompanySku(payload) {
    return this.request('/api/company/inventory', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  async deleteCompanySku(sku) {
    return this.request(`/api/company/inventory/${encodeURIComponent(sku)}`, {
      method: 'DELETE'
    });
  }

  // 7. System Synchronization & Testing Resets
  async resetUsersData() {
    return this.request('/api/system/reset-users', { method: 'POST' });
  }

  async resetCompanyData() {
    return this.request('/api/system/reset-company', { method: 'POST' });
  }

  async fullSystemReset() {
    return this.request('/api/system/full-reset', { method: 'POST' });
  }

  async getShopifyStatus() {
    return this.request('/api/shopify/status');
  }

  async exportShopifyCatalog() {
    return this.request('/api/shopify/export-catalog');
  }
}

export const api = new VelvetHugAPI();

// Attach globally for inline scripts or console testing
if (typeof window !== 'undefined') {
  window.vhApi = api;
}
