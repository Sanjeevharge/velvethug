import { initDb, query, getHealth, transaction } from '../server/database/db.js';

async function main() {
  console.log('--- Testing Velvet Hug PostgreSQL Database Manager ---');
  await initDb();

  const health = await getHealth();
  console.log('Database Health & Stats:', JSON.stringify(health, null, 2));

  // Test retrieval from company schema
  const products = await query('SELECT id, name, category_id, base_price FROM company.products LIMIT 5');
  console.log('\nTop 5 Products from company.products:');
  console.table(products.rows);
  console.log(`Query Latency: ${products.durationMs}ms`);

  // Test retrieval from users schema
  const orders = await query(`
    SELECT o.id, o.customer_name, o.order_status, o.total_amount, COUNT(i.id) as item_count
    FROM users.orders o
    LEFT JOIN users.order_items i ON o.id = i.order_id
    GROUP BY o.id, o.customer_name, o.order_status, o.total_amount
  `);
  console.log('\nOrders from users.orders joined with users.order_items:');
  console.table(orders.rows);
  console.log(`Query Latency: ${orders.durationMs}ms`);

  // Test ACID Transaction
  console.log('\nTesting ACID Transaction...');
  const txResult = await transaction(async (tx) => {
    // 1. Insert temporary customer
    await tx('INSERT INTO users.customers (id, name, email) VALUES ($1, $2, $3)', ['test_acid_cust', 'ACID Tester', 'acid@velvethug.in']);
    // 2. Query it back inside tx
    const res = await tx('SELECT name, email FROM users.customers WHERE id = $1', ['test_acid_cust']);
    return res.rows[0];
  });
  console.log('ACID Transaction Committed Successfully:', txResult);

  // Clean up test customer
  await query('DELETE FROM users.customers WHERE id = $1', ['test_acid_cust']);
  console.log('Test cleanup complete.');
}

main().catch(err => {
  console.error('FATAL TEST ERROR:', err);
  process.exit(1);
});
