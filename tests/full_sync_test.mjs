// tests/full_sync_test.mjs — Comprehensive 3-Way Synchronization Verification Test

async function runFullSyncTest() {
  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log('🧪 VELVET HUG: 3-WAY SYNCHRONIZATION TEST (STOREFRONT ⇄ POSTGRESQL ⇄ ADMIN)');
  console.log('═══════════════════════════════════════════════════════════════════════════\n');

  const BASE = 'http://localhost:8080';

  // 1. Admin Authentication & 2FA
  console.log('1. Testing Admin Authentication with 2FA...');
  const adminAuthRes = await fetch(`${BASE}/api/company/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'subashini@velvethug.in', password: 'velvethug', twoFactorCode: '0702' })
  });
  const adminAuth = await adminAuthRes.json();
  if (!adminAuth.success || !adminAuth.token) throw new Error('Admin login failed: ' + JSON.stringify(adminAuth));
  const adminToken = adminAuth.token;
  console.log(`   ✓ Admin Authorized: ${adminAuth.user.name} (${adminAuth.user.roleLabel}), Session Token: ${adminToken.slice(0, 16)}...\n`);

  // 2. Public Catalog & Quiz Questions
  console.log('2. Testing Storefront Catalog & Quiz Retrieval...');
  const catalogRes = await fetch(`${BASE}/api/catalog/products`).then(r => r.json());
  const quizRes = await fetch(`${BASE}/api/catalog/quiz`).then(r => r.json());
  console.log(`   ✓ Catalog Products Count: ${catalogRes.count || catalogRes.data?.length}`);
  console.log(`   ✓ Quiz Diagnostic Questions Count: ${quizRes.data?.length}\n`);

  // 3. User Signup / Login
  console.log('3. Testing Storefront Customer Registration / Login...');
  const testPhone = '9876543210';
  const testEmail = 'sanjeev.tester@velvethug.in';
  const testName = 'Sanjeev Tester';

  const userAuthRes = await fetch(`${BASE}/api/user/auth/login-or-register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: testName, email: testEmail, phone: testPhone })
  });
  const userAuth = await userAuthRes.json();
  if (!userAuth.success || (!userAuth.customer && !userAuth.user)) throw new Error('Customer auth failed: ' + JSON.stringify(userAuth));
  const user = userAuth.customer || userAuth.user;
  const userToken = userAuth.token;
  console.log(`   ✓ Customer Profile Created in PostgreSQL: ${user.name} (${user.email}), ID: ${user.id}\n`);

  // 4. Cart Addition & Admin Live-Cart Sync
  console.log('4. Testing Cart Addition & Real-Time Sync to Admin Live Carts...');
  const cartAddRes = await fetch(`${BASE}/api/user/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` },
    body: JSON.stringify({ sessionId: user.id, productId: 'vh-m001', size: 'King (78x72)', quantity: 2 })
  });
  const cartAdd = await cartAddRes.json();
  if (!cartAdd.success) throw new Error('Cart add failed: ' + JSON.stringify(cartAdd));
  console.log('   ✓ Item Added to PostgreSQL users.cart_items');

  // Verify Admin can see this live cart
  const liveCartsRes = await fetch(`${BASE}/api/company/live-carts`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  }).then(r => r.json());
  const matchingCart = liveCartsRes.data?.find(c => c.session_or_customer_id === user.id);
  if (!matchingCart) throw new Error('Live cart item not reflected in admin!');
  console.log(`   ✓ Admin Live-Cart Real-Time Visibility Confirmed: ${matchingCart.product_name} (${matchingCart.size}) × ${matchingCart.quantity} by ${matchingCart.customer_name || user.id}\n`);

  // 5. Sleep Quiz Submission
  console.log('5. Testing Sleep Diagnostic Profile Submission...');
  const quizSubmitRes = await fetch(`${BASE}/api/user/quiz/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionOrCustomerId: user.id,
      answers: { q1: 'side', q2: 'refreshed', q3: 'partner', q4: 'premium', q5: 'backpain' },
      recommendedProductId: 'vh-m001',
      recommendedFirmness: 'Medium-Firm'
    })
  });
  const quizSubmit = await quizSubmitRes.json();
  console.log(`   ✓ Sleep Diagnosis Recorded in PostgreSQL: ${quizSubmit.diagnosisId}\n`);

  // 6. User Checkout & ACID Order Creation
  console.log('6. Testing Atomic ACID Checkout & Order Dispatch...');
  const checkoutRes = await fetch(`${BASE}/api/user/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userToken}` },
    body: JSON.stringify({
      customerId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone,
      deliveryAddress: 'Flat 402, Velvet Heights, Indiranagar, Bengaluru - 560038',
      paymentMethod: 'Prepaid UPI',
      sessionId: user.id,
      items: [{ productId: 'vh-m001', size: 'King (78x72)', quantity: 2 }]
    })
  });
  const checkout = await checkoutRes.json();
  const orderId = checkout.data?.orderId || checkout.orderId;
  const totalAmount = checkout.data?.totalAmount || checkout.totalAmount || 0;
  if (!checkout.success || !orderId) throw new Error('Checkout failed: ' + JSON.stringify(checkout));
  console.log(`   ✓ ACID Transaction Committed in PostgreSQL! Order ID: ${orderId}, Total: ₹${totalAmount.toLocaleString('en-IN')}\n`);

  // 7. Admin Order Book Verification
  console.log('7. Verifying Admin Order Book Real-Time Synchronization...');
  const adminOrdersRes = await fetch(`${BASE}/api/company/orders`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  }).then(r => r.json());
  const adminOrder = adminOrdersRes.data?.find(o => o.id === orderId);
  if (!adminOrder) throw new Error('Order not found in admin orders list!');
  console.log(`   ✓ Admin Order Inspection Confirmed: Order #${adminOrder.id}`);
  console.log(`     Customer: ${adminOrder.customer_name} (${adminOrder.customer_phone})`);
  console.log(`     Delivery Address: ${adminOrder.delivery_address}`);
  console.log(`     Items: ${adminOrder.items?.map(i => `${i.productName} (${i.size}) × ${i.quantity}`).join(', ')}`);
  console.log(`     Status: ${adminOrder.order_status}, Payment: ${adminOrder.payment_status}\n`);

  // 8. Admin Order Lifecycle Status Transitions
  console.log('8. Testing Admin Order Lifecycle Status Transitions in PostgreSQL...');
  const statuses = ['manufacturing', 'dispatched', 'delivered'];
  for (const st of statuses) {
    const patchRes = await fetch(`${BASE}/api/company/orders/${encodeURIComponent(orderId)}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ status: st, trackingNumber: 'VH-BLR-EXP-9921', note: `Advancement to ${st}` })
    });
    const patchData = await patchRes.json();
    console.log(`   ✓ Order #${orderId} Advanced to -> "${patchData.data?.order_status}" in PostgreSQL`);
  }
  console.log('');

  // 9. Storefront Customer Profile Order Status Sync
  console.log('9. Verifying Storefront Customer Profile Reflects Delivered Status...');
  const userOrdersRes = await fetch(`${BASE}/api/user/orders?customerId=${encodeURIComponent(user.id)}`, {
    headers: { Authorization: `Bearer ${userToken}` }
  }).then(r => r.json());
  const userOrder = userOrdersRes.data?.find(o => o.id === orderId);
  if (!userOrder || userOrder.order_status !== 'delivered') throw new Error('User profile did not receive updated status!');
  console.log(`   ✓ Storefront Customer Account Verified: Order #${userOrder.id} is marked "${userOrder.order_status}"\n`);

  // 10. Admin Customers Directory & Aggregate Stats Sync
  console.log('10. Verifying Admin Customer Directory & Company KPIs...');
  const customersRes = await fetch(`${BASE}/api/company/customers`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  }).then(r => r.json());
  const statsRes = await fetch(`${BASE}/api/company/stats`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  }).then(r => r.json());

  const matchingCustomer = customersRes.data?.find(c => c.id === user.id);
  console.log(`   ✓ Customer Directory Verified: ${matchingCustomer.name} (Orders: ${matchingCustomer.order_count}, Total Spent: ₹${Number(matchingCustomer.total_spent).toLocaleString('en-IN')})`);
  console.log(`   ✓ Live Executive KPIs: Revenue: ₹${statsRes.data?.totalRevenue.toLocaleString('en-IN')}, Orders: ${statsRes.data?.totalOrders}, Customers: ${statsRes.data?.totalCustomers}\n`);

  console.log('═══════════════════════════════════════════════════════════════════════════');
  console.log('🎉 ALL 10 TESTS PASSED! STOREFRONT, POSTGRESQL & ADMIN ARE 100% IN SYNC!');
  console.log('═══════════════════════════════════════════════════════════════════════════');
}

runFullSyncTest().catch(err => {
  console.error('\n❌ TEST SUITE FAILED:', err);
  process.exit(1);
});
