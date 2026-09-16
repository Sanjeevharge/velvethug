async function test() {
  const res = await fetch('http://localhost:8080/api/company/inventory').then(r => r.json());
  console.log('Count:', res.count);
  console.log('Data sample:', res.data.map(d => ({ sku: d.sku, name: d.product_name, cat: d.category_id })));
}
test();
