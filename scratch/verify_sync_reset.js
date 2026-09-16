// scratch/verify_sync_reset.js
async function runTests() {
  const BASE = 'http://localhost:8080';
  console.log('--- 1. Testing Health ---');
  const health = await fetch(`${BASE}/api/health`).then(r => r.json());
  console.log('Health:', health.status, 'Engine:', health.engine, 'Latency:', health.pingLatencyMs, 'ms');

  console.log('\n--- 2. Executing Full 3-Layer Synchronous Reset ---');
  const fullReset = await fetch(`${BASE}/api/system/full-reset`, { method: 'POST' }).then(r => r.json());
  console.log('Full Reset Result:', fullReset);

  console.log('\n--- 3. Checking Schema Row Counts (Clean Users Slate) ---');
  const schemaOverview = await fetch(`${BASE}/api/system/schema-overview`).then(r => r.json());
  console.log('Company Tables:', schemaOverview.schemas.company);
  console.log('Users Tables:', schemaOverview.schemas.users);

  const customerCount = schemaOverview.schemas.users.find(t => t.name === 'customers')?.rowCount || 0;
  const orderCount = schemaOverview.schemas.users.find(t => t.name === 'orders')?.rowCount || 0;
  console.log(`Clean Slate Check: customers = ${customerCount}, orders = ${orderCount} (Must be 0)`);
  if (customerCount !== 0 || orderCount !== 0) throw new Error('Customer data not cleanly purged!');

  console.log('\n--- 4. Checking Canonical Inventory SKUs ---');
  const inv = await fetch(`${BASE}/api/company/inventory`).then(r => r.json());
  console.log(`Total Active SKUs in PostgreSQL: ${inv.count}`);
  console.log('Sample SKUs:', inv.data.slice(0, 4).map(i => `${i.sku} (${i.product_name} - ${i.size})`));

  console.log('\n--- 5. Adding New SKU via POST /api/company/inventory ---');
  const newSkuPayload = {
    sku: 'VH-M006-SUPERKING',
    productId: 'vh-m006',
    name: 'Bespoke Signature Zoned Spinal System',
    category: 'Mattresses',
    size: 'Super King',
    stockAvailable: 25,
    reorderLevel: 5,
    location: 'Central Logistics Hub',
    unitCost: '₹95,000'
  };
  const addRes = await fetch(`${BASE}/api/company/inventory`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSkuPayload)
  }).then(r => r.json());
  console.log('Add SKU Response:', addRes);

  console.log('\n--- 6. Verifying New SKU in Inventory ---');
  const invUpdated = await fetch(`${BASE}/api/company/inventory`).then(r => r.json());
  const foundSku = invUpdated.data.find(i => i.sku === 'VH-M006-SUPERKING');
  console.log('Found newly added SKU:', foundSku);
  if (!foundSku) throw new Error('New SKU was not saved in PostgreSQL!');

  console.log('\n--- 7. Testing ACID Checkout on New SKU ---');
  const checkoutPayload = {
    customerName: 'Aarav Sharma',
    customerEmail: 'aarav@velvethug.test',
    customerPhone: '+91 98800 22334',
    deliveryAddress: 'Lavelle Road, Bangalore 560001',
    paymentMethod: 'upi',
    couponUsed: 'FOUNDING15',
    items: [
      { productId: 'vh-m006', size: 'Super King', quantity: 2 }
    ]
  };
  const checkoutRes = await fetch(`${BASE}/api/user/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(checkoutPayload)
  }).then(r => r.json());
  console.log('Checkout Result:', checkoutRes);

  console.log('\n--- 8. Verifying Stock Decrement in Inventory ---');
  const invAfterOrder = await fetch(`${BASE}/api/company/inventory`).then(r => r.json());
  const skuAfterOrder = invAfterOrder.data.find(i => i.sku === 'VH-M006-SUPERKING');
  console.log(`Stock for VH-M006-SUPERKING: Available = ${skuAfterOrder.stock_available} (was 25, expected 23), Reserved = ${skuAfterOrder.stock_reserved} (expected 2)`);
  if (skuAfterOrder.stock_available !== 23) throw new Error('Stock was not properly decremented!');

  console.log('\n--- 9. Testing Users Purge (/api/system/reset-users) ---');
  const purgeRes = await fetch(`${BASE}/api/system/reset-users`, { method: 'POST' }).then(r => r.json());
  console.log('Purge Response:', purgeRes);

  const schemaAfterPurge = await fetch(`${BASE}/api/system/schema-overview`).then(r => r.json());
  const orderCountAfterPurge = schemaAfterPurge.schemas.users.find(t => t.name === 'orders')?.rowCount || 0;
  console.log(`Order count after purge: ${orderCountAfterPurge} (expected 0)`);
  if (orderCountAfterPurge !== 0) throw new Error('Orders not wiped on purge!');

  console.log('\n✨ ALL TESTS PASSED WITH 100% SUCCESS AND FULL SYNCHRONIZATION! ✨');
}

runTests().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
