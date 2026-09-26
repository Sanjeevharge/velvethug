import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';

const port = 8091;
const base = `http://127.0.0.1:${port}`;
let server;

async function request(path, options) {
  const response = await fetch(`${base}${path}`, options);
  const body = await response.json();
  return { response, body };
}

before(async () => {
  server = spawn(process.execPath, ['server/server.js'], {
    env: { ...process.env, PORT: String(port) },
    stdio: 'ignore'
  });
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    try {
      const { response } = await request('/api/health');
      if (response.ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  throw new Error('Backend did not become ready within 30 seconds');
});

after(() => server?.kill('SIGTERM'));

test('health reports an operational database', async () => {
  const { response, body } = await request('/api/health');
  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.status, 'healthy');
});

test('catalog returns products from the database', async () => {
  const { response, body } = await request('/api/catalog/products');
  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.ok(body.data.length > 0);
  assert.ok(body.data[0].id);
});

test('customer sign-in creates a session and authenticated orders are retrievable', async () => {
  const email = `customer_${Date.now()}@example.com`;
  const phone = `98${String(Date.now()).slice(-8)}`;
  const auth = await request('/api/user/auth/login-or-register', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Customer Sync Test', email, phone, isFounding: false })
  });
  assert.equal(auth.response.status, 200);
  assert.equal(auth.body.success, true);
  assert.ok(auth.body.token);
  assert.ok(auth.body.customer.id);

  const session = await request('/api/user/session', {
    headers: { Authorization: `Bearer ${auth.body.token}` }
  });
  assert.equal(session.body.success, true);
  assert.equal(session.body.customer.id, auth.body.customer.id);

  const catalog = await request('/api/catalog/products');
  const product = catalog.body.data[0];
  const size = product.sizes?.[0] || 'Queen';
  const sessionId = `customer_${Date.now()}`;
  const checkout = await request('/api/user/checkout', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerId: auth.body.customer.id,
      customerName: 'Customer Sync Test', customerEmail: email, customerPhone: phone,
      deliveryAddress: 'Sync Test Address', paymentMethod: 'cod', sessionId,
      items: [{ productId: product.id, size, quantity: 1 }]
    })
  });
  assert.equal(checkout.body.success, true);

  const orders = await request(`/api/user/orders?customerId=${encodeURIComponent(auth.body.customer.id)}`, {
    headers: { Authorization: `Bearer ${auth.body.token}` }
  });
  assert.equal(orders.body.success, true);
  assert.ok(orders.body.data.some(order => order.id === checkout.body.data.orderId));
});

test('guest cart persists and can be checked out atomically', async () => {
  const sessionId = `test_${Date.now()}`;
  const { body: catalog } = await request('/api/catalog/products');
  const product = catalog.data[0];
  const size = product.sizes?.[0] || 'Queen';
  const add = await request('/api/user/cart', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, productId: product.id, size, quantity: 1 })
  });
  assert.equal(add.response.status, 200);
  const cart = await request(`/api/user/cart?sessionId=${sessionId}`);
  assert.equal(cart.body.success, true);
  assert.equal(cart.body.items.length, 1);

  const checkout = await request('/api/user/checkout', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customerName: 'Integration Test Customer',
      customerEmail: `test_${Date.now()}@example.com`,
      customerPhone: '9999999999',
      deliveryAddress: 'Test Address, Bengaluru',
      paymentMethod: 'cod',
      sessionId,
      items: [{ productId: product.id, size, quantity: 1 }]
    })
  });
  assert.equal(checkout.response.status, 200);
  assert.equal(checkout.body.success, true);
  assert.ok(checkout.body.data.orderId);
});

test('admin inventory rejects requests without a server token', async () => {
  const { response, body } = await request('/api/company/inventory');
  assert.equal(response.status, 401);
  assert.equal(body.success, false);
});

test('admin login returns a usable server token', async () => {
  const { response, body } = await request('/api/company/auth/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'subashini@velvethug.in', password: 'VelvetAdmin@2026!', twoFactorCode: '8942' })
  });
  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.match(body.token, /^vh_admin_/);
  const inventory = await request('/api/company/inventory', { headers: { Authorization: `Bearer ${body.token}` } });
  assert.equal(inventory.response.status, 200);
  assert.equal(inventory.body.success, true);
});

test('admin login rejects invalid password or missing 2FA code', async () => {
  const badPass = await request('/api/company/auth/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'subashini@velvethug.in', password: 'WrongPassword123!', twoFactorCode: '8942' })
  });
  assert.equal(badPass.response.status, 401);
  assert.equal(badPass.body.success, false);

  const missing2FA = await request('/api/company/auth/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'subashini@velvethug.in', password: 'VelvetAdmin@2026!' })
  });
  assert.equal(missing2FA.response.status, 401);
  assert.equal(missing2FA.body.success, false);
});

test('system diagnostic routes reject unauthenticated requests', async () => {
  const { response, body } = await request('/api/system/schema-overview');
  assert.equal(response.status, 401);
  assert.equal(body.success, false);
});

